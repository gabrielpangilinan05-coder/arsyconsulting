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
        <h2
          id="value-banner-heading"
          className="mb-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"
        >
          Every Improvement Should Create Value.
        </h2>
        <p className="mx-auto max-w-xl text-sm text-slate-600 dark:text-slate-300">
          Our objective is simple: help your manufacturing operation become more efficient,
          productive, competitive, and profitable.
        </p>
        <a
          href="#contact"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700"
        >
          Request an Operational Audit
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </FadeIn>
    </section>
  );
}
