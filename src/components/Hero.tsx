"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

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
      <div className="relative grid min-h-[420px] w-full overflow-hidden sm:min-h-[500px] lg:min-h-[560px] lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center bg-slate-50 px-5 py-12 sm:px-8 lg:px-12 xl:px-16 dark:bg-slate-950">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.2), transparent 40%)",
            }}
            aria-hidden
          />
          <FadeIn className="relative max-w-xl">
            <h1 className="text-3xl font-extrabold uppercase leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="block text-slate-900 dark:text-white">Stronger Operations.</span>
              <span className="block text-slate-900 dark:text-white">Stronger Teams.</span>
              <span className="mt-1 block text-[#b89355]">Better Results.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              We help food manufacturing companies improve{" "}
              <span className="font-semibold text-[#b89355]">performance</span>, increase{" "}
              <span className="font-semibold text-[#b89355]">efficiency</span> and drive sustainable
              growth.
            </p>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-[#b89355] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-all hover:bg-[#a6824a]"
            >
              Request a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </FadeIn>
        </div>

        <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-full">
          <Image
            src="/images/plant-floor.png"
            alt="Food manufacturing plant operations"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 lg:block"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-r from-slate-50 via-slate-50/40 to-transparent dark:from-slate-950 dark:via-slate-950/40" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10 lg:px-8">
        <FadeIn delay={0.15}>
          <div className="grid w-full grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3 dark:border-slate-800 dark:bg-slate-900">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <p className="mb-1 text-2xl font-extrabold text-emerald-600 sm:text-3xl dark:text-emerald-400">
                  {metric.value}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
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
