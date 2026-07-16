import Link from "next/link";
import { insuranceTypes } from "@/lib/insurance";

export default function NotFound() {
  return (
    <section className="container-px py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-6xl">🧭</p>
        <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          We couldn&apos;t find that page — but we can still help you find the
          right coverage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/quote" className="btn-gold">
            Get a free quote
          </Link>
        </div>
        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Popular coverage
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {insuranceTypes.slice(0, 6).map((t) => (
              <Link
                key={t.slug}
                href={`/insurance/${t.slug}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                {t.icon} {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
