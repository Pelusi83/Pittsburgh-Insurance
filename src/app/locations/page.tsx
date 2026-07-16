import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/lib/locations";
import { siteConfig } from "@/lib/site";
import { CTA } from "@/components/CTA";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Insurance Service Areas Around Pittsburgh",
  description:
    "Pittsburgh Insurance Hub serves Pittsburgh and communities across Allegheny, Washington, Butler, Beaver and Westmoreland counties — home, auto, life, health, Medicare, disability and business insurance. Find your town.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  // group by county for a tidy, crawlable index
  const byCounty = locations.reduce<Record<string, typeof locations>>(
    (acc, loc) => {
      (acc[loc.county] ||= []).push(loc);
      return acc;
    },
    {}
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/locations" },
        ]}
      />
      <section className="bg-brand-950 py-14 text-white">
        <div className="container-px max-w-3xl">
          <p className="eyebrow bg-white/10 text-brand-100">
            📍 Serving the greater Pittsburgh region
          </p>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Local insurance help across Southwestern Pennsylvania
          </h1>
          <p className="mt-4 text-lg text-brand-100">
            We match families and businesses within about 50 miles of Pittsburgh
            with trusted, A-rated carriers — free and local. Find your community
            below to get started.
          </p>
        </div>
      </section>

      <section className="container-px py-14">
        <div className="space-y-10">
          {Object.entries(byCounty).map(([county, locs]) => (
            <div key={county}>
              <h2 className="text-2xl font-extrabold">{county}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {locs.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="card flex items-center justify-between gap-3 hover:border-brand-200"
                  >
                    <span className="font-semibold text-slate-800">
                      📍 {loc.name}
                    </span>
                    <span className="text-sm font-semibold text-brand-700">
                      Insurance →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-slate-600">
          Don&apos;t see your town? We serve the entire {siteConfig.city} metro —
          just{" "}
          <Link href="/quote" className="font-semibold text-brand-700 underline">
            request a free quote
          </Link>{" "}
          or call{" "}
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
            className="font-semibold text-brand-700 underline"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      </section>

      <CTA />
    </>
  );
}
