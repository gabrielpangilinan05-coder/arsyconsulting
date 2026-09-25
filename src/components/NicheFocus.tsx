"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  DollarSign,
  Factory,
  PieChart,
  ShieldCheck,
  TrendingUp,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { IndustryTicker } from "@/components/IndustryTicker";

interface IndustryItem {
  id: string;
  title: string;
  badge: string;
  shortText: string;
  image: string;
  focusAreas: string[];
  icon: LucideIcon;
}

const industries: IndustryItem[] = [
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    badge: "Operational Discipline",
    shortText:
      "Streamline workflows, strengthen standard operating procedures, and create more efficient day-to-day operations.",
    focusAreas: [
      "Workflow Optimization",
      "Standard Operating Procedures (SOPs)",
      "Daily Management Systems",
      "Operational Efficiency",
    ],
    image: "/images/services/operational-excellence-v2.jpg",
    icon: Factory,
  },
  {
    id: "cost-reduction",
    title: "Cost Reduction",
    badge: "Margin & Profitability",
    shortText:
      "Identify unnecessary costs, production losses, and inefficiencies that impact your margins.",
    focusAreas: [
      "Cost Optimization",
      "Production Loss Elimination",
      "Yield Improvement",
      "Margin Protection",
    ],
    image: "/images/services/cost-reduction.jpg",
    icon: DollarSign,
  },
  {
    id: "process-improvement",
    title: "Process Improvement",
    badge: "Throughput & Flow",
    shortText:
      "Find bottlenecks and improve the way work moves through your facility—from production to delivery.",
    focusAreas: [
      "Bottleneck Removal",
      "Lead Time Reduction",
      "Shop-Floor Flow",
      "Process Mapping",
    ],
    image: "/images/services/process-improvement-v2.jpg",
    icon: Zap,
  },
  {
    id: "quality-consistency",
    title: "Quality & Consistency",
    badge: "Zero Defects & Standards",
    shortText:
      "Build processes that produce more consistent results and reduce defects, rework, and waste.",
    focusAreas: [
      "Defect Reduction",
      "Rework Minimization",
      "Standardized Quality Controls",
      "Scrap Reduction",
    ],
    image: "/images/services/quality-consistency.jpg",
    icon: ShieldCheck,
  },
  {
    id: "productivity-improvement",
    title: "Productivity Improvement",
    badge: "Capacity & Utilization",
    shortText:
      "Help your people and equipment perform more effectively without simply adding more resources.",
    focusAreas: [
      "OEE Improvement",
      "Labor Productivity",
      "Asset Utilization",
      "Capacity Maximization",
    ],
    image: "/images/services/productivity-improvement.jpg",
    icon: TrendingUp,
  },
  {
    id: "sustainable-improvements",
    title: "Sustainable Improvements",
    badge: "Continuous Improvement",
    shortText:
      "Put practical systems in place so improvements continue long after the consulting engagement ends.",
    focusAreas: [
      "Continuous Improvement Systems",
      "Kaizen & Lean Culture",
      "Sustained Performance",
      "Operational Governance",
    ],
    image: "/images/services/sustainable-improvements.jpg",
    icon: PieChart,
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

      <div className="scrollbar-hide relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/90 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
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
            {industry.badge}
          </p>
          <h3
            id={titleId}
            className="mt-2 pr-10 text-2xl font-extrabold text-slate-900 dark:text-white"
          >
            {industry.title}
          </h3>
          <p className="mt-4 mb-6 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {industry.shortText}
          </p>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Key Capabilities
          </p>
          <ul className="mb-8 space-y-3">
            {industry.focusAreas.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-emerald-700"
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
      className="scroll-mt-28 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeIn className="mb-8 max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            What We Help You Improve
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            We don&apos;t just identify problems—we work with your team to turn them into measurable
            improvements.
          </p>
        </FadeIn>

        <FadeIn className="mb-8">
          <IndustryTicker />
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.button
                key={industry.id}
                type="button"
                onClick={() => setActiveId(industry.id)}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800/90 dark:bg-slate-900/90 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-950/40"
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

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400 dark:group-hover:text-slate-950">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {industry.badge}
                      </span>
                    </div>
                    <h3 className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                      {industry.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                      {industry.shortText}
                    </p>
                  </div>
                  <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    View details
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {activeIndustry && <IndustryModal industry={activeIndustry} onClose={closeModal} />}
    </section>
  );
}
