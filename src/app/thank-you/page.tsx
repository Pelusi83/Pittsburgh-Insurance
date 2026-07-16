import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You — We've Got Your Request",
  description:
    "Thanks for requesting a free Pittsburgh insurance quote. A licensed local agent will be in touch shortly.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="container-px py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </span>
        <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">
          You&apos;re all set — thank you!
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          We&apos;ve received your request. A licensed {siteConfig.city} agent
          will review your options and reach out shortly — usually the same
          business day.
        </p>

        <div className="card mt-8 text-left">
          <h2 className="text-lg font-bold">What happens next</h2>
          <ol className="mt-3 space-y-2 text-slate-600">
            <li>1. We compare A-rated carriers for your best rate.</li>
            <li>2. A local agent contacts you with clear options.</li>
            <li>3. You choose what fits — or nothing at all. No pressure.</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={telHref} className="btn-primary">
            📞 Prefer to talk now? Call {siteConfig.phone}
          </a>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
