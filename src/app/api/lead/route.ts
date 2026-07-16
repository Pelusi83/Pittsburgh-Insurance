import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";

export const runtime = "nodejs";

// Bump this when the lead pipeline changes so the /api/lead diagnostic can
// confirm which version is actually live in production.
const BUILD_VERSION = "2026-07-16.3-streaming-ai-chat-capture";

type LeadPayload = {
  insuranceType?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  zip?: string;
  currentlyInsured?: string;
  qualifier?: string;
  bestTime?: string;
  details?: string;
  consent?: boolean;
  source?: string;
  // honeypot — should be empty for real humans
  company?: string;
};

const KNOWN_SOURCES = new Set(["website_quote_form", "website_chat"]);

const validSlugs = new Set(insuranceTypes.map((t) => t.slug));

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Spam honeypot: bots fill hidden "company" field; humans never see it.
  if (body.company && body.company.trim() !== "") {
    // Pretend success so bots don't retry, but drop the lead.
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const zip = (body.zip || "").trim();
  const insuranceType = (body.insuranceType || "").trim();

  if (fullName.length < 2) errors.fullName = "Please enter your name.";
  if (!phone || !isPhone(phone))
    errors.phone = "Please enter a valid phone number.";
  if (email && !isEmail(email)) errors.email = "Please enter a valid email.";
  if (!/^\d{5}$/.test(zip)) errors.zip = "Please enter a valid 5-digit ZIP code.";
  if (!insuranceType || !validSlugs.has(insuranceType))
    errors.insuranceType = "Please choose an insurance type.";
  if (!body.consent) errors.consent = "Please agree to be contacted.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    insuranceType,
    insuranceName:
      insuranceTypes.find((t) => t.slug === insuranceType)?.name ||
      insuranceType,
    fullName,
    email,
    phone,
    zip,
    currentlyInsured: (body.currentlyInsured || "").trim().slice(0, 40),
    qualifier: (body.qualifier || "").trim().slice(0, 80),
    bestTime: (body.bestTime || "").trim(),
    details: (body.details || "").trim().slice(0, 2000),
    source: KNOWN_SOURCES.has(body.source || "")
      ? (body.source as string)
      : "website_quote_form",
    userAgent: req.headers.get("user-agent") || "",
  };

  const delivery = await deliverLead(lead);

  return NextResponse.json({
    ok: true,
    id: lead.id,
    emailed: delivery.delivered,
    deliveryMethod: delivery.method,
  });
}

/**
 * Safe diagnostic endpoint. Visit /api/lead in a browser to confirm your live
 * deployment has the latest code AND that your Resend key is configured.
 * It never reveals secrets or the full private inbox address.
 */
export async function GET() {
  const inbox = process.env.LEADS_NOTIFY_EMAIL || "johnc.pelusi@gmail.com";
  const [user, domain] = inbox.split("@");
  const maskedInbox = user
    ? `${user.slice(0, 3)}${"*".repeat(Math.max(1, user.length - 3))}@${domain}`
    : "(not set)";

  return NextResponse.json({
    ok: true,
    service: "lead-capture",
    buildVersion: BUILD_VERSION,
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    aiConciergeConfigured: Boolean(process.env.OPENAI_API_KEY),
    aiModel: process.env.OPENAI_API_KEY
      ? process.env.OPENAI_MODEL || "gpt-4o-mini"
      : "built-in engine (no OPENAI_API_KEY)",
    leadsInbox: maskedInbox,
    fromAddress: process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev",
    note: "resendConfigured must be true to email leads. aiConciergeConfigured true means full-AI Sam is on. If either is false on your live site, set the key in Vercel and REDEPLOY.",
  });
}

/**
 * Delivers the lead. If a Resend API key is configured, email the business.
 * Otherwise, append to a local JSONL file so nothing is ever lost in dev.
 */
// PRIVATE lead-notification inbox. Quote submissions are delivered here.
// Defined server-side only (this API route never ships to the browser), so the
// address is NEVER exposed on the site or in client JavaScript. Override with
// the LEADS_NOTIFY_EMAIL environment variable if desired.
const LEADS_INBOX = process.env.LEADS_NOTIFY_EMAIL || "johnc.pelusi@gmail.com";

type DeliveryResult = { delivered: boolean; method: string; error?: string };

async function deliverLead(lead: Record<string, unknown>): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const notify = LEADS_INBOX;
  // "From" address. Resend's shared sender works with zero domain setup, so
  // leads can be received immediately after adding just an API key.
  const from =
    process.env.LEADS_FROM_EMAIL ||
    `${siteConfig.name} <onboarding@resend.dev>`;

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [notify],
          reply_to: (lead.email as string) || undefined,
          subject: `New ${lead.insuranceName} lead: ${lead.fullName}`,
          text: formatLeadEmail(lead),
        }),
      });
      if (res.ok) {
        console.log(`Lead ${lead.id} emailed to ${notify} via Resend.`);
        return { delivered: true, method: "resend" };
      }
      const errText = await res.text();
      console.error(
        `Resend error for lead ${lead.id}: ${res.status} ${errText}`
      );
      await storeLocally(lead);
      return { delivered: false, method: "local_fallback", error: `resend_${res.status}` };
    } catch (err) {
      console.error(`Resend request failed for lead ${lead.id}:`, err);
      await storeLocally(lead);
      return { delivered: false, method: "local_fallback", error: "resend_exception" };
    }
  }

  console.warn(
    `No RESEND_API_KEY set — lead ${lead.id} stored locally, NOT emailed.`
  );
  await storeLocally(lead);
  return { delivered: false, method: "local_only", error: "no_resend_key" };
}

// Best-effort local persistence. Uses the OS temp dir, which is writable on
// serverless platforms (e.g. Vercel), so we never throw and lose the log.
async function storeLocally(lead: Record<string, unknown>) {
  const candidates = [
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "pgh-insurance-leads"),
  ];
  for (const dir of candidates) {
    try {
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(
        path.join(dir, "leads.jsonl"),
        JSON.stringify(lead) + "\n",
        "utf8"
      );
      return;
    } catch {
      // try next candidate
    }
  }
  console.error(`Failed to persist lead ${lead.id} to any location.`);
}

function formatLeadEmail(lead: Record<string, unknown>) {
  return [
    `New lead from ${siteConfig.name}`,
    "",
    `Type:        ${lead.insuranceName}`,
    `Name:        ${lead.fullName}`,
    `Phone:       ${lead.phone}`,
    `Email:       ${lead.email || "(not provided)"}`,
    `ZIP:         ${lead.zip || "(not provided)"}`,
    `Insured now: ${lead.currentlyInsured || "(not provided)"}`,
    `Detail:      ${lead.qualifier || "(not provided)"}`,
    `Best time:   ${lead.bestTime || "(any)"}`,
    `Notes:       ${lead.details || "(none)"}`,
    `Source:      ${lead.source === "website_chat" ? "Live chat (Sam)" : "Quote form"}`,
    "",
    `Received:    ${lead.receivedAt}`,
    `Lead ID:     ${lead.id}`,
  ].join("\n");
}
