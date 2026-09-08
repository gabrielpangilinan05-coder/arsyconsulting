const whyFeatures = [
  {
    title: "Operational Excellence",
    copy: "Improving processes, productivity, quality, and performance.",
  },
  {
    title: "Cost Optimization",
    copy: "Reducing waste and unnecessary operational costs.",
  },
  {
    title: "Performance Improvement",
    copy: "Creating stronger KPIs, accountability, and management structures.",
  },
  {
    title: "Sustainable Growth",
    copy: "Building improvements that continue creating value long after the project is completed.",
  },
];

const highlightBadges = [
  "Less waste",
  "Higher efficiency",
  "Better performance",
  "Stronger profitability",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-slate-50 dark:bg-slate-950">
      <div className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            About Us
          </p>
          <h2 className="mb-3 mt-2 max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Transforming Operations. Creating Lasting Results.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Arsy Consulting is an international consulting firm focused on helping manufacturing
            companies improve operational performance, increase efficiency, reduce costs, and
            achieve sustainable profitable growth. We believe successful transformation goes beyond
            advice. It requires understanding what happens on the production floor, identifying the
            real causes behind performance gaps, and turning opportunities into measurable
            improvements.
          </p>
        </div>
      </div>

      <div className="pb-8 lg:pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 lg:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Our mission is simple: to make manufacturing businesses stronger, smarter, and more
              profitable. We work alongside management and operational teams to identify improvement
              opportunities, strengthen processes, increase productivity, and create a culture of
              continuous improvement. Our goal is not only to recommend change — but to help make
              change happen.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
              From the Production Floor to Business Performance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Great results start with strong operations. We look at the complete operation —
              people, processes, productivity, quality, costs, capacity, and management systems — to
              understand where performance can be improved. Every solution is built around the needs
              and challenges of the organization.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {highlightBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-center text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>

      <div className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Why Arsy Consulting?
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              We combine hands-on manufacturing experience with a performance-driven consulting
              approach. Our focus is always on practical execution and measurable results.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <h4 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  {feature.title}
                </h4>
                <p className="mt-1.5 text-xs leading-normal text-slate-600 sm:text-sm dark:text-slate-300">
                  {feature.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-8 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/50 dark:bg-emerald-950/40">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Better Operations. Stronger Business.
          </h3>
          <p className="mx-auto max-w-xl text-sm text-slate-600 dark:text-slate-300">
            Whether your goal is to increase productivity, reduce costs, improve manufacturing
            performance, or transform your operations, Arsy Consulting is ready to help you move
            forward.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700"
          >
            Let&apos;s build better operations together
          </a>
        </div>
      </div>
    </section>
  );
}
