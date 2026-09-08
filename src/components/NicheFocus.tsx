"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  DollarSign,
  Droplets,
  Factory,
  PieChart,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
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
  subtitle: string;
  badge: string;
  shortText: string;
  image: string;
  focusAreas?: string;
  objective?: string;
  rule?: string;
  goal?: string;
  icon: LucideIcon;
}

const industries: IndustryItem[] = [
  {
    id: "food-beverage",
    title: "Food & Beverage Manufacturing",
    subtitle: "Efficiency, Quality, Safety & Reliability",
    badge: "Quality & Safety",
    shortText:
      "Improve production performance, reduce waste, optimize labor, and remove floor bottlenecks.",
    focusAreas:
      "Production Efficiency • Waste Reduction • Capacity • Productivity • Quality • Cost Optimization • Continuous Improvement",
    image: "/images/food-beverage-line.jpg",
    icon: Droplets,
  },
  {
    id: "industrial",
    title: "Industrial Manufacturing",
    subtitle: "Stronger Processes. Higher Performance.",
    badge: "Capacity & Flow",
    shortText:
      "Support complex production flow, reduce downtime, increase productivity, and structure operations.",
    objective: "Get more performance from your operation.",
    image: "/images/industrial-assembly-line.png",
    icon: Factory,
  },
  {
    id: "high-tech",
    title: "High-Tech & Electronics Manufacturing",
    subtitle: "Precision. Performance. Continuous Improvement.",
    badge: "Precision Systems",
    shortText:
      "Maintain strict quality control, strengthen operational processes, and create reliable production environments.",
    image: "/images/high-tech-cleanroom.png",
    icon: Cpu,
  },
  {
    id: "medical-cleanroom",
    title: "Medical & Cleanroom Manufacturing",
    subtitle: "Quality & Efficiency in Controlled Environments",
    badge: "Quality & Compliance",
    shortText:
      "Disciplined processes, standardization, and strong management for regulated, cleanroom environments.",
    rule: "Quality and efficiency should strengthen each other — not compete.",
    image: "/images/medical-cleanroom.png",
    icon: ShieldCheck,
  },
  {
    id: "consumer-products",
    title: "Consumer Products",
    subtitle: "Cost, Speed, Quality & Flexibility",
    badge: "Speed & Flexibility",
    shortText:
      "Enhance production efficiency, workforce utilization, and capacity to build a responsive manufacturing organization.",
    image: "/images/consumer-products.png",
    icon: ShoppingBag,
  },
  {
    id: "packaging-process",
    title: "Packaging & Process Manufacturing",
    subtitle: "Reduce Waste. Improve Flow. Increase Output.",
    badge: "Efficiency",
    shortText:
      "Eliminate thousands of small repeated inefficiencies in flow, equipment utilization, and downtime.",
    goal: "Create a more stable, efficient, and profitable operation.",
    image: "/images/packaging-process.png",
    icon: Zap,
  },
];

const pillars: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Increase Productivity",
    copy: "Get more output from available resources.",
    icon: TrendingUp,
  },
  {
    title: "Reduce Operational Costs",
    copy: "Identify and eliminate unnecessary losses.",
    icon: DollarSign,
  },
  {
    title: "Improve Efficiency",
    copy: "Build smarter and more reliable processes.",
    icon: SlidersHorizontal,
  },
  {
    title: "Strengthen Performance",
    copy: "Create visibility, accountability, and continuous improvement.",
    icon: ShieldAlert,
  },
  {
    title: "Increase Profitability",
    copy: "Translate operational improvements into financial results.",
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
      className="scroll-mt-28 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeIn className="mb-8 max-w-3xl">
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
                    <p className="mb-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {industry.subtitle}
                    </p>
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

        <div className="mt-12">
          <FadeIn className="mb-6 max-w-2xl">
            <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Different Industries. One Objective.
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Regardless of the product being manufactured, our approach remains focused on
              measurable business impact.
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-emerald-500/50 dark:hover:bg-slate-900 dark:hover:shadow-emerald-900/20"
                >
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400 dark:group-hover:text-slate-950">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mb-2 text-base font-bold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {item.copy}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <FadeIn className="my-8 rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/50 dark:bg-emerald-950/40">
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
        </FadeIn>
      </div>

      {activeIndustry && <IndustryModal industry={activeIndustry} onClose={closeModal} />}
    </section>
  );
}
