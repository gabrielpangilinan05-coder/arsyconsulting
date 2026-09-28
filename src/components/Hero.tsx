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
      {/* Stack until lg (phones + tablets); full-bleed overlay on desktop */}
      <div className="relative flex w-full flex-col overflow-hidden lg:min-h-[clamp(36rem,72svh,42rem)] lg:flex-row lg:items-center">
        <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-950 lg:absolute lg:inset-0 lg:aspect-auto lg:bg-transparent">
          <Image
            src="/images/hero-consultation-mobile.jpg"
            alt="Consulting team reviewing manufacturing performance data in a plant conference room"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 0px, 100vw"
            className="object-contain object-center lg:hidden"
          />
          <Image
            src="/images/hero-consultation-hires.jpg"
            alt="Consulting team reviewing manufacturing performance data in a plant conference room"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 100vw, 0px"
            className="hidden object-cover object-[44%_center] lg:block lg:object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 z-10 hidden bg-gradient-to-r from-slate-950/75 from-[0%] via-slate-950/35 via-[28%] to-transparent to-[52%] lg:block"
            aria-hidden
          />
        </div>

        <div className="relative z-20 flex w-full items-center bg-slate-950 px-[clamp(1.25rem,4vw,5rem)] py-[clamp(2.5rem,5vw,4rem)] text-white lg:bg-transparent">
          <div className="w-full max-w-[560px] lg:[text-shadow:0_1px_18px_rgba(0,0,0,0.45)]">
            <FadeIn>
              <p className="mb-4 text-[clamp(0.7rem,0.2vw+0.65rem,0.8125rem)] font-semibold uppercase tracking-[0.22em] text-[#c29a62]">
                Manufacturing Consulting Experts
              </p>

              <h1 className="text-[clamp(1.75rem,2.5vw+1rem,3rem)] font-extrabold uppercase leading-[1.15] tracking-tight text-white lg:leading-[1.08]">
                <span className="block lg:whitespace-nowrap">Stronger Operations.</span>
                <span className="block lg:whitespace-nowrap">Stronger Teams.</span>
                <span className="mt-0.5 block text-[#c29a62] lg:whitespace-nowrap">
                  Better Results.
                </span>
              </h1>

              <p className="mt-[clamp(1rem,2vw,1.25rem)] max-w-md text-[clamp(0.95rem,0.4vw+0.85rem,1rem)] leading-relaxed text-white/90">
                We help manufacturing companies improve{" "}
                <span className="font-medium text-[#c29a62]">performance</span>,
                increase efficiency and drive sustainable growth.
              </p>

              <ul className="mt-[clamp(1.5rem,3vw,1.75rem)] flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-0 md:gap-y-2 lg:flex-nowrap lg:whitespace-nowrap">
                {highlights.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="flex shrink-0 items-center">
                    {i > 0 && (
                      <span
                        className="mx-3 hidden h-4 w-px shrink-0 bg-white/25 md:block"
                        aria-hidden
                      />
                    )}
                    <span className="flex items-center gap-1.5 text-[clamp(0.875rem,0.3vw+0.8rem,0.95rem)] font-medium text-white">
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
                className="group/cta mt-[clamp(1.75rem,3.5vw,2rem)] inline-flex w-full items-center justify-center gap-2.5 rounded-[4px] bg-[#c29a62] px-8 py-4 text-[0.95rem] font-bold uppercase tracking-wide text-white shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-px hover:bg-[#b08a55] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c29a62] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transform-none md:w-auto"
              >
                Request a Consultation
                <ArrowRight className="cta-arrow" aria-hidden />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-[clamp(1.25rem,4vw,2rem)] py-[clamp(1.5rem,3vw,2.5rem)]">
        <FadeIn delay={0.15}>
          <div className="grid w-full grid-cols-3 gap-[clamp(0.5rem,1.5vw,1rem)] rounded-2xl border border-slate-200 bg-white p-[clamp(0.75rem,2vw,1.25rem)] shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="mb-0.5 text-[clamp(1rem,2vw+0.5rem,1.875rem)] font-extrabold text-emerald-600 dark:text-emerald-400">
                  {metric.value}
                </p>
                <p className="text-[clamp(0.625rem,0.4vw+0.5rem,0.75rem)] font-medium leading-snug text-slate-500 dark:text-slate-400">
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
