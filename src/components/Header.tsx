"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";

export function Header() {
  const [open, setOpen] = useState(false);
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      {/* Trust strip */}
      <div className="bg-brand-900 text-white">
        <div className="container-px flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-1.5 text-center text-sm font-medium sm:justify-between">
          <span className="hidden sm:inline">
            ⭐ Rated 4.9/5 by 300+ Pittsburgh families &amp; businesses
          </span>
          <span>
            🔒 Licensed &amp; local · Free quotes ·{" "}
            <a href={telHref} className="font-bold underline underline-offset-2">
              {siteConfig.phone}
            </a>
          </span>
        </div>
      </div>

      <div className="container-px flex items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-2xl shadow-soft">
            🛡️
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold text-slate-900">
              {siteConfig.name}
            </span>
            <span className="block text-xs font-semibold uppercase tracking-wide text-brand-700">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div className="group relative">
            <button className="py-2 text-base font-semibold text-slate-700 hover:text-brand-700">
              Insurance ▾
            </button>
            <div className="invisible absolute left-0 top-full w-64 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              {insuranceTypes.map((t) => (
                <Link
                  key={t.slug}
                  href={`/insurance/${t.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  <span className="text-xl" aria-hidden>
                    {t.icon}
                  </span>
                  <span className="font-medium">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/about"
            className="text-base font-semibold text-slate-700 hover:text-brand-700"
          >
            Why Us
          </Link>
          <Link
            href="/#how-it-works"
            className="text-base font-semibold text-slate-700 hover:text-brand-700"
          >
            How It Works
          </Link>
          <a href={telHref} className="btn-ghost">
            📞 Call
          </a>
          <Link href="/quote" className="btn-gold">
            Get My Free Quote
          </Link>
        </nav>

        <button
          className="btn-ghost !min-h-[46px] !px-4 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"} Menu
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-100 bg-white lg:hidden"
        >
          <div className="container-px grid gap-1 py-4">
            <p className="px-2 pt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
              Insurance
            </p>
            {insuranceTypes.map((t) => (
              <Link
                key={t.slug}
                href={`/insurance/${t.slug}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-lg text-slate-800 hover:bg-brand-50"
              >
                <span aria-hidden>{t.icon}</span>
                {t.name}
              </Link>
            ))}
            <hr className="my-2 border-slate-100" />
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-lg text-slate-800 hover:bg-brand-50"
            >
              Why Us
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-lg text-slate-800 hover:bg-brand-50"
            >
              How It Works
            </Link>
            <a href={telHref} className="btn-ghost mt-2">
              📞 Call {siteConfig.phone}
            </a>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="btn-gold mt-1"
            >
              Get My Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
