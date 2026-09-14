"use client";

import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const valuePills = [
  "Improve Efficiency",
  "Reduce Costs",
  "Increase Productivity",
  "Improve Performance",
  "Support Long-Term Growth",
];

export default function Overview() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl border-t border-slate-200 px-5 py-10 sm:py-14 lg:px-8 lg:py-16 dark:border-slate-800">
        <FadeIn>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Better Operations. Lower Costs. Stronger Results.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            We help manufacturing companies find what's slowing down, reduce unnecessary costs, and improve the way their operations run.
            At Arsy Consulting, we work closely with your team to understand your business, identify areas for improvement, and put practical solutions in place that make a real difference.
            
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Every Business has Room to Improve
          </h3>
          <p className="mb-4 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Wether it's rising costs, production delays, inefficient processes, or performance issues, we help you find the problem and work toward a solution that fits your business.
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
        </FadeIn>

        <FadeIn delay={0.2} className="rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/60 dark:bg-emerald-950/40">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Ready to Improve Your Operations?
          </h3>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Discover where your business can perform better.
          </p>
          <a
            href="#contact"
            className="group/cta cta-primary"
          >
            Schedule a Consultation
            <ArrowRight className="cta-arrow" aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
