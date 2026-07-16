import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getInsuranceType } from "@/lib/insurance";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote in Pittsburgh",
  description:
    "Request your free, no-obligation Pittsburgh insurance quote. Home, auto, life, health, disability, Medicare, renters and business coverage from licensed local agents.",
  alternates: { canonical: "/quote" },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const initialType = type ? getInsuranceType(type)?.slug || "" : "";

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Get a Quote", url: "/quote" },
        ]}
      />
      <section className="bg-brand-950 py-14 text-white">
        <div className="container-px text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Get your free insurance quote
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Answer a few quick questions and a licensed {siteConfig.city} agent
            will find your best options. Takes about two minutes — no obligation.
          </p>
        </div>
      </section>

      <section className="container-px -mt-10 pb-16">
        <QuoteForm initialType={initialType} />
      </section>
    </>
  );
}
