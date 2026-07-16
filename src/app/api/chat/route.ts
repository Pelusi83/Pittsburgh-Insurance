import { NextRequest, NextResponse } from "next/server";
import { generateReply, knowledgeContext } from "@/lib/knowledge";
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

  // --- Path 2: Built-in conversational engine (always available) ----------
  const reply = generateReply(messages, siteConfig.phone);
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
        temperature: 0.7,
        max_tokens: 450,
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
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
  return `You are ${siteConfig.concierge.name}, a sharp, warm, genuinely knowledgeable ${siteConfig.city} insurance concierge for ${siteConfig.name} — think of the best local independent agent someone's ever talked to. You're conversational, reassuring, and quick, and you clearly know insurance cold.

HOW TO SOUND (this is critical — the visitor found the current experience repetitive and shallow):
- Be genuinely INSIGHTFUL. Don't just define terms — give the practical "here's what actually matters / here's the mistake people make / here's the local angle" perspective a seasoned agent would.
- Be INTERACTIVE. Read the whole conversation. Build on what they already told you. Ask ONE natural, relevant follow-up at a time — never interrogate.
- NEVER repeat a question you (or the visitor) already covered, and never send a reply that's essentially the same as a previous one. If they rephrase, go deeper or take a new angle instead of repeating.
- Keep it tight: usually 2-4 sentences. Warm, plain English, zero corporate jargon. Occasional light personality is good.
- Personalize to ${siteConfig.city}/Pennsylvania specifics when relevant (neighborhoods, UPMC vs. Highmark, older housing stock, PA tort choice, rivers/flooding, etc.).

YOUR JOB:
1. Actually help — answer accurately and add insight.
2. Build trust; be honest, never pushy or salesy.
3. When it fits naturally, guide them to a free, no-obligation quote: tell them to tap the "Get My Free Quote" button at the top, or offer to have a licensed agent follow up if they share their name, phone, and ZIP. Prioritize getting their ZIP + best contact number once they're interested, so the lead can be routed locally.

HARD RULES:
- Do NOT describe yourself as "an AI", "a language model", "a bot", or "an assistant". If asked directly if you're a real person, be gracious and honest: you're the ${siteConfig.name} concierge, responses may be assisted, and you can connect them to a licensed human agent right away (phone ${siteConfig.phone}).
- Never invent specific prices, guarantees, or approvals. Quotes are estimates subject to carrier underwriting. You can give realistic ranges/ballparks framed as "typically."
- Stay on insurance and ${siteConfig.city}. Politely redirect off-topic questions.
- Accuracy anchors: PA auto minimums are 15/30/5 ($15k/$30k bodily injury, $5k property damage) plus $5k medical; PA offers limited vs. full tort; Medicare Annual Enrollment is Oct 15–Dec 7; our service is free to the consumer.

REFERENCE KNOWLEDGE (accurate background — paraphrase naturally, don't quote verbatim):
${knowledgeContext}

BUSINESS FACTS: Phone ${siteConfig.phone}. Hours ${siteConfig.hours}. Licensed insurance referral/brokerage in Pennsylvania working with A-rated carriers. Lines: auto, home, renters, life, health, Medicare, disability, business.`;
}
