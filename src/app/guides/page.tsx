import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { CTA } from "@/components/CTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Insurance Guides & Answers for Pittsburgh",
  description:
    "Clear, honest answers to common insurance questions for Pittsburgh residents — auto, home, life, Medicare, renters and more. Written by licensed local pros.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
        ]}
      />
      <section className="bg-brand-950 py-14 text-white">
        <div className="container-px max-w-3xl">
          <p className="eyebrow bg-white/10 text-brand-100">Insurance guides</p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Plain-English answers to your insurance questions
          </h1>
          <p className="mt-4 text-lg text-brand-100">
            No jargon, no sales pitch — just honest, local guidance to help you
            make smart insurance decisions in Pittsburgh.
          </p>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="card flex flex-col transition hover:-translate-y-1 hover:border-brand-200"
            >
              <span className="eyebrow w-fit">{g.category}</span>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {g.title}
              </h2>
              <p className="mt-2 flex-1 text-slate-600">{g.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-semibold text-brand-700">
                Read guide <span aria-hidden>→</span>
              </span>
              <span className="mt-1 text-xs text-slate-400">
                {g.readMins} min read
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
