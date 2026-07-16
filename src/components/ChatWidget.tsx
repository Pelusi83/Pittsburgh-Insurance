"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "pgh_chat_v1";
const PROACTIVE_KEY = "pgh_chat_proactive_v1";

const QUICK_REPLIES = [
  "How does this work?",
  "I need auto insurance",
  "Is this really free?",
  "Help me with Medicare",
];

const GREETING: Msg = {
  role: "assistant",
  content: `Hi, I'm ${siteConfig.concierge.name} 👋 Welcome to ${siteConfig.name}! I can compare coverage, answer questions, or get you a free quote — for auto, home, life, health, Medicare, disability, renters or business. What are you looking for today?`,
};

const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;

/** Guess which insurance line the visitor is discussing, to prefill the form. */
function detectType(messages: Msg[]): string {
  // Only consider what the VISITOR said — Sam's greeting lists every type and
  // would otherwise always match "auto" first.
  const text = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");
  const map: [string, string[]][] = [
    ["auto-insurance", ["auto", "car", "vehicle", "sr-22", "sr22"]],
    ["home-insurance", ["home", "house", "homeowner", "dwelling"]],
    ["renters-insurance", ["renter", "apartment", "tenant"]],
    ["life-insurance", ["life insurance", "term life", "whole life"]],
    ["medicare", ["medicare", "medigap", "turning 65"]],
    ["health-insurance", ["health insurance", "aca", "marketplace", "upmc", "highmark"]],
    ["disability-insurance", ["disability", "income protection", "own occupation"]],
    ["business-insurance", ["business", "commercial", "workers comp", "llc"]],
  ];
  for (const [slug, kws] of map) {
    if (kws.some((k) => text.includes(k))) return slug;
  }
  return "";
}

