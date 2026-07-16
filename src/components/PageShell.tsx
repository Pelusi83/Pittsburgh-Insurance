export function PageShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-brand-950 py-14 text-white">
        <div className="container-px max-w-3xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
          {intro && <p className="mt-4 text-lg text-brand-100">{intro}</p>}
          {updated && (
            <p className="mt-3 text-sm text-brand-200">Last updated: {updated}</p>
          )}
        </div>
      </section>
      <section className="container-px py-14">
        <div className="prose-legal mx-auto max-w-3xl space-y-6 text-slate-700">
          {children}
        </div>
      </section>
    </>
  );
}
