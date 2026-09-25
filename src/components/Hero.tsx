"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, Cog, Users } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const highlights = [
  { icon: BarChart3, label: "Higher Efficiency" },
  { icon: Cog, label: "Optimized Operations" },
  { icon: Users, label: "Stronger Teams" },
];

const metrics = [
  { value: "15–30%", label: "Typical cost reduction potential" },
  { value: "+8–20 pts", label: "OEE improvement range" },
  { value: "90 days", label: "To first measurable gains" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="mt-0 border-b border-slate-200 bg-slate-50 pt-0 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
    >
      <div className="relative flex min-h-[calc(100svh-4.75rem)] w-full items-center overflow-hidden sm:min-h-[560px] lg:min-h-[640px]">
        <Image
          src="/images/hero-consultation-hires.jpg"
          alt="Consulting team reviewing manufacturing performance data in a plant conference room"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[40%_center] sm:object-[44%_center] lg:object-center"
        />

        {/* Light left wash only — keeps faces clear */}
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-slate-950/75 from-[0%] via-slate-950/35 via-[28%] to-transparent to-[52%]"
          aria-hidden
        />

        <div className="relative z-20 flex w-full items-center py-14 pl-6 pr-6 sm:py-16 lg:pl-16 xl:pl-20">
          <div className="w-full max-w-[560px] [text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            <FadeIn>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#c29a62] sm:text-[0.8125rem]">
                Manufacturing Consulting Experts
              </p>

              <h1 className="text-[1.85rem] font-extrabold uppercase leading-[1.08] tracking-tight text-white sm:text-[2.65rem] lg:text-5xl">
                <span className="block whitespace-nowrap">Stronger Operations.</span>
                <span className="block whitespace-nowrap">Stronger Teams.</span>
                <span className="mt-0.5 block whitespace-nowrap text-[#c29a62]">
                  Better Results.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/90 sm:text-base">
                We help manufacturing companies improve{" "}
                <span className="font-medium text-[#c29a62]">performance</span>,
                increase efficiency and drive sustainable growth.
              </p>

              <ul className="mt-7 flex flex-nowrap items-center gap-0 whitespace-nowrap">
                {highlights.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="flex shrink-0 items-center">
                    {i > 0 && (
                      <span
                        className="mx-3 h-4 w-px shrink-0 bg-white/25"
                        aria-hidden
                      />
                    )}
                    <span className="flex items-center gap-1.5 text-sm font-medium text-white sm:text-[0.95rem]">
                      <Icon
                        className="size-[1.05rem] shrink-0 text-[#c29a62]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="group/cta mt-8 inline-flex items-center justify-center gap-2.5 rounded-[4px] bg-[#c29a62] px-8 py-4 text-[0.95rem] font-bold uppercase tracking-wide text-white shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-px hover:bg-[#b08a55] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c29a62] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transform-none"
              >
                Request a Consultation
                <ArrowRight className="cta-arrow" aria-hidden />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6 sm:py-10 lg:px-8">
        <FadeIn delay={0.15}>
          <div className="grid w-full grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="mb-0.5 text-base font-extrabold text-emerald-600 sm:mb-1 sm:text-3xl dark:text-emerald-400">
                  {metric.value}
                </p>
                <p className="text-[10px] font-medium leading-snug text-slate-500 sm:text-xs dark:text-slate-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
