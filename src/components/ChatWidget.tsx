"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "How does this work?",
  "I need auto insurance",
  "Is this really free?",
  "Help me with Medicare",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi, I'm ${siteConfig.concierge.name} 👋 Welcome to ${siteConfig.name}! I can help you compare coverage, answer questions, or get you a free quote. What are you looking for today?`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      // focus input when opening for accessibility
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || sending) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I had trouble there. You can always call us at " +
              siteConfig.phone +
              ".",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `I'm having a connection hiccup. Please try again, or call us at ${siteConfig.phone} and a licensed agent will help right away.`,
        },
      ]);
    } finally {
      setSending(false);
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
            <span className="block text-sm font-bold">Chat with {siteConfig.concierge.name}</span>
            <span className="block text-xs text-brand-100">
              Online now · replies in seconds
            </span>
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col overflow-hidden bg-white shadow-soft sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200"
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

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3">
                  <span className="flex gap-1">
                    <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                  </span>
                </div>
              </div>
            )}

            {messages.length <= 1 && (
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
                disabled={sending || !input.trim()}
                className="btn-primary !min-h-[48px] !px-4"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Secure chat · Responses may be assisted ·{" "}
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="underline"
              >
                Call {siteConfig.phone}
              </a>
            </p>
          </form>
        </div>
      )}
    </>
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
