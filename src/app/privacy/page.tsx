import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pittsburgh Insurance Hub collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      intro="Your privacy matters. This policy explains what we collect, why, and how we protect it."
      updated="January 2026"
    >
      <p>
        {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) respects your privacy. This Privacy Policy describes
        how we collect, use, and safeguard your information when you use our
        website and services.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Information we collect</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Information you provide:</strong> such as your name, phone
          number, email, ZIP code, and details about the insurance you&apos;re
          seeking when you submit a quote request or chat with us.
        </li>
        <li>
          <strong>Automatically collected information:</strong> basic technical
          data such as browser type and general usage, used to keep the site
          secure and working well.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900">How we use it</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>To prepare and deliver the insurance quotes you request.</li>
        <li>
          To connect you with licensed agents and the specific carriers needed to
          quote your coverage.
        </li>
        <li>To respond to your questions and provide customer service.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900">How we share it</h2>
      <p>
        We share your information <strong>only</strong> with the licensed agents
        and insurance carriers necessary to service your request, and with
        service providers who help us operate (bound by confidentiality). We{" "}
        <strong>do not sell your personal information to spammers</strong> or
        unrelated third parties.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">How we protect it</h2>
      <p>
        We use industry-standard safeguards, including encryption in transit, to
        protect your information. No method of transmission is 100% secure, but we
        work hard to keep your data safe.
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Your choices</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          You may request access to, correction of, or deletion of your personal
          information.
        </li>
        <li>
          You can opt out of marketing contact at any time by telling us or
          replying STOP to texts.
        </li>
        <li>
          By submitting a request, you consent to be contacted by phone, text, or
          email regarding your inquiry, even if you are on a Do Not Call list, per
          the consent you provide.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-slate-900">Contact us</h2>
      <p>
        To exercise your rights or ask questions, contact us at{" "}
        <a className="text-brand-700 underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>{" "}
        or {siteConfig.phone}.
      </p>

      <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Note:</strong> This template is provided for convenience and is
        not legal advice. Have a qualified attorney review your privacy policy and
        TCPA/consent practices before launch.
      </p>
    </PageShell>
  );
}
