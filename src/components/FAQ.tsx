import { FaqJsonLd } from "@/components/JsonLd";

type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "Is Pittsburgh Insurance Hub really free?",
    a: "Yes, completely free to you. Insurance carriers compensate licensed agents when a policy is placed, so there is never a fee or added cost on your end — and no obligation to buy anything.",
  },
  {
    q: "Are you a licensed insurance agency?",
    a: "Yes. We are a licensed insurance referral and brokerage service in the Commonwealth of Pennsylvania, and we work only with A-rated, established carriers.",
  },
  {
    q: "What types of insurance can you help with?",
    a: "All of them — auto, home, renters, life, health, Medicare, disability, and business/commercial insurance. If you're not sure what you need, just ask and we'll guide you.",
  },
  {
    q: "How fast can I get a quote?",
    a: "Most people complete our quick quote request in about two minutes. A licensed agent then compares carriers and follows up with your best options, usually the same business day.",
  },
  {
    q: "Is my personal information safe?",
    a: "Absolutely. Your information is encrypted and shared only with the licensed carriers needed to prepare your quote. We never sell your data to spam lists or unrelated third parties.",
  },
  {
    q: "Do I have to buy if I request a quote?",
    a: "Never. There is zero obligation. Compare your options, ask all the questions you want, and only move forward if it's right for you.",
  },
];

export function FAQ({
  faqs = defaultFaqs,
  title = "Frequently asked questions",
  withSchema = true,
}: {
  faqs?: FaqItem[];
  title?: string;
  withSchema?: boolean;
}) {
  return (
    <section aria-labelledby="faq-heading" className="container-px py-16 lg:py-20">
      {withSchema && <FaqJsonLd faqs={faqs} />}
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Questions? Answered.</p>
          <h2 id="faq-heading" className="mt-4 text-3xl font-extrabold sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group card cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 text-lg font-bold text-slate-900">
                {f.q}
                <span
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
