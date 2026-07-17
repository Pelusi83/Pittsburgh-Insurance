import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { guides, getGuide } from "@/lib/guides";
import { getInsuranceType } from "@/lib/insurance";
import { siteConfig } from "@/lib/site";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
} from "@/components/JsonLd";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.description,
      url: `${siteConfig.url}/guides/${g.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const related = getInsuranceType(g.relatedInsurance);
  const otherGuides = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd
        headline={g.title}
        description={g.description}
        slug={g.slug}
        datePublished={g.updated}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: g.title, url: `/guides/${g.slug}` },
        ]}
      />

      <article>
        <header className="bg-brand-950 text-white">
          <div className="container-px max-w-3xl py-14">
            <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
              <Link href="/" className="hover:underline">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/guides" className="hover:underline">
                Guides
              </Link>{" "}
              / <span className="text-white">{g.category}</span>
            </nav>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              {g.title}
            </h1>
            <p className="mt-4 text-lg text-brand-100">{g.intro}</p>
            <p className="mt-4 text-sm text-brand-200">
              {g.category} · {g.readMins} min read · Updated{" "}
              {new Date(g.updated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </header>

        <div className="container-px max-w-3xl py-12">
          <div className="space-y-8">
            {g.sections.map((s, i) => (
              <section key={i}>
                {s.heading && (
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {s.heading}
                  </h2>
                )}
                <div className="mt-3 space-y-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-lg leading-relaxed text-slate-700">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Inline CTA */}
          {related && (
            <div className="card mt-10 bg-brand-50/60">
              <h2 className="text-xl font-bold text-slate-900">
                Ready for a free {related.name.toLowerCase()} quote?
              </h2>
              <p className="mt-2 text-slate-600">
                A licensed local agent will compare A-rated carriers for you — free
                and with no obligation.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href={`/quote?type=${related.slug}`} className="btn-gold">
                  Get My Free Quote →
                </Link>
                <Link
                  href={`/insurance/${related.slug}`}
                  className="btn-ghost"
                >
                  Learn about {related.name}
                </Link>
              </div>
            </div>
          )}

          <p className="mt-8 text-sm text-slate-400">
            This article is general information, not insurance, legal, or
            financial advice. Coverage is subject to carrier underwriting, terms,
            and applicable law.
          </p>
        </div>
      </article>

      <FAQ faqs={g.faqs} title={`${g.category} insurance — FAQs`} />

      {/* Related guides */}
      <section className="container-px pb-4">
        <h2 className="text-2xl font-extrabold">Keep reading</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {otherGuides.map((o) => (
            <Link
              key={o.slug}
              href={`/guides/${o.slug}`}
              className="card hover:border-brand-200"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-brand-700">
                {o.category}
              </span>
              <p className="mt-2 font-semibold text-slate-800">{o.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
