import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { hasReviews, averageRating, reviewCount, reviews } from "@/lib/reviews";

export function Hero() {
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;
  const featured = hasReviews ? reviews[0] : null;

  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* decorative gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 15% 10%, rgba(47,131,255,0.35) 0%, rgba(18,36,87,0) 60%), radial-gradient(45% 45% at 90% 20%, rgba(245,179,1,0.20) 0%, rgba(18,36,87,0) 60%)",
        }}
      />
      <div className="container-px relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow bg-white/10 text-brand-100">
            📍 Pittsburgh, PA · Locally Licensed
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Pittsburgh&apos;s #1 Way to{" "}
            <span className="text-gold-400">Compare &amp; Get</span> Insurance
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100 sm:text-xl">
            Home, auto, life, health, disability, Medicare and business — we
            match you with trusted, A-rated carriers in minutes.{" "}
            <strong className="text-white">Free, local, no pressure.</strong>
          </p>

          <ul className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
            {[
              "100% free to you",
              "Licensed PA agents",
              "Compare top carriers",
              "No obligation ever",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-brand-50">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-slate-900">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold text-xl">
              Get My Free Quote →
            </Link>
            <a href={telHref} className="btn-ghost border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              📞 Call {siteConfig.phone}
            </a>
          </div>

          <p className="mt-5 text-sm text-brand-200">
            🔒 Your information is encrypted and never sold to spammers.
          </p>
        </div>

        {/* Trust card */}
        <div className="relative">
          <div className="rounded-2xl bg-white p-7 text-slate-800 shadow-soft sm:p-8">
            {featured ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden>
                    ⭐️⭐️⭐️⭐️⭐️
                  </span>
                  <span className="text-sm font-semibold text-slate-500">
                    {averageRating} / 5 · {reviewCount}{" "}
                    {reviewCount === 1 ? "review" : "reviews"}
                  </span>
                </div>
                <blockquote className="mt-4 text-lg font-medium text-slate-700">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <p className="mt-3 font-semibold text-slate-900">
                  — {featured.name}, {featured.area}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                    🛡️
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">
                      Licensed &amp; local, on your side
                    </p>
                    <p className="text-sm text-slate-500">
                      Pennsylvania insurance done honestly
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-lg font-medium text-slate-700">
                  Tell us what you need and a licensed local agent compares
                  A-rated carriers to find your best fit — free, fast, and with
                  zero pressure.
                </p>
              </>
            )}

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-center">
              <div>
                <p className="text-2xl font-extrabold text-brand-700">$0</p>
                <p className="text-xs font-medium text-slate-500">
                  Cost to you
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-700">2 min</p>
                <p className="text-xs font-medium text-slate-500">
                  To request a quote
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-brand-700">A-rated</p>
                <p className="text-xs font-medium text-slate-500">
                  Carriers only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
