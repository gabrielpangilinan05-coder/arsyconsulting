const steps = [
  {
    number: "01",
    title: "Analyze",
    summary: "Understand your operation, performance, challenges, and opportunities.",
  },
  {
    number: "02",
    title: "Prioritize",
    summary: "Identify improvements with the greatest operational and financial impact.",
  },
  {
    number: "03",
    title: "Implement",
    summary: "Turn recommendations into practical changes together with your teams.",
  },
  {
    number: "04",
    title: "Measure",
    summary: "Track performance and quantify the results.",
  },
  {
    number: "05",
    title: "Sustain",
    summary: "Build standards, ownership, and continuous improvement into the organization.",
  },
];

export default function Framework() {
  return (
    <section
      id="approach"
      className="scroll-mt-24 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            Our Methodology
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Our Way of Working
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            A closed-loop operating system for plant transformation. Every phase ends with
            measurable output so executives can see progress in cost, throughput, and control.
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-2">
          {steps.map((step, index) => (
            <li key={step.number} className="relative">
              {index < steps.length - 1 && (
                <span
                  className="pointer-events-none absolute top-7 right-0 hidden h-px w-2 translate-x-full bg-emerald-500/40 md:block"
                  aria-hidden
                />
              )}
              <article className="soft-card h-full p-4 transition hover:border-emerald-500/40">
                <p className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {step.number}
                </p>
                <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-normal text-slate-600 sm:text-sm dark:text-slate-300">
                  {step.summary}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
