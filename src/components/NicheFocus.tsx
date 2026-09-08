"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

interface IndustryItem {
  id: string;
  title: string;
  subtitle: string;
  shortText: string;
  image: string;
  focusAreas?: string;
  objective?: string;
  rule?: string;
  goal?: string;
  icon: ReactNode;
}

const industries: IndustryItem[] = [
  {
    id: "food-beverage",
    title: "Food & Beverage Manufacturing",
    subtitle: "Efficiency, Quality, Safety & Reliability",
    shortText:
      "Improve production performance, reduce waste, optimize labor, and remove floor bottlenecks.",
    focusAreas:
      "Production Efficiency • Waste Reduction • Capacity • Productivity • Quality • Cost Optimization • Continuous Improvement",
    image: "/images/food-factory.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M12 3c-2 4-3 6.5-3 9a3 3 0 0 0 6 0c0-2.5-1-5-3-9z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M9 20h6M10 14h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "industrial",
    title: "Industrial Manufacturing",
    subtitle: "Stronger Processes. Higher Performance.",
    shortText:
      "Support complex production flow, reduce downtime, increase productivity, and structure operations.",
    objective: "Get more performance from your operation.",
    image: "/images/plant-floor.png",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M3 20h18M5 20V9l4 3V9l4 3V8l6 4v8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "high-tech",
    title: "High-Tech & Electronics Manufacturing",
    subtitle: "Precision. Performance. Continuous Improvement.",
    shortText:
      "Maintain strict quality control, strengthen operational processes, and create reliable production environments.",
    image: "/images/services/capacity-optimization.png",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "medical-cleanroom",
    title: "Medical & Cleanroom Manufacturing",
    subtitle: "Quality & Efficiency in Controlled Environments",
    shortText:
      "Disciplined processes, standardization, and strong management for regulated, cleanroom environments.",
    rule: "Quality and efficiency should strengthen each other — not compete.",
    image: "/images/performance-management.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M12 4v16M8 8h8M9 12h6M10 16h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    id: "consumer-products",
    title: "Consumer Products",
    subtitle: "Cost, Speed, Quality & Flexibility",
    shortText:
      "Enhance production efficiency, workforce utilization, and capacity to build a responsive manufacturing organization.",
    image: "/images/cost-efficiency.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M4 8h16l-1.5 11H5.5L4 8zM8 8V6a4 4 0 0 1 8 0v2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "packaging-process",
    title: "Packaging & Process Manufacturing",
    subtitle: "Reduce Waste. Improve Flow. Increase Output.",
    shortText:
      "Eliminate thousands of small repeated inefficiencies in flow, equipment utilization, and downtime.",
    goal: "Create a more stable, efficient, and profitable operation.",
    image: "/images/services/process-improvement.jpg",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
        <path
          d="M4 7l8-4 8 4v10l-8 4-8-4V7z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 11v10M4 7l8 4 8-4" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
];

const pillars = [
  {
    title: "Increase Productivity",
    copy: "Get more output from available resources.",
  },
  {
    title: "Reduce Operational Costs",
    copy: "Identify and eliminate unnecessary losses.",
  },
  {
    title: "Improve Efficiency",
    copy: "Build smarter and more reliable processes.",
  },
  {
    title: "Strengthen Performance",
    copy: "Create visibility, accountability, and continuous improvement.",
  },
  {
    title: "Increase Profitability",
    copy: "Translate operational improvements into financial results.",
  },
];

function IndustryModal({
  industry,
  onClose,
}: {
  industry: IndustryItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative h-44 w-full sm:h-56">
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent dark:from-slate-900 dark:via-slate-900/40"
            aria-hidden
          />
        </div>

        <div className="p-6 md:p-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
          Industry Focus
        </p>
        <h3 id={titleId} className="mt-2 pr-10 text-2xl font-extrabold text-slate-900 dark:text-white">
          {industry.title}
        </h3>
        <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          {industry.subtitle}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {industry.shortText}
        </p>

        {industry.focusAreas && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Focus Areas
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
              {industry.focusAreas}
            </p>
          </div>
        )}

        {industry.objective && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Objective
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
              {industry.objective}
            </p>
          </div>
        )}

        {industry.rule && (
          <p className="mt-6 text-sm italic leading-relaxed text-slate-600 dark:text-slate-400">
            {industry.rule}
          </p>
        )}

        {industry.goal && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Goal
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
              {industry.goal}
            </p>
          </div>
        )}

        <a
          href="#contact"
          onClick={onClose}
          className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-emerald-700"
        >
          Discuss {industry.title}
        </a>
        </div>
      </div>
    </div>
  );
}

export default function NicheFocus() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndustry = industries.find((item) => item.id === activeId) ?? null;
  const closeModal = useCallback(() => setActiveId(null), []);

  return (
    <section
      id="industries"
      className="scroll-mt-24 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            Industries We Serve
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Manufacturing Expertise Across Industries
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Every manufacturing environment is different, but the challenges are often similar:
            increasing costs, production losses, capacity constraints, quality issues, inefficient
            processes, and pressure to deliver more with existing resources. Arsy Consulting works
            with manufacturing companies to turn these challenges into opportunities for measurable
            improvement.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            Better Efficiency. Higher Productivity. Stronger Profitability.
          </p>
        </div>

        {/* Industry cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => setActiveId(industry.id)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:scale-[1.02] hover:border-emerald-500 hover:shadow-xl dark:border-slate-800/80 dark:bg-slate-900/80 dark:hover:border-emerald-500/50"
            >
              <div className="relative h-36 w-full overflow-hidden sm:h-40">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/15 dark:text-emerald-400">
                    {industry.icon}
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    {industry.title}
                  </h3>
                  <p className="mb-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {industry.subtitle}
                  </p>
                  <p className="text-xs leading-normal text-slate-600 sm:text-sm dark:text-slate-300">
                    {industry.shortText}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 sm:text-sm dark:text-emerald-400">
                  View details
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-12">
          <div className="mb-6 max-w-2xl">
            <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Different Industries. One Objective.
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Regardless of the product being manufactured, our approach remains focused on
              measurable business impact.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <h4 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                  {pillar.title}
                </h4>
                <p className="mt-1.5 text-xs leading-normal text-slate-600 sm:text-sm dark:text-slate-300">
                  {pillar.copy}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Closing banner */}
        <div className="my-8 rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/50 dark:bg-emerald-950/40">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Your Industry. Your Challenges. Our Focus on Results.
          </h3>
          <p className="mx-auto max-w-xl text-sm text-slate-600 dark:text-slate-300">
            Every transformation starts by understanding where the biggest opportunities are. Arsy
            Consulting works with your organization to identify those opportunities and turn them
            into sustainable operational improvements.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700"
          >
            Let&apos;s discover your improvement potential
          </a>
        </div>
      </div>

      {activeIndustry && <IndustryModal industry={activeIndustry} onClose={closeModal} />}
    </section>
  );
}
