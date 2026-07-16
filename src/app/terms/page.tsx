import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms and conditions for using the ${siteConfig.name} website and services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Use"
      intro="Please read these terms carefully. By using our site, you agree to them."
      updated="January 2026"
    >
      <h2 className="text-2xl font-bold text-slate-900">Acceptance of terms</h2>
      <p>
        By accessing or using {siteConfig.name} (the &ldquo;Site&rdquo;), you
        agree to be bound by these Terms of Use. If you do not agree, please do
        not use the Site.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Our service</h2>
      <p>
        {siteConfig.name} is a licensed insurance referral and brokerage service.
        We help connect you with licensed agents and insurance carriers. We are
        not an insurance carrier and do not underwrite, issue, or bind coverage.
        Any coverage is provided by, and subject to the terms of, the issuing
        carrier.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">No guarantees</h2>
      <p>
        Quotes and information provided through the Site, including via our
        concierge chat, are estimates for general informational purposes and are
        not guarantees of coverage, price, or approval. Rates and availability
        are determined solely by carriers based on underwriting and applicable
        law.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Your responsibilities</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Provide accurate and truthful information.</li>
        <li>Use the Site only for lawful purposes.</li>
        <li>
          Not attempt to disrupt, reverse engineer, or misuse the Site or its
          systems.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900">Intellectual property</h2>
      <p>
        All content on the Site, including text, graphics, and logos, is owned by
        or licensed to {siteConfig.name} and protected by applicable laws. You may
        not reproduce it without permission.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">
        Limitation of liability
      </h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} is not liable
        for any indirect, incidental, or consequential damages arising from your
        use of the Site or reliance on any information provided. The Site is
        provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Third-party links</h2>
      <p>
        The Site may link to third-party websites. We are not responsible for the
        content or practices of those sites.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site
        after changes constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
      <p>
        Questions about these Terms? Contact us at{" "}
        <a className="text-brand-700 underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>{" "}
        or {siteConfig.phone}.
      </p>

      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Note:</strong> This template is provided for convenience and is
        not legal advice. Have a qualified attorney review these terms before
        launch.
      </p>
    </PageShell>
  );
}
