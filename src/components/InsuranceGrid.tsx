import Link from "next/link";
import { insuranceTypes } from "@/lib/insurance";

export function InsuranceGrid() {
  return (
    <section
      id="insurance"
      aria-labelledby="insurance-heading"
      className="container-px py-16 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Every kind of coverage</p>
        <h2 id="insurance-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
          One place for all your Pittsburgh insurance
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Big or small, personal or business — pick what you need and we&apos;ll
          match you with the right coverage from top carriers.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {insuranceTypes.map((t) => (
          <Link
            key={t.slug}
            href={`/insurance/${t.slug}`}
            className="group card flex flex-col transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-3xl"
              aria-hidden
            >
              {t.icon}
            </span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">{t.name}</h3>
            <p className="mt-2 flex-1 text-slate-600">{t.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700 group-hover:gap-2">
              Get a quote <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
