/**
 * Built-in insurance knowledge base.
 *
 * This powers the concierge when no LLM key is configured, and is also injected
 * as authoritative reference material when an LLM IS configured, so answers stay
 * accurate and Pittsburgh-specific. Think of it as a licensed agent's cheat
 * sheet: general insurance literacy + Pennsylvania/Pittsburgh specifics.
 */

export type KnowledgeEntry = {
  id: string;
  // words/phrases that indicate the user is asking about this topic
  triggers: string[];
  answer: string;
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "greeting",
    triggers: [
      "hi",
      "hello",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
      "yo",
      "hiya",
    ],
    answer:
      "Hi there! Thanks for reaching out. I'm here to help you find the right insurance in Pittsburgh — home, auto, life, health, disability, business, you name it. What are you shopping for today?",
  },
  {
    id: "how-it-works",
    triggers: [
      "how does this work",
      "how do you work",
      "what do you do",
      "how does it work",
      "what is this",
      "who are you",
      "referral",
    ],
    answer:
      "Great question. We're a local Pittsburgh insurance matchmaker. You tell us what you need, we match you with trusted, licensed carriers and shop competitive quotes for you — completely free. There's no obligation, and we only recommend coverage that actually fits your situation. Want me to grab a few details and get you started?",
  },
  {
    id: "cost-free",
    triggers: [
      "how much do you cost",
      "is this free",
      "do you charge",
      "what's the catch",
      "whats the catch",
      "fee",
      "cost to use",
      "free service",
    ],
    answer:
      "Our service is 100% free to you. Insurance carriers compensate licensed agents when we place a policy, so there's no added cost or fee on your end — and no obligation to buy. You get local, licensed guidance at no charge.",
  },
  {
    id: "auto",
    triggers: [
      "auto",
      "car",
      "vehicle",
      "driving",
      "driver",
      "sr-22",
      "sr22",
      "collision",
    ],
    answer:
      "For auto insurance in Pennsylvania, the state minimum is $15,000/$30,000 bodily injury, $5,000 property damage, and $5,000 medical benefits — but many drivers choose higher limits for real protection. We compare A-rated carriers, find every discount (bundling, safe-driver, low-mileage), and can even help with SR-22 or high-risk situations. Want me to pull together some auto quotes for you?",
  },
  {
    id: "home",
    triggers: [
      "home",
      "house",
      "homeowner",
      "homeowners",
      "dwelling",
      "roof",
      "basement",
      "flood",
      "water backup",
    ],
    answer:
      "Pittsburgh homes are wonderfully unique — and older homes, hillside lots and finished basements need thoughtful coverage. A standard policy covers your dwelling, belongings, liability and living expenses, but flooding and sewer/sump-pump backup usually need to be added by endorsement. Given our rivers and heavy rains, I always flag that. Would you like me to get homeowners quotes started?",
  },
  {
    id: "life",
    triggers: [
      "life insurance",
      "term life",
      "whole life",
      "final expense",
      "burial",
      "death benefit",
      "beneficiary",
    ],
    answer:
      "Life insurance comes down to protecting the people who depend on you. Term life is affordable and covers a set period (great for a mortgage or income replacement); whole life lasts your lifetime and builds cash value. A common starting point is 10–12x your income plus debts, but I'd tailor it to you. Many healthy applicants even qualify for no-exam coverage. Want a personalized recommendation?",
  },
  {
    id: "health",
    triggers: [
      "health insurance",
      "medical insurance",
      "aca",
      "marketplace",
      "obamacare",
      "upmc",
      "highmark",
      "subsidy",
    ],
    answer:
      "Health coverage in Pittsburgh usually means navigating UPMC and Highmark networks plus the ACA marketplace. The key is making sure your doctors are in-network and checking whether you qualify for a premium subsidy — many people do without realizing it. I can review individual, family, short-term and Medicare options. Which situation fits you best?",
  },
  {
    id: "medicare",
    triggers: [
      "medicare",
      "medigap",
      "medicare advantage",
      "part d",
      "turning 65",
      "supplement",
      "senior",
    ],
    answer:
      "Medicare doesn't have to be overwhelming. Medicare Advantage (Part C) bundles coverage — often $0 premium with extras — but uses networks. A Medicare Supplement (Medigap) pairs with Original Medicare for wider provider freedom and lower surprise costs. Your Initial Enrollment is the 7 months around your 65th birthday, and the Annual Enrollment Period runs Oct 15–Dec 7. I'll make sure your Pittsburgh doctors are covered. Want a free plan review?",
  },
  {
    id: "disability",
    triggers: [
      "disability",
      "income protection",
      "can't work",
      "cant work",
      "own occupation",
      "short term disability",
      "long term disability",
    ],
    answer:
      "Disability insurance protects your paycheck if illness or injury keeps you from working — arguably your most important coverage, since your income funds everything else. Employer group plans often replace only 40–60% of pay and may be taxed, so an individual policy can fill the gap and follow you between jobs. 'Own-occupation' coverage is especially valuable for professionals. Want me to look into options?",
  },
  {
    id: "business",
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
    ],
    answer:
      "For Pittsburgh businesses, the essentials are general liability, commercial property (often bundled as a BOP), and workers' compensation — which Pennsylvania requires for nearly all employers. Depending on what you do, professional liability (E&O), commercial auto and cyber coverage may matter too. Tell me a bit about your business and I'll point you in the right direction.",
  },
  {
    id: "renters",
    triggers: [
      "renters",
      "renter",
      "apartment",
      "tenant",
      "rental insurance",
    ],
    answer:
      "Renters insurance is one of the best values out there — usually about $12–$25 a month in Pittsburgh — and it covers your belongings (even away from home), personal liability, and temporary living costs if your place becomes unlivable. Landlords often require it too. Want me to find you a quick, affordable quote?",
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
    ],
    answer:
      "Bundling is one of the easiest ways to save — combining auto with home or renters can cut 10–25% off both. Beyond that, higher deductibles, a clean record, safe-driver and low-mileage discounts all help. When I shop carriers for you, I stack every discount you qualify for automatically. Want me to see what you could save?",
  },
  {
    id: "quote",
    triggers: [
      "quote",
      "get started",
      "sign up",
      "how do i apply",
      "ready to buy",
      "estimate",
    ],
    answer:
      "Happy to help you get a quote — it's free and takes just a couple of minutes. The fastest way is our quick quote form, or I can gather the basics right here. What type of insurance are you looking for, and what's the best way to reach you with your options?",
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
      "real",
      "reputable",
      "is this a scam",
    ],
    answer:
      "Completely understand wanting to be sure — that's smart. We're a licensed Pennsylvania insurance operation, we only work with A-rated, established carriers, and your information is encrypted and never sold to random third parties. You're always in control and there's zero obligation. Is there anything specific I can reassure you about?",
  },
  {
    id: "claims",
    triggers: [
      "claim",
      "file a claim",
      "accident",
      "damage",
      "how do i claim",
    ],
    answer:
      "If you need to file a claim, your carrier handles the claim process directly, but we're here to help you understand your coverage and advocate for you. If you don't have a policy with us yet, I'd start by making sure you have the right coverage before something happens — want me to review your options?",
  },
  {
    id: "deductible",
    triggers: [
      "deductible",
      "out of pocket",
      "premium meaning",
      "what is a premium",
      "coverage limit",
    ],
    answer:
      "A deductible is what you pay out of pocket before insurance kicks in; a premium is what you pay for the policy (monthly or yearly). Choosing a higher deductible usually lowers your premium, and vice versa. The right balance depends on your budget and risk comfort — I'm happy to help you find the sweet spot.",
  },
  {
    id: "thanks",
    triggers: ["thank", "thanks", "appreciate", "great", "awesome", "perfect"],
    answer:
      "You're very welcome! I'm glad I could help. Whenever you're ready, I can pull together free quotes or answer anything else — no pressure at all. Is there anything else on your mind?",
  },
  {
    id: "human",
    triggers: [
      "talk to a person",
      "real person",
      "call me",
      "phone",
      "speak to agent",
      "human",
      "representative",
    ],
    answer:
      "Of course — a licensed agent would be glad to speak with you directly. You can call us any time during business hours, or leave your name and number through our quick form and we'll reach out at a time that works for you. Would you like me to set that up?",
  },
];

/**
 * Very small intent matcher used by the offline concierge.
 * Scores each entry by how many triggers appear in the message.
 */
export function findBestAnswer(message: string): string {
  const text = message.toLowerCase();
  let best: { score: number; answer: string } | null = null;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const trigger of entry.triggers) {
      if (text.includes(trigger)) {
        // longer, more specific triggers count for more
        score += trigger.length > 4 ? 2 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }

  if (best) return best.answer;

  return (
    "That's a good question. I want to make sure I give you accurate, personalized guidance rather than a generic answer — so I can either dig into it with you here, or have a licensed local agent follow up with specifics. Could you tell me a little more about what you're looking for (for example: auto, home, life, health, disability, Medicare, renters, or business insurance)?"
  );
}

/** Compact reference text used to ground the LLM when a key is configured. */
export const knowledgeContext = knowledgeBase
  .map((k) => `• ${k.answer}`)
  .join("\n");
