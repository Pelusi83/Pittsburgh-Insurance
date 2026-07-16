/**
 * Built-in insurance concierge engine.
 *
 * This powers "Sam" when no LLM key is configured. It is intentionally more than
 * a keyword lookup: it reads the whole conversation so it can avoid repeating
 * itself, answer follow-ups, react to "yes/no", give genuinely useful insight,
 * and steer the visitor toward a free quote. When an LLM key IS configured, the
 * knowledge text below is injected as authoritative grounding.
 */

type Msg = { role: "user" | "assistant"; content: string };

type Topic = {
  id: string;
  triggers: string[];
  // Multiple phrasings so repeated questions don't get identical replies.
  answers: string[];
  // Rotating, specific follow-up questions that keep the chat moving.
  followUps: string[];
  // Marks a topic as "insurance line" so we can offer a tailored quote.
  line?: string; // slug of the related /insurance/[slug] page
};

const topics: Topic[] = [
  {
    id: "auto",
    line: "auto-insurance",
    triggers: [
      "auto",
      "car",
      "vehicle",
      "truck",
      "driving",
      "driver",
      "sr-22",
      "sr22",
      "collision",
      "motorcycle",
    ],
    answers: [
      "For auto in Pennsylvania, the state minimum is 15/30/5 — $15k bodily injury per person, $30k per accident, $5k property damage — plus $5k in medical benefits. Honestly, those minimums are low; a single serious accident can blow past them, so most Pittsburgh drivers I help step up to 100/300 for real protection. The good news is the jump often costs less than people expect.",
      "One thing a lot of drivers here don't realize: Pennsylvania lets you pick 'limited tort' (cheaper, but you give up the right to sue for pain and suffering in most cases) or 'full tort' (a bit more, keeps your rights). That single choice matters more than most discounts. I always walk people through it before they decide.",
      "The biggest levers on your car premium are your coverage limits, deductible, tort option, and the discounts you qualify for — bundling with home/renters, safe-driver, low-mileage, and paperless can stack up fast. When I shop it, I compare several A-rated carriers at once so you're not guessing.",
    ],
    followUps: [
      "Quick question so I can point you right: is this for one vehicle or a couple, and are you currently insured?",
      "Are you looking to lower a bill you already have, or getting coverage on a new car?",
      "Want me to line up a few auto quotes for you? It takes about two minutes.",
    ],
  },
  {
    id: "home",
    line: "home-insurance",
    triggers: [
      "home",
      "house",
      "homeowner",
      "homeowners",
      "dwelling",
      "roof",
      "basement",
      "condo",
      "property",
    ],
    answers: [
      "With Pittsburgh homes, the number that really matters is your 'dwelling' coverage — it should equal what it would cost to rebuild today, not your market value or what you paid. A lot of older homes here are underinsured on that one line, which bites people at claim time.",
      "Two coverages I always flag for Pittsburgh: water/sewer backup (think sump-pump failure in a finished basement) and true flood coverage. Standard policies exclude flood and often exclude backup unless you add it — and with our rivers and heavy rain, it's worth the small add-on.",
      "For older Pittsburgh homes, carriers care about the 'big four' updates — roof, electrical, plumbing, and heating. If any of those were done recently, it can meaningfully lower your premium. I match you with carriers that are comfortable with older housing stock instead of penalizing it.",
    ],
    followUps: [
      "Do you own the home already, or is this for a purchase you're closing on?",
      "Would you want to bundle it with auto? That usually saves 10–25% on both.",
      "Want me to pull together a homeowners quote for you?",
    ],
  },
  {
    id: "life",
    line: "life-insurance",
    triggers: [
      "life insurance",
      "term life",
      "whole life",
      "final expense",
      "burial",
      "death benefit",
      "beneficiary",
      "life policy",
    ],
    answers: [
      "The two big questions with life insurance are 'how much' and 'how long.' A common starting point is 10–12× your income, plus your mortgage and any debts, plus anything you'd want to fund (like kids' college). Term insurance covers a set window (say 20 years) affordably, while whole life lasts forever and builds cash value at a higher cost.",
      "Here's what saves people money: match the term length to the need. If it's mainly to cover a 25-year mortgage and raising kids, a 20–30 year term does the job for a fraction of whole-life cost. Whole life makes sense for lifelong needs or estate planning — I'll be straight with you about which fits.",
      "A lot of healthy applicants now qualify for 'no-exam' policies that can be approved in days instead of weeks — no bloodwork, just some questions. Whether that's the best value depends on your age and health, and I'm happy to check both routes for you.",
    ],
    followUps: [
      "Roughly what age are you, and is this mainly to protect a mortgage, income, or your family in general?",
      "Are you leaning toward affordable term, or lifelong coverage that builds value?",
      "Want a quick personalized recommendation on coverage amount and type?",
    ],
  },
  {
    id: "health",
    line: "health-insurance",
    triggers: [
      "health insurance",
      "medical insurance",
      "aca",
      "marketplace",
      "obamacare",
      "upmc",
      "highmark",
      "subsidy",
      "health plan",
    ],
    answers: [
      "In Pittsburgh, the make-or-break question is networks: UPMC and Highmark don't always play nice together, so the first thing I check is whether your doctors and preferred hospitals are in-network on a plan before you enroll. Nobody should find that out at the front desk.",
      "A lot of people leave money on the table on the ACA marketplace — subsidies phase in based on household size and income, and after recent changes many folks who assumed they earned too much actually qualify for help. It's worth a two-minute eligibility check before writing off marketplace plans.",
      "Beyond premiums, watch the deductible and out-of-pocket max — a 'cheap' plan with a $9k deductible can cost more than a slightly pricier one if you actually use care. I help you weigh total likely cost, not just the sticker premium.",
    ],
    followUps: [
      "Is this coverage just for you, or for a family too?",
      "Do you have specific doctors or a hospital system you want to keep?",
      "Want me to check what subsidy you might qualify for?",
    ],
  },
  {
    id: "medicare",
    line: "medicare",
    triggers: [
      "medicare",
      "medigap",
      "medicare advantage",
      "part d",
      "part b",
      "turning 65",
      "supplement",
      "senior",
      "65",
    ],
    answers: [
      "The core Medicare decision is Advantage vs. Supplement. Medicare Advantage (Part C) bundles everything, often with a $0 premium and extras like dental/vision, but you use a network. A Supplement (Medigap) pairs with Original Medicare, costs a monthly premium, but gives you wide provider freedom and very predictable out-of-pocket costs. Neither is 'better' — it depends on your doctors, meds, and budget.",
      "Timing matters a lot with Medicare. Your Initial Enrollment is the 7-month window around your 65th birthday, and there's an Annual Enrollment Period every year from Oct 15 to Dec 7. Missing your initial window for Part B or Part D can mean lifelong late penalties, so I make sure you don't trip over the deadlines.",
      "One tip most people miss: your Part D drug plan should be chosen around your actual prescriptions — the 'cheapest' plan can be the most expensive once your specific meds run through it. I check your drug list against plans so there are no surprises at the pharmacy.",
    ],
    followUps: [
      "Are you turning 65 soon, already on Medicare, or helping a parent?",
      "Do you have specific doctors or prescriptions you want to make sure are covered?",
      "Want a free, no-pressure plan review to compare your options?",
    ],
  },
  {
    id: "disability",
    line: "disability-insurance",
    triggers: [
      "disability",
      "income protection",
      "can't work",
      "cant work",
      "own occupation",
      "own-occupation",
      "short term disability",
      "long term disability",
      "paycheck",
    ],
    answers: [
      "Disability insurance is really 'paycheck insurance' — it replaces a chunk of your income if illness or injury keeps you from working. It's the coverage people forget, even though your ability to earn funds everything else you own.",
      "If you only have employer group coverage, two gaps usually exist: it often replaces just 40–60% of base pay (not bonus/commission), the benefit is usually taxable, and it disappears if you leave the job. An individual policy fills those gaps and moves with you.",
      "For professionals, the phrase to look for is 'own-occupation' — it pays if you can't do your specific job, even if you could technically do some other work. That distinction is huge for physicians, dentists, and skilled specialists.",
    ],
    followUps: [
      "Are you employed with benefits, self-employed, or 1099?",
      "Do you already have any coverage through work you'd want to supplement?",
      "Want me to look into options that fit your income?",
    ],
  },
  {
    id: "business",
    line: "business-insurance",
    triggers: [
      "business",
      "commercial",
      "workers comp",
      "workers compensation",
      "liability",
      "bop",
      "llc",
      "company insurance",
      "contractor",
      "e&o",
      "errors and omissions",
    ],
    answers: [
      "For most Pittsburgh businesses, the foundation is a Business Owner's Policy (BOP) — it bundles general liability and commercial property affordably — plus workers' compensation, which Pennsylvania requires for nearly every business with employees.",
      "What you need beyond the basics depends on what you do: if you give advice or professional services, add professional liability (E&O); if you drive for work, commercial auto; if you handle customer data, cyber. I tailor it so you're not over- or under-covered.",
      "A common mistake is running a growing business on a personal policy or the bare minimum — one claim can be existential. I help right-size coverage to your actual risk and revenue, and shop it across carriers.",
    ],
    followUps: [
      "What kind of business is it, and do you have employees?",
      "Are you starting fresh or reviewing coverage you already have?",
      "Want me to put together a commercial quote?",
    ],
  },
  {
    id: "renters",
    line: "renters-insurance",
    triggers: ["renters", "renter", "apartment", "tenant", "rental insurance"],
    answers: [
      "Renters insurance is the best value in insurance — usually about $12–$25/month in Pittsburgh — and it covers your belongings (even when they're stolen away from home), personal liability if someone's hurt in your place, and hotel costs if your unit becomes unlivable.",
      "Two quick tips: consider 'replacement cost' coverage so you're paid what it costs to rebuy your stuff (not its depreciated value), and if you have a laptop, jewelry, or a bike, ask about scheduling those items. Bundling with auto usually knocks a little off both.",
    ],
    followUps: [
      "Does your landlord require a specific liability amount? I can match it.",
      "Do you have a car we could bundle it with to save on both?",
      "Want a quick renters quote? It's usually just a few minutes.",
    ],
  },
  {
    id: "bundle",
    triggers: [
      "bundle",
      "bundling",
      "multi policy",
      "multiple policies",
      "combine",
      "discount",
      "save money",
      "cheaper",
      "lower rate",
      "lower my",
      "reduce",
    ],
    answers: [
      "Bundling is usually the single biggest lever — putting auto with home or renters at the same carrier often cuts 10–25% off both. After that, raising deductibles, keeping a clean record, and safe-driver/low-mileage/paperless discounts add up.",
      "When I shop for you, I automatically stack every discount you qualify for and compare several A-rated carriers side by side — that's typically where the real savings show up versus staying with one company out of habit.",
    ],
    followUps: [
      "What do you have now that we could look at bundling — auto, home, renters?",
      "Want me to run a quick comparison to see what you'd save?",
    ],
  },
  {
    id: "how-it-works",
    triggers: [
      "how does this work",
      "how do you work",
      "what do you do",
      "how does it work",
      "what is this",
      "referral",
      "how do you get paid",
      "who are you",
    ],
    answers: [
      "We're a local Pittsburgh insurance matchmaker. You tell me what you need, a licensed agent shops multiple A-rated carriers for you, and we bring back the best options in plain English. Because we're not tied to one company, we recommend what actually fits you — and it's completely free to you.",
      "It's simple: share what you're looking for, we compare carriers and find every discount, and you choose what fits (or nothing at all). No fees, no obligation. Carriers pay us when we place a policy, which is how the service stays free for you.",
    ],
    followUps: [
      "What are you thinking about covering — auto, home, life, health, Medicare, disability, renters, or business?",
      "Want me to get a couple of quotes started for you?",
    ],
  },
  {
    id: "cost-free",
    triggers: [
      "how much do you cost",
      "is this free",
      "do you charge",
      "the catch",
      "fee",
      "cost to use",
      "free service",
      "cost anything",
    ],
    answers: [
      "It's 100% free to you — there's no fee and no obligation. Insurance carriers compensate licensed agents when a policy is placed, so you get local, licensed guidance at no cost, and it doesn't raise your premium one cent.",
      "No catch at all. You pay the same premium whether you find a policy on your own or through us — the difference is you get someone shopping the market and explaining it for free. Compare, ask anything, and only move forward if it's right for you.",
    ],
    followUps: [
      "Want me to show you what you could save on something specific?",
      "What coverage can I help you with first?",
    ],
  },
  {
    id: "trust",
    triggers: [
      "legit",
      "scam",
      "trust",
      "safe",
      "secure",
      "licensed",
      "reputable",
      "real company",
      "spam",
      "sell my",
    ],
    answers: [
      "Totally fair to ask — being careful is smart. We're a licensed Pennsylvania insurance operation, we only place coverage with A-rated, established carriers, and your information is encrypted and shared only with the carriers needed to quote you. We do not sell your data to random spam lists.",
      "You stay in control the whole way: there's no obligation, you can talk to a licensed human any time, and nothing gets bound without your say-so. Our licensing and disclosures are right on the site if you ever want to verify.",
    ],
    followUps: [
      "Anything specific I can put your mind at ease about?",
      "Would it help to speak with a licensed agent directly?",
    ],
  },
  {
    id: "claims",
    triggers: [
      "claim",
      "file a claim",
      "accident",
      "got in a wreck",
      "damage",
      "how do i claim",
    ],
    answers: [
      "For an active claim, your carrier handles the process directly — but I'm glad to help you understand what your policy should cover and make sure you're not leaving anything on the table. If you don't have the right coverage yet, that's exactly what I'd fix first.",
    ],
    followUps: [
      "Is this about a current claim, or making sure you're covered before something happens?",
      "Want me to review your coverage so there are no surprises?",
    ],
  },
  {
    id: "terms",
    triggers: [
      "deductible",
      "out of pocket",
      "premium mean",
      "what is a premium",
      "coverage limit",
      "what does",
      "difference between",
      "explain",
    ],
    answers: [
      "Here's the plain-English version: your premium is what you pay for the policy (monthly or yearly), your deductible is what you pay out of pocket before insurance kicks in, and your limit is the most the policy will pay. Raising your deductible lowers your premium — the trick is picking a deductible you could comfortably cover if something happened.",
    ],
    followUps: [
      "Want me to walk through this for a specific type of coverage?",
      "Is there a particular term or policy you'd like me to break down?",
    ],
  },
  {
    id: "human",
    triggers: [
      "talk to a person",
      "real person",
      "call me",
      "speak to agent",
      "human",
      "representative",
      "talk to someone",
      "phone call",
    ],
    answers: [
      "Absolutely — a licensed agent would be glad to talk. The quickest way is to tap 'Get My Free Quote' at the top (it takes about two minutes and someone will reach out), or call us directly at ${PHONE}. Whatever's easiest for you.",
    ],
    followUps: [
      "Want me to note what you're interested in so the agent is ready when they call?",
      "Would mornings, afternoons, or evenings be best for a callback?",
    ],
  },
];

