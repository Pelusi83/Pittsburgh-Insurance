import { NextRequest, NextResponse } from "next/server";
import { findBestAnswer, knowledgeContext } from "@/lib/knowledge";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE_LEN = 1500;
const MAX_HISTORY = 12;

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = (body.messages || [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ ...m, content: m.content.slice(0, MAX_MESSAGE_LEN) }));

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const userText = lastUser?.content?.trim() || "";

  if (!userText) {
    return NextResponse.json({
      reply:
        "I'm here and happy to help! What kind of insurance are you thinking about — home, auto, life, health, disability, Medicare, renters or business?",
      assisted: true,
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // --- Path 1: Grounded LLM (when a key is configured) --------------------
  if (apiKey) {
    try {
      const reply = await askLLM(messages, apiKey);
      if (reply) {
        return NextResponse.json({ reply, assisted: true });
      }
    } catch (err) {
      console.error("LLM chat failed, falling back to knowledge base:", err);
    }
  }

  // --- Path 2: Built-in knowledge base (always available) -----------------
  const reply = findBestAnswer(userText);
  return NextResponse.json({ reply, assisted: true });
}

async function askLLM(
  messages: ChatMessage[],
  apiKey: string
): Promise<string | null> {
  const baseUrl = (
    process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
  ).replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const systemPrompt = buildSystemPrompt();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 400,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!res.ok) {
      console.error("LLM API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    return reply?.trim() || null;
  } finally {
    clearTimeout(timeout);
  }
}

function buildSystemPrompt() {
  return `You are ${siteConfig.concierge.name}, a warm, knowledgeable ${siteConfig.city} insurance concierge for ${siteConfig.name}. You speak like a friendly, experienced local insurance professional — conversational, reassuring, and genuinely helpful. Keep replies concise (2-5 sentences), plain-English, and free of corporate jargon.

Your goals, in order:
1. Answer the person's insurance question accurately and helpfully.
2. Build trust — be honest, never pushy.
3. When appropriate, gently invite them to get a free, no-obligation quote (our /quote form) or to share their name and phone so a licensed agent can follow up.

Style rules:
- Sound human and personable. Use natural language, not robotic phrasing.
- Do NOT describe yourself as "an AI", "a language model", "a bot", or "an assistant". If asked directly whether you are a person, be honest but graceful: say you're the ${siteConfig.name} concierge, that responses may be assisted, and offer to connect them with a licensed human agent right away.
- Never invent specific prices, guarantees, or policy approvals. Quotes are estimates subject to carrier underwriting.
- Stay focused on insurance and ${siteConfig.city}. Politely redirect off-topic questions.
- Be accurate. Pennsylvania auto minimums: $15k/$30k bodily injury, $5k property damage, $5k medical. Medicare annual enrollment: Oct 15 - Dec 7. Our service is free to the consumer.

Reference knowledge (use as accurate background, paraphrase naturally):
${knowledgeContext}

Business facts: Phone ${siteConfig.phone}. Hours ${siteConfig.hours}. We are a licensed insurance referral/brokerage in Pennsylvania and work with A-rated carriers. We cover auto, home, renters, life, health, Medicare, disability, and business insurance.`;
}
