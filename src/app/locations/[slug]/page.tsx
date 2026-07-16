import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, getLocation } from "@/lib/locations";
import { insuranceTypes } from "@/lib/insurance";
import { siteConfig } from "@/lib/site";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};
  const title = `Insurance in ${loc.name}, PA — Home, Auto, Life & More`;
  const description = `Free, local insurance help in ${loc.name}, ${loc.county}. Compare home, auto, life, health, Medicare, disability and business coverage from A-rated carriers with a licensed local agent. No obligation.`;
  return {
    title,
    description,
    keywords: [
      `${loc.name} insurance`,
      `insurance ${loc.name} PA`,
      `${loc.name} auto insurance`,
      `${loc.name} home insurance`,
      `insurance agent ${loc.name}`,
    ],
    alternates: { canonical: `/locations/${loc.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/locations/${loc.slug}`,
    },
  };
}

function cityFaqs(name: string, county: string) {
  return [
    {
      q: `How do I get an insurance quote in ${name}?`,
      a: `It takes about two minutes. Tell us what you need — auto, home, life, health, Medicare, disability, renters or business — and a licensed local agent compares A-rated carriers for ${name} and ${county} and brings back your best options. It's completely free with no obligation.`,
    },
    {
      q: `Do you serve all of ${name}?`,
      a: `Yes. We help homeowners, renters, drivers, families and business owners throughout ${name} and the surrounding ${county} communities, and across the greater Pittsburgh region.`,
    },
    {
      q: `How much does it cost to use ${siteConfig.name} in ${name}?`,
      a: `Nothing. Our service is 100% free to ${name} residents — carriers compensate licensed agents when a policy is placed, so you get local guidance at no cost and it never raises your premium.`,
    },
    {
      q: `Can you help ${name} drivers understand Pennsylvania coverage rules?`,
      a: `Absolutely. We'll explain Pennsylvania's minimum limits (15/30/5 plus $5,000 medical) and the important limited-vs-full-tort choice, then help you decide what actually protects you and your family in ${name}.`,
    },
  ];
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const faqs = cityFaqs(loc.name, loc.county);
  const nearbyLinks = locations
    .filter((l) => l.slug !== loc.slug && l.county === loc.county)
    .slice(0, 4);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: `${siteConfig.name} — ${loc.name}`,
    description: `Insurance services for ${loc.name}, ${loc.county}: home, auto, life, health, Medicare, disability, renters and business.`,
    url: `${siteConfig.url}/locations/${loc.slug}`,
    telephone: siteConfig.phone,
    areaServed: { "@type": "City", name: `${loc.name}, PA` },
    parentOrganization: { "@id": `${siteConfig.url}/#organization` },
    makesOffer: insuranceTypes.map((t) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${t.name} in ${loc.name}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/locations" },
          { name: loc.name, url: `/locations/${loc.slug}` },
        ]}
      />

      <section className="bg-brand-950 text-white">
        <div className="container-px py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/locations" className="hover:underline">
              Service Areas
            </Link>{" "}
            / <span className="text-white">{loc.name}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Insurance in {loc.name}, PA
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">{loc.note}</p>
          <p className="mt-3 max-w-2xl text-brand-100">
            Whatever you need to protect in {loc.name}, we compare trusted,
            A-rated carriers to find you the right coverage at a fair price —
            free, local, and with zero pressure.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold text-lg">
              Get My Free {loc.name} Quote →
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
              className="btn-ghost border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              📞 {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Coverage available in this city */}
      <section className="container-px py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Coverage for {loc.name}</p>
          <h2 className="mt-4 text-3xl font-extrabold">
            Every type of insurance {loc.name} needs
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Personal or business, big or small — pick what you need and we&apos;ll
            match you with the right carrier.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insuranceTypes.map((t) => (
            <Link
              key={t.slug}
              href={`/insurance/${t.slug}`}
              className="card flex flex-col hover:-translate-y-1 hover:border-brand-200"
            >
              <span className="text-3xl" aria-hidden>
                {t.icon}
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                {t.name} in {loc.name}
              </h3>
              <span className="mt-2 text-sm font-semibold text-brand-700">
                Get a quote →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FAQ faqs={faqs} title={`${loc.name} insurance — FAQs`} />

      {/* Nearby areas */}
      {nearbyLinks.length > 0 && (
        <section className="container-px pb-4">
          <h2 className="text-2xl font-extrabold">
            We also serve nearby {loc.county} communities
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {nearbyLinks.map((n) => (
              <Link
                key={n.slug}
                href={`/locations/${n.slug}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
              >
                📍 {n.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700"
            >
              View all service areas →
            </Link>
          </div>
        </section>
      )}

      <CTA
        title={`Ready for your free ${loc.name} insurance quote?`}
        subtitle="Two minutes, no obligation, and a licensed local agent on your side."
      />
    </>
  );
}
