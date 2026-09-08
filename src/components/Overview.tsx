const valuePills = [
  "Higher Efficiency",
  "Lower Costs",
  "Stronger Performance",
  "Sustainable Growth",
];

export default function Overview() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 dark:border-slate-800">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Transforming Manufacturing. Delivering Results.
        </h2>
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          We help manufacturing companies improve performance, reduce costs, increase efficiency,
          and build more profitable operations. Arsy Consulting partners with manufacturers
          worldwide to turn operational challenges into measurable business results.
        </p>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            From Challenge to Performance
          </h3>
          <p className="mb-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Every manufacturing operation is different. We analyze your current performance,
            identify improvement opportunities, and develop practical solutions designed around your
            business.
          </p>
          <div className="flex flex-wrap gap-2">
            {valuePills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-400"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/60 dark:bg-emerald-950/40">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Ready to Improve Your Operations?
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Discover where your business can perform better.
          </p>
          <a
            href="#contact"
            className="inline-block rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700"
          >
            Let&apos;s Build Better Operations Together
          </a>
        </div>
      </div>
    </section>
  );
}
