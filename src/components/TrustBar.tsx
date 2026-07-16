export function TrustBar() {
  const badges = [
    { icon: "🛡️", label: "Licensed in Pennsylvania" },
    { icon: "🔒", label: "Bank-Level Encryption" },
    { icon: "🤝", label: "No Obligation, Ever" },
    { icon: "🏆", label: "A-Rated Carriers Only" },
    { icon: "📍", label: "100% Pittsburgh Local" },
  ];

  return (
    <section aria-label="Trust and credibility" className="border-b border-slate-100 bg-white">
      <div className="container-px grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
        {badges.map((b) => (
          <div
            key={b.label}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-center"
          >
            <span className="text-xl" aria-hidden>
              {b.icon}
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