/** Simple affirmative/negative detection for natural back-and-forth. */
function isAffirmative(t: string) {
  return /\b(yes|yeah|yep|yup|sure|ok|okay|please|sounds good|let'?s do it|go ahead|definitely|absolutely|i do|i would|that works|sign me up)\b/i.test(
    t
  );
}
function isNegative(t: string) {
  return /\b(no|nope|not now|not really|maybe later|nah|no thanks|not yet)\b/i.test(
    t
  );
}
function isThanks(t: string) {
  return /\b(thank|thanks|appreciate|awesome|perfect|great, thanks|cool)\b/i.test(
    t
  );
}
function isGreeting(t: string) {
  return /^(hi|hey|hello|yo|howdy|hiya|good (morning|afternoon|evening)|greetings)\b/i.test(
    t.trim()
  );
}

function scoreTopic(topic: Topic, text: string): number {
  let score = 0;
  for (const trg of topic.triggers) {
    if (text.includes(trg)) score += trg.length > 4 ? 3 : 1;
  }
  return score;
}

function detectTopic(text: string): Topic | null {
  let best: { topic: Topic; score: number } | null = null;
  for (const topic of topics) {
    const score = scoreTopic(topic, text);
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  return best?.topic ?? null;
}

/** Count how many earlier USER messages hit the same topic (for variety). */
function priorHits(topic: Topic, msgs: Msg[]): number {
  let n = 0;
  for (const m of msgs) {
    if (m.role === "user" && scoreTopic(topic, m.content.toLowerCase()) > 0) n++;
  }
  return n;
}

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

/**
 * The main engine. Reads the whole conversation and produces a reply that is
 * context-aware, avoids repeating the previous message, and nudges toward a
 * free quote.
 */
export function generateReply(messages: Msg[], phone = "(412) 952-4046"): string {
  const userMsgs = messages.filter((m) => m.role === "user");
  const lastUser = userMsgs[userMsgs.length - 1]?.content?.trim() || "";
  const lastUserLc = lastUser.toLowerCase();
  const lastAssistant =
    [...messages].reverse().find((m) => m.role === "assistant")?.content || "";
  const lastAssistantLc = lastAssistant.toLowerCase();
  const turn = userMsgs.length; // how many times the visitor has spoken

  const fill = (s: string) => s.replace(/\$\{PHONE\}/g, phone);

  // 1) Greeting — only when it's really just a greeting.
  if (isGreeting(lastUserLc) && lastUserLc.length < 24 && turn <= 1) {
    return "Hey! Glad you reached out. I can help you compare coverage, break down how insurance works, or get you a fast free quote — for auto, home, life, health, Medicare, disability, renters or business. What's on your mind?";
  }

  // 2) Thanks / wrap-up.
  if (isThanks(lastUserLc) && !detectTopic(lastUserLc)) {
    return `You're very welcome! Anytime. Whenever you're ready I can line up free quotes or answer anything else — no pressure at all. And if you'd rather just talk it through, a licensed agent is a call away at ${phone}.`;
  }

  // 3) Yes/No answering the assistant's previous follow-up.
  const assistantOfferedQuote =
    /(quote|line up|pull together|get.*started|plan review|save|comparison|options)/.test(
      lastAssistantLc
    );
  const assistantAskedCallback = /(callback|call|mornings|afternoons|evenings|reach out|when.*best)/.test(
    lastAssistantLc
  );

  if (isAffirmative(lastUserLc) && lastUser.length < 40) {
    if (assistantAskedCallback) {
      return `Perfect. The fastest way to lock that in is to tap 'Get My Free Quote' at the top and add your name, phone, and ZIP — a licensed agent will reach out at the time you prefer. Or call us directly at ${phone}. Anything else I can prep for you in the meantime?`;
    }
    if (assistantOfferedQuote) {
      return "Great — let's do it. Tap the 'Get My Free Quote' button at the top of the page (about two minutes), or tell me your ZIP code and I'll make sure it's routed to the right local agent. What's the best number for someone to reach you?";
    }
    // Generic yes with no clear offer — move things forward usefully.
    return "Awesome. To point you to the right coverage and a local agent, what type are you interested in — auto, home, life, health, Medicare, disability, renters, or business?";
  }

  if (isNegative(lastUserLc) && lastUser.length < 30) {
    return "No problem at all — no pressure here. I'm happy to just answer questions. Is there anything about coverage, pricing, or how a specific policy works that I can clear up for you?";
  }

  // 4) Substantive topic detection.
  const topic = detectTopic(lastUserLc);
  if (topic) {
    const hits = priorHits(topic, messages.slice(0, -1)); // exclude current msg
    let answer = fill(pick(topic.answers, hits));

    // Avoid echoing the exact previous assistant message.
    if (answer.trim() === lastAssistant.trim()) {
      answer = fill(pick(topic.answers, hits + 1));
    }

    const followUp = fill(pick(topic.followUps, turn));

    // After a couple of exchanges, gently steer toward capturing the lead.
    const nudge =
      turn >= 3 && topic.line
        ? " When you're ready, the 'Get My Free Quote' button up top gets a licensed agent working on it right away."
        : "";

    return `${answer} ${followUp}${nudge}`;
  }

  // 5) No match — ask a varied, helpful clarifying question (never the same twice).
  const clarifiers = [
    "I want to give you a real answer, not a generic one — can you tell me a bit more? For example, is this about auto, home, life, health, Medicare, disability, renters, or business insurance?",
    "Happy to dig into that. Which type of coverage are you thinking about — or is it a general question about cost, coverage, or how a policy works?",
    "Good question — let me make sure I steer you right. Are you looking to get a new policy, lower a bill you already have, or just understand your options?",
    `I might be better on that one live — a licensed agent can get into specifics. Want to tap 'Get My Free Quote' up top, or call ${phone}? In the meantime, what coverage is this about?`,
  ];
  return pick(clarifiers, turn);
}

/** Backwards-compatible single-message helper (used as a last resort). */
export function findBestAnswer(message: string): string {
  return generateReply([{ role: "user", content: message }]);
}

/** Compact reference text used to ground the LLM when a key is configured. */
export const knowledgeContext = topics
  .map((t) => `${t.id.toUpperCase()}: ${t.answers.join(" ")}`)
  .join("\n");
