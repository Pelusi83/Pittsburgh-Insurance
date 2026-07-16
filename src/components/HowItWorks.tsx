export function HowItWorks() {
  const steps = [
    {
      n: "1",
      icon: "📝",
      title: "Tell us what you need",
      body: "Answer a few quick questions — under two minutes, no jargon, no login. You can also just chat with us or call.",
    },
    {
      n: "2",
      icon: "🔍",
      title: "We shop trusted carriers",
      body: "A licensed local agent compares A-rated Pittsburgh carriers and finds every discount you qualify for.",
    },
    {
      n: "3",
      icon: "✅",
      title: "You choose — with zero pressure",
      body: "We explain your best options in plain English. Pick what fits your budget, or walk away. It's always free.",
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="bg-slate-50 py-16 lg:py-20"
    >
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Simple &amp; stress-free</p>
          <h2 id="how-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Getting the right insurance shouldn&apos;t feel like a second job.
            Here&apos;s all it takes.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="card relative pt-8">
              <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-lg font-extrabold text-white shadow-soft">
                {s.n}
              </span>
              <span className="text-4xl" aria-hidden>
                {s.icon}
              </span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
