import { reviews, hasReviews, averageRating, reviewCount, googleReviewUrl } from "@/lib/reviews";
import { siteConfig } from "@/lib/site";

export function Testimonials() {
  // Honest trust section for a newly launched business (no reviews yet).
  if (!hasReviews) {
    const pillars = [
      {
        icon: "🛡️",
        title: "Licensed & accountable",
        body: `A licensed ${siteConfig.regionName} insurance professional handles your request personally — no anonymous call center.`,
      },
      {
        icon: "🏆",
        title: "A-rated carriers only",
        body: "We place coverage with established, financially strong, A-rated insurance companies you can count on at claim time.",
      },
      {
        icon: "🤝",
        title: "No pressure, no cost",
        body: "Our help is 100% free with zero obligation. You compare, you decide — we're on your side, not a carrier's.",
      },
      {
        icon: "📍",
        title: "Truly local",
        body: `Based right here and serving the ${siteConfig.city} region, so you get neighbors who know our roads, homes, and carriers.`,
      },
    ];

    return (
      <section
        aria-labelledby="trust-heading"
        className="bg-brand-950 py-16 text-white lg:py-20"
      >
        <div className="container-px">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow bg-white/10 text-brand-100">
              Built on trust
            </p>
            <h2
              id="trust-heading"
              className="mt-4 text-3xl font-extrabold sm:text-4xl"
            >
              Why Pittsburgh can count on us
            </h2>
            <p className="mt-4 text-lg text-brand-100">
              We&apos;re a licensed, local insurance service focused on doing
              right by our neighbors — honestly and with zero pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex h-full flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <span className="text-3xl" aria-hidden>
                  {p.icon}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-brand-50">{p.body}</p>
              </div>
            ))}
          </div>

          {googleReviewUrl && (
            <div className="mt-10 text-center">
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                ⭐ Worked with us? Leave a review
              </a>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Real reviews view.
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
            ⭐️ {averageRating} out of 5 stars across {reviewCount}{" "}
            {reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex h-full flex-col rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="text-gold-400" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
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

        {googleReviewUrl && (
          <div className="mt-10 text-center">
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              ⭐ Leave us a review
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
