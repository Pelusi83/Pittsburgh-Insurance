import { siteConfig } from "@/lib/site";

export function WhyUs() {
  const reasons = [
    {
      icon: "📍",
      title: "Truly local",
      body: `We live and work in ${siteConfig.city}. We know our neighborhoods, our weather, our roads, and the carriers that treat locals right.`,
    },
    {
      icon: "🎯",
      title: "We work for you, not one carrier",
      body: "Because we compare many carriers, we're free to recommend what's genuinely best for you — not whatever one company is selling.",
    },
    {
      icon: "🧭",
      title: "Plain-English guidance",
      body: "No confusing jargon. We explain your options simply so you understand exactly what you're getting and why.",
    },
    {
      icon: "💸",
      title: "Free — and we find savings",
      body: "Our help costs you nothing, and we stack every discount and bundle you qualify for to lower your price.",
    },
    {
      icon: "🔒",
      title: "Your privacy is protected",
      body: "Your details are encrypted and shared only with the licensed carriers needed to quote you. We never sell your data to spammers.",
    },
    {
      icon: "⏱️",
      title: "Fast & convenient",
      body: "Start online in two minutes, chat with us, or call — whatever's easiest. We fit around your schedule.",
    },
  ];

  return (
    <section aria-labelledby="why-heading" className="container-px py-16 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Why Pittsburgh trusts us</p>
        <h2 id="why-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
          Insurance help you can actually trust
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          We built this to be the safest, simplest, most honest way to get
          insured in Pittsburgh.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title} className="card">
            <span className="text-3xl" aria-hidden>
              {r.icon}
            </span>
            <h3 className="mt-3 text-xl font-bold">{r.title}</h3>
            <p className="mt-2 text-slate-600">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
