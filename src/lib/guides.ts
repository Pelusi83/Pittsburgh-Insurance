/**
 * SEO guides / articles — cornerstone content targeting high-intent local
 * insurance questions. Each guide generates a page at /guides/[slug] with
 * Article + FAQ + Breadcrumb structured data for strong organic ranking.
 *
 * Content is educational and Pittsburgh/Pennsylvania-specific. It is general
 * information, not advice — every article notes that coverage is subject to
 * carrier underwriting.
 */

export type GuideSection = { heading?: string; body: string[] };

export type Guide = {
  slug: string;
  title: string; // H1 / page title
  category: string; // e.g. "Auto"
  relatedInsurance: string; // insurance slug for CTA + internal links
  description: string; // meta description
  readMins: number;
  updated: string; // ISO date
  keywords: string[];
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
};

export const guides: Guide[] = [
  {
    slug: "pa-limited-vs-full-tort",
    title: "Limited vs. Full Tort in Pennsylvania: Which Should You Choose?",
    category: "Auto",
    relatedInsurance: "auto-insurance",
    description:
      "Pennsylvania's limited vs. full tort choice is one of the most important — and misunderstood — decisions on your car insurance. Here's what each means and how Pittsburgh drivers should decide.",
    readMins: 4,
    updated: "2026-07-01",
    keywords: [
      "limited vs full tort PA",
      "Pennsylvania tort option",
      "Pittsburgh car insurance tort",
      "full tort Pennsylvania",
    ],
    intro:
      "When you buy car insurance in Pennsylvania, you pick a 'tort option' — limited or full. It quietly shapes your rights after an accident, yet many drivers choose it without realizing what they're giving up. Here's a plain-English breakdown.",
    sections: [
      {
        heading: "What the tort choice actually decides",
        body: [
          "Pennsylvania is one of a handful of states with a 'choice no-fault' system. Your tort selection determines whether you keep the full right to sue an at-fault driver for pain and suffering (non-economic damages) after a crash.",
          "It does not change your ability to recover actual costs like medical bills, lost wages, and vehicle repairs — those are covered regardless. It only affects your right to compensation for pain, suffering, and inconvenience.",
        ],
      },
      {
        heading: "Full tort: more rights, slightly higher premium",
        body: [
          "With full tort, you keep the unrestricted right to sue for pain and suffering after an accident that wasn't your fault. If you're seriously injured, this can matter a great deal.",
          "It typically costs a bit more per month — but for many families, preserving that right is worth the modest difference.",
        ],
      },
      {
        heading: "Limited tort: cheaper, but with real trade-offs",
        body: [
          "Limited tort lowers your premium in exchange for giving up the right to sue for pain and suffering in most cases. There are exceptions (for example, 'serious injury' as defined by law, or crashes caused by drunk drivers), but those exceptions can be hard to meet and often require litigation.",
          "The savings are real, but so is the trade-off. If you're on a tight budget, limited tort can make sense — just go in with eyes open.",
        ],
      },
      {
        heading: "How most Pittsburgh drivers should think about it",
        body: [
          "If you can comfortably afford the difference, full tort generally gives you more protection for what's usually a small monthly increase. If every dollar counts, limited tort is a legitimate way to cut costs.",
          "The right answer depends on your budget, health coverage, and risk tolerance. We're happy to price both options side by side so you can see the actual difference before you choose.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does limited tort affect my medical bills after a crash?",
        a: "No. Your medical benefits and economic losses (bills, lost wages, repairs) are handled the same way. Limited tort only restricts your right to sue for pain and suffering in most situations.",
      },
      {
        q: "Can I switch from limited to full tort?",
        a: "Yes, you can change your tort option when you buy a new policy or at renewal. We can quote both so you can compare the cost and decide.",
      },
      {
        q: "Which is more popular in Pittsburgh?",
        a: "Both are common. Drivers focused on lowest price often pick limited tort; those prioritizing protection lean full tort. We help you weigh the specific dollar difference for your situation.",
      },
    ],
  },
  {
    slug: "how-much-car-insurance-pennsylvania",
    title: "How Much Car Insurance Do You Really Need in Pennsylvania?",
    category: "Auto",
    relatedInsurance: "auto-insurance",
    description:
      "Pennsylvania's minimum car insurance limits are low — often too low. Here's how much coverage Pittsburgh drivers actually need to protect themselves.",
    readMins: 5,
    updated: "2026-07-01",
    keywords: [
      "how much car insurance Pennsylvania",
      "PA minimum car insurance",
      "Pittsburgh auto coverage limits",
      "15/30/5 Pennsylvania",
    ],
    intro:
      "It's tempting to buy the cheapest legal coverage and move on. But Pennsylvania's minimums are low, and a single serious accident can leave you personally on the hook for the rest. Here's how to think about the right amount.",
    sections: [
      {
        heading: "Pennsylvania's minimum limits",
        body: [
          "State law requires at least $15,000 of bodily injury coverage per person, $30,000 per accident, and $5,000 of property damage — often written as '15/30/5' — plus $5,000 in first-party medical benefits.",
          "Those numbers sound fine until you consider that a single ER visit, surgery, or a totaled late-model vehicle can blow past them quickly.",
        ],
      },
      {
        heading: "Why the minimum is usually not enough",
        body: [
          "If you cause an accident that injures others or damages an expensive vehicle, and the costs exceed your limits, you can be sued personally for the difference — putting your savings, wages, and assets at risk.",
          "That's why many Pittsburgh drivers step up to 100/300/100 (or higher). The increase in premium is often smaller than people expect, because the first dollars of coverage are the most expensive.",
        ],
      },
      {
        heading: "Don't skip uninsured/underinsured motorist coverage",
        body: [
          "A meaningful share of drivers carry little or no insurance. Uninsured/underinsured motorist (UM/UIM) coverage protects YOU and your passengers when the at-fault driver can't pay.",
          "It's one of the most valuable and overlooked coverages on a Pennsylvania policy — we almost always recommend carrying solid UM/UIM limits.",
        ],
      },
      {
        heading: "Collision, comprehensive, and deductibles",
        body: [
          "Collision covers your car in a crash; comprehensive covers theft, weather, and animal strikes (common on Pittsburgh's wooded roads). If your car is financed or newer, you'll generally want both.",
          "Choosing a higher deductible lowers your premium — just pick an amount you could comfortably pay out of pocket if you had a claim.",
        ],
      },
      {
        heading: "A simple rule of thumb",
        body: [
          "Carry enough liability to protect your assets and income, add strong UM/UIM, and set deductibles you can afford. If you own a home or have savings, the minimum is rarely the right call.",
          "We'll compare A-rated carriers and show you the real cost difference between limit levels so you can protect yourself without overpaying.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the Pennsylvania minimum enough coverage?",
        a: "For most drivers, no. The 15/30/5 minimum can be exhausted by one serious accident, leaving you personally liable for the rest. Higher limits usually cost less than people expect.",
      },
      {
        q: "What limits do you recommend?",
        a: "It depends on your assets and budget, but many drivers are well served by 100/300/100 with strong uninsured/underinsured motorist coverage. We'll tailor it to you.",
      },
      {
        q: "How can I lower my premium without going to the minimum?",
        a: "Bundle auto with home or renters, raise your deductibles, and capture safe-driver and low-mileage discounts. We shop these across carriers automatically.",
      },
    ],
  },
  {
    slug: "flood-insurance-pittsburgh",
    title: "Do You Need Flood Insurance in Pittsburgh? Basements, Backups & Rivers",
    category: "Home",
    relatedInsurance: "home-insurance",
    description:
      "Standard home insurance excludes flooding — a real concern in a city built around three rivers. Here's what Pittsburgh homeowners need to know about flood and water-backup coverage.",
    readMins: 5,
    updated: "2026-07-01",
    keywords: [
      "flood insurance Pittsburgh",
      "basement flooding coverage Pittsburgh",
      "water backup insurance PA",
      "does home insurance cover flooding",
    ],
    intro:
      "Pittsburgh is defined by its rivers, hills, and heavy rain — and by a lot of finished basements. Unfortunately, the water damage homeowners worry about most is often the type standard policies exclude. Here's how the coverage really works.",
    sections: [
      {
        heading: "Standard home insurance excludes flood",
        body: [
          "A typical homeowners policy covers many kinds of water damage (like a burst pipe), but it specifically excludes 'flood' — rising surface water from rivers, creeks, or heavy runoff.",
          "In a region shaped by the Allegheny, Monongahela, and Ohio rivers plus steep terrain, that exclusion is worth taking seriously.",
        ],
      },
      {
        heading: "Flood coverage: NFIP and private options",
        body: [
          "True flood coverage comes from a separate policy — through the National Flood Insurance Program (NFIP) or a private flood insurer. You don't have to be in a designated flood zone to buy it, and premiums vary widely by location and elevation.",
          "If your home is near water, at the bottom of a hill, or has a history of water issues, it's worth getting a flood quote even if it isn't required by your lender.",
        ],
      },
      {
        heading: "Water/sewer backup — the endorsement most people need",
        body: [
          "Separate from flood, 'water backup' coverage handles water that backs up through sewers or drains, or from a failed sump pump — a classic Pittsburgh finished-basement nightmare.",
          "This is usually added to your home policy as an inexpensive endorsement. If you have a finished basement, a sump pump, or store valuables downstairs, we almost always recommend it.",
        ],
      },
      {
        heading: "How to protect your Pittsburgh home",
        body: [
          "Review three things: your standard policy's water coverage, a water/sewer backup endorsement, and whether a separate flood policy makes sense for your location.",
          "We can walk through all three and get quotes so you're not surprised after the next big storm.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does homeowners insurance cover basement flooding?",
        a: "It depends on the cause. A burst pipe may be covered; rising flood water is excluded and needs a separate flood policy; sewer or sump-pump backup needs a water-backup endorsement. We help you cover all the bases.",
      },
      {
        q: "Do I need flood insurance if I'm not in a flood zone?",
        a: "You can buy it anywhere, and plenty of flood damage happens outside mapped high-risk zones. Given Pittsburgh's rivers and hills, it's worth at least getting a quote.",
      },
      {
        q: "How much does water-backup coverage cost?",
        a: "It's typically an affordable add-on to your existing home policy. The exact cost depends on your coverage limit and home — we can quote it quickly.",
      },
    ],
  },
  {
    slug: "turning-65-medicare-pittsburgh",
    title: "Turning 65 in Pittsburgh: Your Simple Medicare Enrollment Guide",
    category: "Medicare",
    relatedInsurance: "medicare",
    description:
      "Medicare doesn't have to be overwhelming. Here's a clear, step-by-step guide for Pittsburgh residents turning 65 — enrollment windows, Advantage vs. Supplement, and avoiding penalties.",
    readMins: 6,
    updated: "2026-07-01",
    keywords: [
      "turning 65 Medicare Pittsburgh",
      "Medicare enrollment Pittsburgh",
      "Medicare Advantage vs Supplement",
      "Medicare Pennsylvania guide",
    ],
    intro:
      "Turning 65 comes with a stack of Medicare mail and a lot of confusing choices. Here's the plain-English version, plus the deadlines you don't want to miss.",
    sections: [
      {
        heading: "The parts of Medicare, quickly",
        body: [
          "Part A covers hospital stays and Part B covers doctors and outpatient care — together they're 'Original Medicare.' Part D covers prescription drugs. Part C (Medicare Advantage) is a private alternative that bundles it all together.",
          "Most of your decision comes down to how you want to fill the gaps in Original Medicare: with a Medicare Advantage plan or a Medicare Supplement (Medigap).",
        ],
      },
      {
        heading: "Know your enrollment windows",
        body: [
          "Your Initial Enrollment Period is a 7-month window: the three months before your 65th birthday month, the month itself, and the three months after. Enrolling on time helps you avoid lifelong late penalties for Part B and Part D.",
          "After that, the Annual Enrollment Period runs every year from October 15 to December 7, when you can change plans for the coming year.",
        ],
      },
      {
        heading: "Advantage vs. Supplement in the Pittsburgh area",
        body: [
          "Medicare Advantage plans often have low or $0 premiums and add perks like dental and vision, but they use provider networks — so you'll want to confirm your doctors are in-network.",
          "Medicare Supplements cost a monthly premium but pair with Original Medicare for wide provider freedom and very predictable out-of-pocket costs. Neither is universally 'better' — it depends on your doctors, medications, and budget.",
        ],
      },
      {
        heading: "Check your doctors and your drugs",
        body: [
          "Before enrolling, make sure your preferred doctors and hospital systems participate in the plan, and check that your specific prescriptions are covered affordably under its drug list.",
          "This step prevents the two most common Medicare regrets: a favorite doctor being out of network, or a medication costing far more than expected.",
        ],
      },
      {
        heading: "You don't have to figure it out alone",
        body: [
          "A licensed local agent can compare plans against your doctors, drugs, and budget — at no cost to you, since carriers compensate agents.",
          "We'll make sure you enroll on time, avoid penalties, and pick a plan that actually fits your life.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I sign up for Medicare?",
        a: "Your Initial Enrollment Period is the 7 months around your 65th birthday. Enrolling on time helps you avoid lifelong late-enrollment penalties for Part B and Part D.",
      },
      {
        q: "Is Medicare Advantage or a Supplement better?",
        a: "It depends on your priorities. Advantage often costs less monthly but uses networks; Supplements cost more but offer wide provider freedom and predictable costs. We compare both for you.",
      },
      {
        q: "Does your Medicare help cost anything?",
        a: "No. Our Medicare guidance is completely free — carriers compensate licensed agents, so there's no added cost to your plan.",
      },
    ],
  },
  {
    slug: "how-much-life-insurance",
    title: "How Much Life Insurance Do You Actually Need?",
    category: "Life",
    relatedInsurance: "life-insurance",
    description:
      "A simple, honest guide to figuring out how much life insurance your family needs — and whether term or whole life is the right fit.",
    readMins: 5,
    updated: "2026-07-01",
    keywords: [
      "how much life insurance do I need",
      "term vs whole life",
      "life insurance Pittsburgh",
      "life insurance calculator",
    ],
    intro:
      "Life insurance is really about one question: if your income disappeared, would the people who depend on you be okay? Here's a straightforward way to figure out how much you need.",
    sections: [
      {
        heading: "Start with what you're protecting",
        body: [
          "Add up what your family would need if you weren't there: replacing your income for the years it matters, paying off the mortgage and debts, and funding big future costs like your kids' education.",
          "A common starting point is 10–12 times your annual income, plus your mortgage and debts — but the right number is personal.",
        ],
      },
      {
        heading: "Term vs. whole life",
        body: [
          "Term life covers you for a set period (like 20 or 30 years) at a much lower cost — ideal for covering the years you're raising a family or paying a mortgage. Most families' core need is met affordably with term.",
          "Whole life lasts your entire life and builds cash value, at a higher premium. It fits specific goals like lifelong dependents, estate planning, or leaving a guaranteed legacy.",
        ],
      },
      {
        heading: "Match the term to the need",
        body: [
          "If your main goal is protecting a 25-year mortgage and raising young kids, a 20–30 year term does the job for a fraction of the cost of permanent coverage.",
          "Buying more coverage for less money — and simply matching the length to your actual need — is how most families get this right.",
        ],
      },
      {
        heading: "No-exam options and locking in rates",
        body: [
          "Many healthy applicants now qualify for 'no-exam' policies approved in days instead of weeks. And because premiums rise with age and health changes, locking in coverage sooner usually costs less.",
          "We'll be honest about whether term or permanent coverage fits, and compare carriers to find you a fair rate.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much life insurance should I get?",
        a: "A common rule of thumb is 10–12x your income, plus your mortgage and debts, plus future costs like college. We'll tailor the number to your specific situation.",
      },
      {
        q: "Is term or whole life better?",
        a: "For most families, affordable term coverage that matches the length of the need (like a mortgage or raising kids) is the best value. Whole life fits specific lifelong or estate-planning goals.",
      },
      {
        q: "Can I get life insurance without a medical exam?",
        a: "Often, yes — many healthy applicants qualify for no-exam policies approved in days. We'll check whether it's the best value for you.",
      },
    ],
  },
  {
    slug: "renters-insurance-pittsburgh-guide",
    title: "Renters Insurance in Pittsburgh: What It Covers & What It Costs",
    category: "Renters",
    relatedInsurance: "renters-insurance",
    description:
      "Renters insurance is cheap, easy, and more useful than most people realize. Here's what it covers, what it costs in Pittsburgh, and why your landlord may require it.",
    readMins: 4,
    updated: "2026-07-01",
    keywords: [
      "renters insurance Pittsburgh",
      "how much is renters insurance",
      "apartment insurance Pittsburgh",
      "what does renters insurance cover",
    ],
    intro:
      "If you rent in Lawrenceville, Oakland, the South Side, or anywhere around Pittsburgh, renters insurance is one of the best deals in all of insurance. Here's the quick rundown.",
    sections: [
      {
        heading: "What it actually covers",
        body: [
          "Renters insurance protects three things: your belongings (from theft, fire, and many types of water damage), your personal liability if someone is injured in your place, and your living expenses if your unit becomes unlivable.",
          "Your belongings are often covered even when you're away from home — like a laptop stolen while traveling.",
        ],
      },
      {
        heading: "What it costs in Pittsburgh",
        body: [
          "Most Pittsburgh renters pay roughly $12–$25 per month, depending on coverage limits and location. That's usually less than a single dinner out for real protection.",
          "Bundling renters with your car insurance often lowers the price of both.",
        ],
      },
      {
        heading: "Replacement cost vs. actual cash value",
        body: [
          "Choose 'replacement cost' coverage when you can — it pays what it costs to rebuy your items new, rather than their depreciated value. It's a small price difference for a much better claim.",
          "If you own higher-value items like jewelry, a bike, or camera gear, ask about scheduling them for full protection.",
        ],
      },
      {
        heading: "Why landlords require it",
        body: [
          "Many Pittsburgh landlords now require renters insurance with a minimum liability amount. It protects both you and them, and we can match whatever your lease requires.",
          "It takes just a few minutes to set up — we're happy to handle it for you.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much is renters insurance in Pittsburgh?",
        a: "Most renters pay about $12–$25 per month depending on coverage and location. Bundling with auto usually lowers the cost of both.",
      },
      {
        q: "Does renters insurance cover my stuff outside my apartment?",
        a: "Usually yes — most policies cover your belongings even away from home, including theft while traveling. We'll confirm the details before you buy.",
      },
      {
        q: "My landlord requires renters insurance — can you help?",
        a: "Absolutely. Tell us the liability amount your lease requires and we'll find an affordable policy that meets it, often in just a few minutes.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
