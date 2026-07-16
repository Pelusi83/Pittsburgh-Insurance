/**
 * The catalog of insurance lines the hub matches people with.
 * Each entry powers: the homepage grid, the quote form dropdown, and a
 * dedicated SEO landing page at /insurance/[slug].
 */

export type InsuranceType = {
  slug: string;
  name: string;
  shortName: string;
  icon: string; // emoji used as a lightweight, universally-rendering icon
  tagline: string;
  blurb: string;
  // SEO landing-page content
  heroHeadline: string;
  heroSub: string;
  benefits: string[];
  coverIncludes: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const insuranceTypes: InsuranceType[] = [
  {
    slug: "auto-insurance",
    name: "Auto Insurance",
    shortName: "Auto",
    icon: "🚗",
    tagline: "Coverage that keeps you moving.",
    blurb:
      "Compare Pittsburgh auto rates from top-rated carriers and only pay for the protection you actually need.",
    heroHeadline: "Pittsburgh Auto Insurance — Compare & Save in Minutes",
    heroSub:
      "From I-376 commuters to weekend drivers, we match Pittsburgh drivers with the right coverage at the right price. Free, no-pressure quotes from A-rated carriers.",
    benefits: [
      "Compare multiple licensed carriers in one place",
      "Bundle with home or renters to save more",
      "SR-22 and high-risk options available",
      "Local help understanding PA's minimum limits",
    ],
    coverIncludes: [
      "Liability (bodily injury & property damage)",
      "Collision & comprehensive",
      "Uninsured / underinsured motorist",
      "Medical benefits & roadside assistance",
    ],
    faqs: [
      {
        q: "What auto coverage is required in Pennsylvania?",
        a: "Pennsylvania requires liability coverage of at least $15,000 per person / $30,000 per accident for bodily injury, $5,000 property damage, and $5,000 in medical benefits. We help you decide whether the state minimum is enough or if higher limits protect you better.",
      },
      {
        q: "How can I lower my Pittsburgh car insurance?",
        a: "Bundling auto with home or renters, raising your deductible, maintaining a clean record, and taking advantage of low-mileage or safe-driver discounts are the most common ways. We shop these discounts across carriers for you automatically.",
      },
      {
        q: "Do you help with SR-22 or high-risk drivers?",
        a: "Yes. We work with carriers that specialize in SR-22 filings and high-risk situations so you can stay legally on the road.",
      },
    ],
    keywords: [
      "Pittsburgh auto insurance",
      "cheap car insurance Pittsburgh PA",
      "Pittsburgh car insurance quotes",
      "SR-22 Pittsburgh",
    ],
  },
  {
    slug: "home-insurance",
    name: "Home Insurance",
    shortName: "Home",
    icon: "🏠",
    tagline: "Protect your biggest investment.",
    blurb:
      "Homeowners coverage tailored to Pittsburgh's older housing stock, basements and winter weather.",
    heroHeadline: "Pittsburgh Homeowners Insurance Done Right",
    heroSub:
      "Century-old rowhomes, hillside properties, finished basements — Pittsburgh homes are unique. We match you with carriers who understand them and price them fairly.",
    benefits: [
      "Coverage for older homes & knob-and-tube considerations",
      "Water backup & sump-pump failure options",
      "Replacement-cost vs. actual-cash-value guidance",
      "Bundle with auto for multi-policy discounts",
    ],
    coverIncludes: [
      "Dwelling & other structures",
      "Personal property & liability",
      "Loss of use / additional living expenses",
      "Optional flood & water-backup endorsements",
    ],
    faqs: [
      {
        q: "Does home insurance cover basement flooding in Pittsburgh?",
        a: "Standard policies typically exclude flood, but water backup from sump pumps or sewers can be added by endorsement, and true flood coverage is available through the NFIP or private carriers. Given Pittsburgh's rivers and heavy rain, we always review this with you.",
      },
      {
        q: "How much dwelling coverage do I need?",
        a: "You want enough to rebuild your home at today's construction costs — not its market value. We help you calculate replacement cost so you're neither underinsured nor overpaying.",
      },
      {
        q: "Can I get coverage for an older Pittsburgh home?",
        a: "Absolutely. Many Pittsburgh homes are 80–120 years old. We work with carriers comfortable insuring older homes, including guidance on updates that lower your premium.",
      },
    ],
    keywords: [
      "Pittsburgh home insurance",
      "homeowners insurance Pittsburgh PA",
      "Pittsburgh house insurance quotes",
    ],
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    shortName: "Life",
    icon: "❤️",
    tagline: "Peace of mind for the people you love.",
    blurb:
      "Term and whole life options that protect your family's future — many with no medical exam.",
    heroHeadline: "Life Insurance for Pittsburgh Families",
    heroSub:
      "Whether you're protecting a mortgage, replacing income, or leaving a legacy, we help you find honest coverage at a price that fits your budget.",
    benefits: [
      "Term, whole & final-expense options",
      "No-exam policies for qualifying applicants",
      "Coverage to protect your mortgage & income",
      "Guidance on how much you actually need",
    ],
    coverIncludes: [
      "Term life (10, 20, 30 year)",
      "Whole & universal life",
      "Final expense / burial insurance",
      "Living benefits & riders",
    ],
    faqs: [
      {
        q: "How much life insurance do I need?",
        a: "A common rule is 10–12x your annual income, plus your mortgage and any debts, plus future costs like college. We'll walk through your specific situation — there's no one-size-fits-all number.",
      },
      {
        q: "Can I get life insurance without a medical exam?",
        a: "Many healthy applicants qualify for no-exam (accelerated underwriting) policies that can be approved in days. We'll tell you honestly whether it's the best value for you.",
      },
      {
        q: "What's the difference between term and whole life?",
        a: "Term covers you for a set period (like 20 years) at a lower cost — great for income replacement. Whole life lasts your whole life and builds cash value, at a higher premium. We explain the trade-offs clearly.",
      },
    ],
    keywords: [
      "Pittsburgh life insurance",
      "term life insurance Pittsburgh",
      "no exam life insurance PA",
    ],
  },
  {
    slug: "health-insurance",
    name: "Health Insurance",
    shortName: "Health",
    icon: "🩺",
    tagline: "Care that fits your life and budget.",
    blurb:
      "Individual, family, Medicare and short-term plans from Pennsylvania's major networks.",
    heroHeadline: "Pittsburgh Health Insurance & Medicare Help",
    heroSub:
      "Navigating UPMC, Highmark and the marketplace is confusing. We simplify your options — individual, family, ACA subsidies and Medicare — so you choose with confidence.",
    benefits: [
      "Marketplace (ACA) plans & subsidy checks",
      "Medicare Advantage & Supplement guidance",
      "Individual, family & short-term options",
      "Local knowledge of UPMC & Highmark networks",
    ],
    coverIncludes: [
      "ACA marketplace & off-exchange plans",
      "Medicare Advantage & Medigap",
      "Short-term & dental/vision add-ons",
      "Subsidy & cost-sharing eligibility review",
    ],
    faqs: [
      {
        q: "Which network is better in Pittsburgh — UPMC or Highmark?",
        a: "It depends on your doctors and hospitals. We check that your preferred providers are in-network before you enroll, so you're never surprised at the front desk.",
      },
      {
        q: "Do I qualify for a marketplace subsidy?",
        a: "Many people do and don't realize it. We run a quick eligibility check based on household size and income to see how much you could save on premiums.",
      },
      {
        q: "When can I sign up for Medicare?",
        a: "Your Initial Enrollment Period is the 7 months around your 65th birthday, with an Annual Enrollment Period each fall (Oct 15–Dec 7). We'll make sure you don't miss deadlines or pay a late penalty.",
      },
    ],
    keywords: [
      "Pittsburgh health insurance",
      "Medicare Pittsburgh",
      "ACA marketplace Pittsburgh PA",
    ],
  },
  {
    slug: "disability-insurance",
    name: "Disability Insurance",
    shortName: "Disability",
    icon: "🦺",
    tagline: "Protect your paycheck.",
    blurb:
      "Income protection if illness or injury keeps you from working — for employees and the self-employed.",
    heroHeadline: "Disability Insurance — Protect Your Income",
    heroSub:
      "Your ability to earn is your most valuable asset. We help Pittsburgh professionals and business owners replace income if they can't work due to injury or illness.",
    benefits: [
      "Short-term & long-term disability",
      "Own-occupation coverage for professionals",
      "Options for self-employed & 1099 earners",
      "Coordinates with employer coverage",
    ],
    coverIncludes: [
      "Short-term income replacement",
      "Long-term disability",
      "Own-occupation & specialty riders",
      "Business overhead expense coverage",
    ],
    faqs: [
      {
        q: "Doesn't my employer already cover disability?",
        a: "Group coverage often replaces only 40–60% of base pay and may be taxable. We help you fill the gap with an individual policy that stays with you if you change jobs.",
      },
      {
        q: "What is 'own-occupation' coverage?",
        a: "It pays benefits if you can't perform the duties of your specific profession, even if you could do another job. It's especially valuable for physicians, dentists, and skilled specialists.",
      },
      {
        q: "Can self-employed people get disability insurance?",
        a: "Yes — and it's critical, since there's no employer safety net. We also offer business overhead expense coverage to keep your business running if you're out.",
      },
    ],
    keywords: [
      "Pittsburgh disability insurance",
      "income protection Pittsburgh",
      "own occupation disability PA",
    ],
  },
  {
    slug: "business-insurance",
    name: "Business Insurance",
    shortName: "Business",
    icon: "🏢",
    tagline: "Cover your company, top to bottom.",
    blurb:
      "General liability, workers' comp, commercial property and BOP coverage for Pittsburgh businesses.",
    heroHeadline: "Business & Commercial Insurance in Pittsburgh",
    heroSub:
      "From Strip District startups to established contractors, we match Pittsburgh businesses with the right liability, property and workers' comp coverage.",
    benefits: [
      "General & professional liability",
      "Workers' compensation (required in PA)",
      "Business Owner's Policy (BOP) bundles",
      "Commercial auto & cyber options",
    ],
    coverIncludes: [
      "General & professional liability",
      "Commercial property & BOP",
      "Workers' compensation",
      "Commercial auto & cyber liability",
    ],
    faqs: [
      {
        q: "Is workers' comp required in Pennsylvania?",
        a: "Yes. Pennsylvania requires nearly all employers with employees to carry workers' compensation. We make sure you're compliant and competitively priced.",
      },
      {
        q: "What is a BOP?",
        a: "A Business Owner's Policy bundles general liability and commercial property into one cost-effective package — ideal for small and mid-size Pittsburgh businesses.",
      },
      {
        q: "Do I need professional liability (E&O)?",
        a: "If you give advice or provide professional services (consultants, agencies, healthcare, real estate), errors & omissions coverage protects you from claims of mistakes or negligence.",
      },
    ],
    keywords: [
      "Pittsburgh business insurance",
      "commercial insurance Pittsburgh PA",
      "workers comp Pittsburgh",
    ],
  },
  {
    slug: "renters-insurance",
    name: "Renters Insurance",
    shortName: "Renters",
    icon: "🔑",
    tagline: "Big protection, small price.",
    blurb:
      "Affordable coverage for your belongings and liability — often under $20/month.",
    heroHeadline: "Renters Insurance in Pittsburgh from a Few Dollars a Month",
    heroSub:
      "Renting in Lawrenceville, Oakland or the South Side? Protect your stuff and your liability for less than a coffee a week.",
    benefits: [
      "Covers theft, fire & water damage",
      "Personal liability protection",
      "Often required by landlords",
      "Bundle with auto to save on both",
    ],
    coverIncludes: [
      "Personal property protection",
      "Personal liability",
      "Additional living expenses",
      "Guest medical payments",
    ],
    faqs: [
      {
        q: "How much does renters insurance cost in Pittsburgh?",
        a: "Most Pittsburgh renters pay roughly $12–$25 per month depending on coverage limits and location. We shop carriers to find you the best rate.",
      },
      {
        q: "Does renters insurance cover my roommate?",
        a: "Usually only people named on the policy are covered. We'll advise whether a shared policy or separate policies make more sense for you.",
      },
      {
        q: "Will it cover my laptop if it's stolen away from home?",
        a: "Most policies cover your belongings even outside your apartment, including theft while traveling. We confirm the details before you buy.",
      },
    ],
    keywords: [
      "renters insurance Pittsburgh",
      "apartment insurance Pittsburgh PA",
      "cheap renters insurance Pittsburgh",
    ],
  },
  {
    slug: "medicare",
    name: "Medicare Plans",
    shortName: "Medicare",
    icon: "🧓",
    tagline: "Turning 65 or reviewing your plan?",
    blurb:
      "Clear, unbiased Medicare Advantage and Supplement guidance for Pittsburgh seniors.",
    heroHeadline: "Medicare Made Simple for Pittsburgh Seniors",
    heroSub:
      "No jargon, no pressure. We explain Medicare Advantage, Supplements and Part D so you can pick the plan that fits your doctors, medications and budget.",
    benefits: [
      "Medicare Advantage & Supplement (Medigap)",
      "Part D prescription drug plans",
      "Check that your doctors are in-network",
      "Free annual plan reviews",
    ],
    coverIncludes: [
      "Medicare Advantage (Part C)",
      "Medicare Supplement (Medigap)",
      "Part D drug plans",
      "Dental, vision & hearing add-ons",
    ],
    faqs: [
      {
        q: "What's the difference between Medicare Advantage and a Supplement?",
        a: "Advantage plans (Part C) bundle coverage, often with $0 premiums and extra perks, but use networks. Supplements (Medigap) pair with Original Medicare to reduce out-of-pocket costs and offer wide provider freedom. We compare both for you.",
      },
      {
        q: "Will my Pittsburgh doctors accept the plan?",
        a: "We verify your current doctors and hospitals — including UPMC and Allegheny Health Network providers — are covered before you enroll.",
      },
      {
        q: "Does it cost anything to use your Medicare help?",
        a: "No. Our Medicare guidance is completely free to you — carriers compensate licensed agents, so there's no cost added to your plan.",
      },
    ],
    keywords: [
      "Medicare Pittsburgh",
      "Medicare Advantage Pittsburgh PA",
      "Medicare supplement Pittsburgh",
    ],
  },
];

export function getInsuranceType(slug: string): InsuranceType | undefined {
  return insuranceTypes.find((t) => t.slug === slug);
}

/**
 * One quick, OPTIONAL, single-tap qualifying question per insurance line.
 * Shown in the quote form to help route the lead to the right agent/carrier
 * without adding friction. Kept to a single multiple-choice question so it
 * never feels like a long form.
 */
export type Qualifier = { question: string; options: string[] };

export const quoteQualifiers: Record<string, Qualifier> = {
  "auto-insurance": {
    question: "How many vehicles?",
    options: ["1", "2", "3+"],
  },
  "home-insurance": {
    question: "Property type?",
    options: ["Single-family", "Townhome", "Condo", "Multi-unit"],
  },
  "life-insurance": {
    question: "Coverage amount you have in mind?",
    options: ["$100k", "$250k", "$500k", "$1M+", "Not sure"],
  },
  "health-insurance": {
    question: "Who needs coverage?",
    options: ["Just me", "Me + spouse", "Family"],
  },
  "disability-insurance": {
    question: "Your work situation?",
    options: ["Employed (W-2)", "Self-employed", "1099 / contractor"],
  },
  "business-insurance": {
    question: "Do you have employees?",
    options: ["Just me", "2–10", "11+"],
  },
  "renters-insurance": {
    question: "Do you also have a car to bundle?",
    options: ["Yes", "No"],
  },
  medicare: {
    question: "Where are you with Medicare?",
    options: ["Turning 65 soon", "Already enrolled", "Helping a parent"],
  },
};

export function getQualifier(slug: string): Qualifier | undefined {
  return quoteQualifiers[slug];
}
