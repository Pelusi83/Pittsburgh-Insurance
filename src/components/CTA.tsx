import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function CTA({
  title = "Ready to see how much you could save?",
  subtitle = "Get your free, no-obligation Pittsburgh insurance quote today.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const telHref = `tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section className="container-px py-14">
      <div className="relative overflow-hidden rounded-2xl bg-brand-600 px-6 py-12 text-center text-white shadow-soft sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 80% at 100% 0%, rgba(245,179,1,0.35) 0%, rgba(22,99,245,0) 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-brand-100">{subtitle}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold text-xl">
              Get My Free Quote →
            </Link>
            <a
              href={telHref}
              className="btn-ghost border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              📞 Call {siteConfig.phone}
            </a>
          </div>
          <p className="mt-5 text-sm text-brand-200">
            Free · No obligation · Licensed local agents
          </p>
        </div>
      </div>
    </section>
  );
}
