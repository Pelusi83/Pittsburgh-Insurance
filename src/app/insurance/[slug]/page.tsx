import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { insuranceTypes, getInsuranceType } from "@/lib/insurance";
import { siteConfig } from "@/lib/site";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import {
  ServiceJsonLd,
  BreadcrumbJsonLd,
} from "@/components/JsonLd";

export function generateStaticParams() {
  return insuranceTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getInsuranceType(slug);
  if (!t) return {};
  return {
    title: t.heroHeadline,
    description: t.heroSub,
    keywords: t.keywords,
    alternates: { canonical: `/insurance/${t.slug}` },
    openGraph: {
      title: t.heroHeadline,
      description: t.heroSub,
      url: `${siteConfig.url}/insurance/${t.slug}`,
    },
  };
}

export default async function InsuranceTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getInsuranceType(slug);
  if (!t) notFound();

  const related = insuranceTypes.filter((x) => x.slug !== t.slug).slice(0, 4);

  return (
    <>
      <ServiceJsonLd name={t.name} description={t.blurb} slug={t.slug} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: t.name, url: `/insurance/${t.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-brand-950 text-white">
        <div className="container-px grid items-center gap-8 py-14 lg:grid-cols-[1.3fr,1fr] lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
              <Link href="/" className="hover:underline">
                Home
              </Link>{" "}
              / <span className="text-white">{t.name}</span>
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                {t.icon}
              </span>
              <p className="text-lg font-semibold text-gold-400">{t.tagline}</p>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {t.heroHeadline}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-brand-100">{t.heroSub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/quote?type=${t.slug}`} className="btn-gold text-lg">
                Get My Free {t.shortName} Quote →
              </Link>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="btn-ghost border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                📞 {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-soft">
            <h2 className="text-lg font-bold">Why choose {siteConfig.name}?</h2>
            <ul className="mt-4 space-y-3">
              {t.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    ✓
                  </span>
                  <span className="text-slate-700">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What's covered */}
      <section className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What&apos;s typically covered</p>
            <h2 className="mt-4 text-3xl font-extrabold">
              {t.name} coverage, made simple
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t.blurb}</p>
            <ul className="mt-6 grid gap-3">
              {t.coverIncludes.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                >
                  <span className="text-brand-600" aria-hidden>
                    ●
                  </span>
                  <span className="font-medium text-slate-700">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card bg-brand-50/50">
            <h3 className="text-xl font-bold">
              Local {t.shortName.toLowerCase()} help you can trust
            </h3>
            <p className="mt-3 text-slate-600">
              As a licensed {siteConfig.regionName} insurance service, we compare
              multiple A-rated carriers so you get the right {t.name.toLowerCase()}{" "}
              at a fair price — with clear, jargon-free guidance from real local
              people. It&apos;s free, and there&apos;s never any obligation.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat n="Free" label="To you, always" />
              <Stat n="A-Rated" label="Carriers only" />
              <Stat n="2 min" label="To get started" />
            </div>
            <Link
              href={`/quote?type=${t.slug}`}
              className="btn-primary mt-6 w-full"
            >
              Start My Free Quote
            </Link>
          </div>
        </div>
      </section>

      <FAQ
        faqs={t.faqs}
        title={`${t.name} — Frequently asked questions`}
      />

      {/* Related */}
      <section className="container-px pb-4">
        <h2 className="text-2xl font-extrabold">Explore more coverage</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/insurance/${r.slug}`}
              className="card flex items-center gap-3 hover:border-brand-200"
            >
              <span className="text-2xl">{r.icon}</span>
              <span className="font-semibold text-slate-800">{r.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        title={`Ready for your free ${t.name.toLowerCase()} quote?`}
        subtitle="It takes about two minutes and there's no obligation."
      />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <p className="text-lg font-extrabold text-brand-700">{n}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}
