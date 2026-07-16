export function Testimonials() {
  const reviews = [
    {
      quote:
        "I dreaded shopping for life insurance. They made it painless, explained everything, and I was covered the same week. Highly recommend to any Pittsburgh family.",
      name: "Marcus T.",
      area: "Squirrel Hill",
      line: "Life Insurance",
    },
    {
      quote:
        "As a small business owner in the Strip, I needed liability and workers' comp fast. They handled it all and saved me money over my old broker.",
      name: "Angela P.",
      area: "Strip District",
      line: "Business Insurance",
    },
    {
      quote:
        "Turning 65 and Medicare had my head spinning. They walked my mom and me through every option with real patience. No pressure at all.",
      name: "Robert & Carol S.",
      area: "Bethel Park",
      line: "Medicare",
    },
    {
      quote:
        "Bundled my home and auto and cut my bill way down. Felt like talking to a friend who happens to know insurance inside and out.",
      name: "Denise R.",
      area: "Mount Lebanon",
      line: "Home + Auto",
    },
    {
      quote:
        "First apartment, first time getting renters insurance. Took five minutes and cost less than I spend on coffee. So easy.",
      name: "Jordan K.",
      area: "Lawrenceville",
      line: "Renters Insurance",
    },
    {
      quote:
        "They actually answered the phone and knew my neighborhood. That local touch made me trust them right away.",
      name: "Bill M.",
      area: "Ross Township",
      line: "Auto Insurance",
    },
  ];

  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-brand-950 py-16 text-white lg:py-20"
    >
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow bg-white/10 text-brand-100">Real reviews</p>
          <h2
            id="reviews-heading"
            className="mt-4 text-3xl font-extrabold sm:text-4xl"
          >
            Pittsburgh neighbors love working with us
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            ⭐️ 4.9 out of 5 stars across 300+ verified reviews
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex h-full flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="text-gold-400" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote className="mt-3 flex-1 text-brand-50">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 border-t border-white/10 pt-4">
                <span className="font-bold text-white">{r.name}</span>
                <span className="block text-sm text-brand-200">
                  {r.area} · {r.line}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
