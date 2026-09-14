"use client";

import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function ValueBanner() {
  return (
    <section
      aria-labelledby="value-banner-heading"
      className="bg-white px-5 dark:bg-slate-900 lg:px-8"
    >
      <FadeIn className="mx-auto my-8 max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center shadow-sm sm:my-10 sm:p-8 dark:border-emerald-800/50 dark:bg-emerald-950/40">
        <p className="mx-auto mb-4 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Hands-on manufacturing consulting focused on better operations, stronger teams, and
          measurable business performance.
        </p>
        <h2
          id="value-banner-heading"
          className="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"
        >
          Let&apos;s Build a Better-Performing Operation.
        </h2>
        <p className="mx-auto max-w-xl text-sm italic text-slate-600 dark:text-slate-300">
          Tell us where your operation is today. Let&apos;s explore where it could go next.
        </p>
        <a
          href="#contact"
          className="group/cta mt-5 inline-flex items-center justify-center gap-2.5 rounded-lg border border-emerald-600/30 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-700 transition duration-200 hover:-translate-y-px hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:transform-none dark:text-emerald-400 dark:hover:bg-emerald-500/10"
        >
          Talk to Arsy Consulting
          <ArrowRight className="cta-arrow" aria-hidden />
        </a>
      </FadeIn>
    </section>
  );
}
