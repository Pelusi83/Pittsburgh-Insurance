import { siteConfig } from "@/lib/site";

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
          Local insurance help across Allegheny County and Southwestern
          Pennsylvania.
        </p>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {siteConfig.areasServed.map((area) => (
            <li
              key={area}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              📍 {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
