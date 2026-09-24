"use client";

import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const outcomes = [
  "Improve efficiency",
  "Reduce costs",
  "Increase productivity",
  "Improve performance",
  "Support long-term growth",
];

export default function Overview() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl border-t border-slate-200/80 px-6 py-14 sm:px-8 sm:py-16 lg:px-8 lg:py-20 dark:border-slate-800">
        <FadeIn>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b89355]">
            What we do
          </p>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            Better Operations. Lower Costs. Stronger Results.
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            We help manufacturing companies find what&apos;s slowing them down, cut unnecessary
            costs, and improve how operations run — with practical solutions that fit the business.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-800">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Every business has room to improve
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Whether it&apos;s rising costs, production delays, inefficient processes, or performance
            issues — we help you find the problem and build a solution that fits.
          </p>
          <ul className="mt-8 max-w-md space-y-0">
            {outcomes.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 border-b border-slate-200/90 py-3.5 text-[15px] text-slate-800 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b89355]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-800">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            Ready to improve your operations?
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Discover where your business can perform better.
          </p>
          <a href="#contact" className="group/cta cta-primary mt-7">
            Schedule a Consultation
            <ArrowRight className="cta-arrow" aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
