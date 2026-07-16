import { NextRequest } from "next/server";
import { generateReply, knowledgeContext } from "@/lib/knowledge";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE_LEN = 1500;
const MAX_HISTORY = 14;
const encoder = new TextEncoder();

const STREAM_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
};

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
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

  const hasUser = messages.some((m) => m.role === "user" && m.content.trim());
  if (!hasUser) {
    return simulatedStream(
      "I'm here and happy to help! What kind of insurance are you thinking about — auto, home, life, health, Medicare, disability, renters or business?"
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // --- Path 1: Live, streaming LLM (when a key is configured) --------------
  if (apiKey) {
    try {
      return await streamLLM(messages, apiKey);
    } catch (err) {
      console.error("LLM stream failed, falling back to built-in engine:", err);
    }
  }

  // --- Path 2: Built-in conversational engine (simulated streaming) --------
  const reply = generateReply(messages, siteConfig.phone);
  return simulatedStream(reply);
}

/** Proxy the OpenAI streaming response, forwarding only the text deltas. */
async function streamLLM(
  messages: ChatMessage[],
  apiKey: string
): Promise<Response> {
  const baseUrl = (
    process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"
  ).replace(/\/$/, "");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: true,
      temperature: 0.7,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...messages,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    throw new Error(`LLM ${upstream.status}: ${detail}`);
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          controller.close();
          return;
        }
        try {
          const json = JSON.parse(data);
          const delta: string | undefined = json?.choices?.[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          // ignore keep-alive / partial lines
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, { headers: STREAM_HEADERS });
}

/** Stream a precomputed reply word-by-word so the offline engine still feels live. */
function simulatedStream(reply: string): Response {
  const tokens = reply.match(/\S+\s*/g) || [reply];
  const stream = new ReadableStream({
    async start(controller) {
      for (const token of tokens) {
        controller.enqueue(encoder.encode(token));
        await new Promise((r) => setTimeout(r, 28));
      }
      controller.close();
    },
  });
  return new Response(stream, { headers: STREAM_HEADERS });
}

function buildSystemPrompt() {
  return `You are ${siteConfig.concierge.name}, a sharp, warm, genuinely knowledgeable ${siteConfig.city} insurance concierge for ${siteConfig.name} — think of the best local independent agent someone's ever talked to. You're conversational, reassuring, and quick, and you clearly know insurance cold.

HOW TO SOUND (this is critical — the visitor found earlier experiences repetitive and shallow):
- Be genuinely INSIGHTFUL. Don't just define terms — give the practical "here's what actually matters / here's the mistake people make / here's the local angle" perspective a seasoned agent would.
- Be INTERACTIVE. Read the whole conversation. Build on what they already told you. Ask ONE natural, relevant follow-up at a time — never interrogate.
- NEVER repeat a question you (or the visitor) already covered, and never send a reply that's essentially the same as a previous one. If they rephrase, go deeper or take a new angle instead of repeating.
- Keep it tight: usually 2-4 sentences. Warm, plain English, zero corporate jargon. Occasional light personality is good.
- Personalize to ${siteConfig.city}/Pennsylvania specifics when relevant (neighborhoods, UPMC vs. Highmark, older housing stock, PA tort choice, rivers/flooding, etc.).

YOUR JOB:
1. Actually help — answer accurately and add insight.
2. Build trust; be honest, never pushy or salesy.
3. When it fits naturally, guide them to a free, no-obligation quote: tell them to tap the "Get a free quote" button in the chat, or offer to have a licensed agent follow up if they share their name, phone, and ZIP. Prioritize getting their ZIP + best contact number once they're interested, so the lead can be routed locally.

HARD RULES:
- Do NOT describe yourself as "an AI", "a language model", "a bot", or "an assistant". If asked directly if you're a real person, be gracious and honest: you're the ${siteConfig.name} concierge, responses may be assisted, and you can connect them to a licensed human agent right away (phone ${siteConfig.phone}).
- Never invent specific prices, guarantees, or approvals. Quotes are estimates subject to carrier underwriting. You can give realistic ranges/ballparks framed as "typically."
- Stay on insurance and ${siteConfig.city}. Politely redirect off-topic questions.
- Accuracy anchors: PA auto minimums are 15/30/5 ($15k/$30k bodily injury, $5k property damage) plus $5k medical; PA offers limited vs. full tort; Medicare Annual Enrollment is Oct 15–Dec 7; our service is free to the consumer.

REFERENCE KNOWLEDGE (accurate background — paraphrase naturally, don't quote verbatim):
${knowledgeContext}

BUSINESS FACTS: Phone ${siteConfig.phone}. Hours ${siteConfig.hours}. Licensed insurance referral/brokerage in Pennsylvania working with A-rated carriers. Lines: auto, home, renters, life, health, Medicare, disability, business.`;
}
