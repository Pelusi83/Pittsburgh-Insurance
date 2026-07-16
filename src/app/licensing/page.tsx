import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Licensing & Disclosures",
  description:
    "Licensing information and consumer disclosures for Pittsburgh Insurance Hub, a licensed insurance referral and brokerage service in Pennsylvania.",
  alternates: { canonical: "/licensing" },
};

export default function LicensingPage() {
  return (
    <PageShell
      title="Licensing & Disclosures"
      intro="We believe transparency is the foundation of trust. Here's exactly who we are and how we operate."
    >
      <h2 className="text-2xl font-bold text-slate-900">Who we are</h2>
      <p>
        {siteConfig.name} is a licensed insurance referral and brokerage service
        operating in the Commonwealth of Pennsylvania. We help consumers compare
        and obtain insurance across multiple lines of coverage, including auto,
        home, renters, life, health, Medicare, disability, and business
        insurance.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Licensing</h2>
      <p>
        Insurance in Pennsylvania is regulated by the{" "}
        <a
          className="text-brand-700 underline"
          href="https://www.insurance.pa.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pennsylvania Insurance Department
        </a>
        . Licensed producer information can be verified through the department
        and the National Insurance Producer Registry (NIPR).
      </p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Licensed Producer: {siteConfig.licensedAgentName}</li>
        <li>License: {siteConfig.licenseNumber}</li>
        <li>State: {siteConfig.regionName}</li>
      </ul>
      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Business owner note:</strong> Replace the licensed producer name
        and license number above (in <code>src/lib/site.ts</code>) with your
        actual credentials before going live. Displaying accurate licensing is
        required for compliance and builds consumer trust.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">How we&apos;re paid</h2>
      <p>
        Our service is <strong>free to you</strong>. When we help place a policy,
        the insurance carrier compensates us through commissions or referral
        fees. This compensation does not increase the price you pay for your
        insurance. We are committed to recommending coverage based on your needs
        — not on compensation.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Important disclosures</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          {siteConfig.name} is <strong>not</strong> an insurance company. We do
          not underwrite, issue, or bind coverage.
        </li>
        <li>
          Quotes provided are <strong>estimates</strong> and are not a guarantee
          of coverage, rates, or approval. All coverage is subject to carrier
          underwriting, terms, conditions, and applicable law.
        </li>
        <li>
          We work with A-rated and established carriers but do not guarantee the
          future financial condition of any insurer.
        </li>
        <li>
          Nothing on this website constitutes legal, tax, or financial advice.
          Consult a qualified professional for your specific situation.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900">Concierge chat</h2>
      <p>
        Our on-site concierge helps answer common questions and may use automated
        assistance to respond quickly. It is not a substitute for advice from a
        licensed agent, and no coverage can be bound through chat. You can reach a
        licensed human agent any time at {siteConfig.phone}.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
      <p>
        Questions about our licensing or disclosures? Call {siteConfig.phone} or
        email{" "}
        <a className="text-brand-700 underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>
        .
      </p>
    </PageShell>
  );
}
