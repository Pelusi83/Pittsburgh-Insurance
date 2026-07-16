import Link from "next/link";
import { locations } from "@/lib/locations";

export function AreasServed() {
  return (
    <section
      aria-labelledby="areas-heading"
      className="bg-slate-50 py-14 lg:py-16"
    >
      <div className="container-px text-center">
        <h2 id="areas-heading" className="text-2xl font-extrabold sm:text-3xl">
          Proudly serving Pittsburgh &amp; the surrounding communities
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Local insurance help across Allegheny, Washington, Butler, Beaver and
          Westmoreland counties — within about 50 miles of Pittsburgh.
        </p>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {locations.map((loc) => (
            <li key={loc.slug}>
              <Link
                href={`/locations/${loc.slug}`}
                className="inline-block rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                📍 {loc.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/locations"
          className="mt-6 inline-block font-semibold text-brand-700 hover:underline"
        >
          View all service areas →
        </Link>
      </div>
    </section>
  );
}
