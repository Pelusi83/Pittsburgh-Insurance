import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";

export function Footer() {
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-2xl">
              🛡️
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 text-slate-600">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-slate-500">
            {siteConfig.hours}
            <br />
            Serving {siteConfig.city} &amp; all of Allegheny County.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Insurance
          </h3>
          <ul className="mt-4 space-y-2.5">
            {insuranceTypes.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/insurance/${t.slug}`}
                  className="text-slate-700 hover:text-brand-700"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="text-slate-700 hover:text-brand-700">
                Why Choose Us
              </Link>
            </li>
            <li>
              <Link
                href="/#how-it-works"
                className="text-slate-700 hover:text-brand-700"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/quote"
                className="text-slate-700 hover:text-brand-700"
              >
                Get a Free Quote
              </Link>
            </li>
            <li>
              <Link
                href="/licensing"
                className="text-slate-700 hover:text-brand-700"
              >
                Licensing &amp; Disclosures
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-slate-700 hover:text-brand-700"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-slate-700 hover:text-brand-700">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={telHref} className="text-slate-700 hover:text-brand-700">
                📞 {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-slate-700 hover:text-brand-700"
              >
                ✉️ {siteConfig.email}
              </a>
            </li>
            <li className="text-slate-700">
              📍 {siteConfig.address.city}, {siteConfig.address.region}
            </li>
          </ul>
          <Link href="/quote" className="btn-gold mt-6 w-full">
            Get My Free Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-px space-y-3 py-6 text-sm text-slate-500">
          <p>
            © {year} {siteConfig.name}. All rights reserved. {siteConfig.name} is
            a licensed insurance referral and brokerage service in the
            Commonwealth of Pennsylvania.
          </p>
          <p>
            <strong>Disclosure:</strong> {siteConfig.name} is not an insurance
            carrier. We connect consumers with licensed insurance agents and
            A-rated carriers and may receive compensation from those carriers.
            This does not affect the price you pay. All coverage is subject to
            carrier underwriting, terms, and approval. Quotes are estimates, not
            binding offers of coverage.
          </p>
        </div>
      </div>
    </footer>
  );
}
