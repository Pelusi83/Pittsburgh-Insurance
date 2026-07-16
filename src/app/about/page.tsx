import type { Metadata } from "next";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Choose Pittsburgh Insurance Hub",
  description:
    "Learn why thousands of Pittsburgh families and businesses trust Pittsburgh Insurance Hub — licensed, local, free, and always on your side.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-950 py-16 text-white">
        <div className="container-px max-w-3xl">
          <p className="eyebrow bg-white/10 text-brand-100">About us</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            Insurance the way it should be — local, honest, and easy.
          </h1>
          <p className="mt-5 text-lg text-brand-100">
            {siteConfig.name} was built on a simple idea: getting the right
            insurance in Pittsburgh shouldn&apos;t be confusing, stressful, or
            feel like a sales trap. We&apos;re your neighbors, and we treat you
            like one.
          </p>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold">Our mission</h2>
            <p className="mt-4 text-lg text-slate-600">
              To be the most trusted place in Pittsburgh to compare and secure
              insurance of every kind — from your first apartment&apos;s renters
              policy to protecting a growing business, a family, or your
              retirement.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              Because we work with many carriers instead of just one, our loyalty
              is to <strong>you</strong>. We shop the market, explain your
              options in plain English, and help you choose what genuinely fits —
              at no cost to you.
            </p>
          </div>
          <div className="card bg-slate-50">
            <h2 className="text-xl font-bold">What sets us apart</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✅ Licensed insurance professionals in {siteConfig.regionName}</li>
              <li>✅ We compare 40+ A-rated carriers</li>
              <li>✅ 100% free — no fees, ever</li>
              <li>✅ No pressure, no obligation</li>
              <li>✅ Real, local Pittsburgh people</li>
              <li>✅ Your data encrypted &amp; never sold to spammers</li>
            </ul>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyUs />
      <CTA />
    </>
  );
}