/** Render text, turning the business phone number into a tap-to-call link. */
function renderContent(text: string) {
  const parts = text.split(siteConfig.phone);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <a href={telHref} className="font-semibold underline">
          {siteConfig.phone}
        </a>
      )}
    </span>
  ));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [hydrated, setHydrated] = useState(false);

  // In-chat lead capture
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [lead, setLead] = useState({
    fullName: "",
    phone: "",
    zip: "",
    insuranceType: "",
    consent: false,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved conversation.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Msg[];
        if (Array.isArray(parsed) && parsed.length) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist conversation.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* ignore */
    }
  }, [messages, hydrated]);

  // Proactive nudge (once per visitor) after a short delay if unopened.
  useEffect(() => {
    if (!hydrated) return;
    if (localStorage.getItem(PROACTIVE_KEY)) return;
    const t = setTimeout(() => {
      if (!open) {
        setMessages((m) =>
          m.length > 1
            ? m
            : [
                ...m,
                {
                  role: "assistant",
                  content:
                    "Quick question I can help with? Or I can get you a free, no-obligation quote in about two minutes. 😊",
                },
              ]
        );
        setUnread(true);
        try {
          localStorage.setItem(PROACTIVE_KEY, "1");
        } catch {
          /* ignore */
        }
      }
    }, 9000);
    return () => clearTimeout(t);
  }, [hydrated, open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, streaming, leadOpen]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const base = [...messages, { role: "user" as const, content }];
    // add an empty assistant message we'll stream into
    setMessages([...base, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: base.slice(-14) }),
      });
      if (!res.ok || !res.body) throw new Error("no stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // stream tokens into the last assistant message
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
      if (!acc.trim()) throw new Error("empty");
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `Sorry — I hit a connection hiccup. Please try again, or call a licensed agent at ${siteConfig.phone} and we'll help right away.`,
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  function openLeadForm() {
    setLead((l) => ({
      ...l,
      insuranceType: l.insuranceType || detectType(messages),
    }));
    setLeadOpen(true);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (lead.fullName.trim().length < 2) errs.fullName = "Enter your name.";
    if (lead.phone.replace(/\D/g, "").length < 10) errs.phone = "Valid phone, please.";
    if (!/^\d{5}$/.test(lead.zip.trim())) errs.zip = "5-digit ZIP.";
    if (!lead.insuranceType) errs.insuranceType = "Pick a type.";
    if (!lead.consent) errs.consent = "Please check the box.";
    setLeadErrors(errs);
    if (Object.keys(errs).length) return;

    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, source: "website_chat", bestTime: "Any time" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setLeadErrors(data.errors || { form: "Something went wrong." });
        setLeadSubmitting(false);
        return;
      }
      setLeadOpen(false);
      setLeadSubmitting(false);
      const first = lead.fullName.trim().split(/\s+/)[0];
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Perfect, ${first} — you're all set! 🎉 A licensed local agent will reach out shortly with your options. In the meantime, ask me anything else, or call us any time at ${siteConfig.phone}.`,
        },
      ]);
      setUnread(false);
    } catch {
      setLeadErrors({ form: "Couldn't submit. Please try again or call us." });
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-brand-600 py-3 pl-3 pr-5 text-white shadow-soft transition hover:bg-brand-700"
          aria-label="Open chat with our insurance concierge"
        >
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl">
            💬
            {unread && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-slate-900">
                1
              </span>
            )}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-bold">
              Chat with {siteConfig.concierge.name}
            </span>
            <span className="block text-xs text-brand-100">
              Online now · replies in seconds
            </span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex h-[88vh] flex-col overflow-hidden bg-white shadow-soft sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[620px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200"
          role="dialog"
          aria-label="Insurance concierge chat"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-xl">
                🧑‍💼
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-brand-700 bg-green-400" />
              </span>
              <div className="leading-tight">
                <p className="font-bold">
                  {siteConfig.concierge.name} · {siteConfig.concierge.role}
                </p>
                <p className="text-xs text-brand-100">
                  {siteConfig.name} · Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-2xl leading-none hover:bg-white/10"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Persistent action bar */}
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
            <button
              onClick={openLeadForm}
              className="flex-1 rounded-lg bg-gold-500 px-3 py-2 text-sm font-bold text-slate-900 hover:bg-gold-600"
            >
              📋 Get a free quote
            </button>
            <a
              href={telHref}
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-bold text-slate-800 hover:border-brand-300"
            >
              📞 Call us
            </a>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const showTyping = isLast && m.role === "assistant" && streaming && !m.content;
              return (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-brand-600 text-white"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                    }`}
                  >
                    {showTyping ? (
                      <span className="flex gap-1 py-1">
                        <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                      </span>
                    ) : m.role === "assistant" ? (
                      renderContent(m.content)
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              );
            })}

            {messages.length <= 1 && !streaming && (
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Inline lead capture */}
            {leadOpen && (
              <form
                onSubmit={submitLead}
                className="rounded-2xl border-2 border-brand-200 bg-white p-4 shadow-card"
              >
                <p className="text-sm font-bold text-slate-900">
                  Get your free quote 🎯
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  A licensed local agent will reach out. No obligation.
                </p>
                <div className="mt-3 space-y-2.5">
                  <LeadField
                    label="Full name"
                    value={lead.fullName}
                    onChange={(v) => setLead((l) => ({ ...l, fullName: v }))}
                    error={leadErrors.fullName}
                    autoComplete="name"
                    placeholder="Jane Smith"
                  />
                  <LeadField
                    label="Phone"
                    value={lead.phone}
                    onChange={(v) => setLead((l) => ({ ...l, phone: v }))}
                    error={leadErrors.phone}
                    autoComplete="tel"
                    type="tel"
                    placeholder="(412) 555-0123"
                  />
                  <LeadField
                    label="ZIP code"
                    value={lead.zip}
                    onChange={(v) =>
                      setLead((l) => ({
                        ...l,
                        zip: v.replace(/\D/g, "").slice(0, 5),
                      }))
                    }
                    error={leadErrors.zip}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="15222"
                  />
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Insurance type
                    </label>
                    <select
                      className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-brand-500"
                      value={lead.insuranceType}
                      onChange={(e) =>
                        setLead((l) => ({ ...l, insuranceType: e.target.value }))
                      }
                    >
                      <option value="">Choose…</option>
                      {insuranceTypes.map((t) => (
                        <option key={t.slug} value={t.slug}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                    {leadErrors.insuranceType && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {leadErrors.insuranceType}
                      </p>
                    )}
                  </div>
                  <label className="flex items-start gap-2 text-[11px] leading-snug text-slate-500">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 flex-none accent-brand-600"
                      checked={lead.consent}
                      onChange={(e) =>
                        setLead((l) => ({ ...l, consent: e.target.checked }))
                      }
                    />
                    <span>
                      I agree to be contacted by a licensed agent by phone, text,
                      or email about my quote. Free, no obligation.
                    </span>
                  </label>
                  {leadErrors.consent && (
                    <p className="text-xs font-medium text-red-600">
                      {leadErrors.consent}
                    </p>
                  )}
                  {leadErrors.form && (
                    <p className="text-xs font-medium text-red-600">
                      {leadErrors.form}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLeadOpen(false)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="flex-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-bold text-white hover:bg-brand-700 disabled:opacity-60"
                  >
                    {leadSubmitting ? "Sending…" : "Send my request"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-slate-200 bg-white p-3"
          >
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="field-input !min-h-[48px] flex-1 !py-2.5 text-base"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="btn-primary !min-h-[48px] !px-4"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Secure chat · Responses may be assisted ·{" "}
              <a href={telHref} className="underline">
                Call {siteConfig.phone}
              </a>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

function LeadField({
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
      </label>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-2 border-slate-200 px-3 py-2 text-sm focus:border-brand-500"
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
      style={{ animationDelay: delay }}
    />
  );
}
