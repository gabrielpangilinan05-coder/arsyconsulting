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
      {/*
        Mobile: one composition — full-bleed plant image with copy overlaid.
        Desktop: split panel — copy left, image right.
      */}
      <div className="relative grid min-h-[calc(100svh-4.75rem)] w-full overflow-hidden sm:min-h-[520px] lg:min-h-[560px] lg:grid-cols-2">
        <div className="absolute inset-0 lg:relative lg:col-start-2 lg:row-start-1 lg:min-h-full">
          <Image
            src="/images/plant-floor.png"
            alt="Food manufacturing plant operations"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Mobile scrim — keeps headline/CTA readable over the photo */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/55 lg:hidden"
            aria-hidden
          />
          {/* Desktop seam into the copy column */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 lg:block"
            aria-hidden
          >
            <div className="h-full w-full bg-gradient-to-r from-slate-50 via-slate-50/40 to-transparent dark:from-slate-950 dark:via-slate-950/40" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-8 sm:py-14 lg:col-start-1 lg:row-start-1 lg:bg-slate-50 lg:px-12 lg:py-12 lg:dark:bg-slate-950 xl:px-16">
          <div
            className="pointer-events-none absolute inset-0 hidden opacity-[0.12] lg:block dark:opacity-[0.18]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.2), transparent 40%)",
            }}
            aria-hidden
          />
          <FadeIn className="relative max-w-xl">
            <h1 className="text-[1.75rem] font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl lg:text-slate-900 lg:dark:text-white">
              <span className="block">Stronger Operations.</span>
              <span className="block">Stronger Teams.</span>
              <span className="mt-1 block text-[#b89355]">Better Results.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base lg:text-slate-600 lg:dark:text-slate-300">
              We help manufacturing companies improve{" "}
              <span className="font-semibold text-[#c9a86a] lg:text-[#b89355]">performance</span>,
              increase{" "}
              <span className="font-semibold text-[#c9a86a] lg:text-[#b89355]">efficiency</span> and
              drive sustainable growth.
            </p>
            <a
              href="#contact"
              className="group/cta mt-7 inline-flex items-center justify-center gap-2.5 rounded-md bg-[#b89355] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-black/25 transition duration-200 hover:-translate-y-px hover:bg-[#a6824a] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b89355] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent motion-reduce:transform-none lg:shadow-[#b89355]/30 lg:focus-visible:ring-offset-2"
            >
              Request a Consultation
              <ArrowRight className="cta-arrow" aria-hidden />
            </a>
          </FadeIn>
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
