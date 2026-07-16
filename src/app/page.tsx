import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { InsuranceGrid } from "@/components/InsuranceGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { AreasServed } from "@/components/AreasServed";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.tagline} | Compare Home, Auto, Life & Health Insurance`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <InsuranceGrid />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <AreasServed />
      <FAQ />
      <CTA />
    </>
  );
}
