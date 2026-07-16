import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";

export const runtime = "nodejs";

type LeadPayload = {
  insuranceType?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  zip?: string;
  bestTime?: string;
  details?: string;
  consent?: boolean;
  // honeypot — should be empty for real humans
  company?: string;
};

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
  const insuranceType = (body.insuranceType || "").trim();

  if (fullName.length < 2) errors.fullName = "Please enter your name.";
  if (!phone || !isPhone(phone))
    errors.phone = "Please enter a valid phone number.";
  if (email && !isEmail(email)) errors.email = "Please enter a valid email.";
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
    zip: (body.zip || "").trim(),
    bestTime: (body.bestTime || "").trim(),
    details: (body.details || "").trim().slice(0, 2000),
    source: "website_quote_form",
    userAgent: req.headers.get("user-agent") || "",
  };

  await deliverLead(lead);

  return NextResponse.json({ ok: true, id: lead.id });
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

async function deliverLead(lead: Record<string, unknown>) {
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
      if (res.ok) return;
      console.error("Resend responded with error, storing locally:", res.status, await res.text());
    } catch (err) {
      // fall through to local storage on failure
      console.error("Resend delivery failed, storing locally:", err);
    }
  }

  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "leads.jsonl"),
      JSON.stringify(lead) + "\n",
      "utf8"
    );
  } catch (err) {
    console.error("Failed to persist lead:", err);
  }
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
    `Best time:   ${lead.bestTime || "(any)"}`,
    `Details:     ${lead.details || "(none)"}`,
    "",
    `Received:    ${lead.receivedAt}`,
    `Lead ID:     ${lead.id}`,
  ].join("\n");
}
