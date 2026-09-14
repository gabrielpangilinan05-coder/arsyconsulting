"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const steps: {
  number: string;
  title: string;
  summary: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "Understand",
    summary:
      "We start by understanding your operation, your people, your processes, and the challenges affecting performance.",
    icon: Search,
  },
  {
    number: "02",
    title: "Identify",
    summary:
      "We look beyond the symptoms to uncover the root causes of inefficiency, waste, bottlenecks, and performance gaps.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Improve",
    summary:
      "We work with your team to develop and implement practical solutions that improve day-to-day performance.",
    icon: Wrench,
  },
  {
    number: "04",
    title: "Sustain",
    summary:
      "We help establish the standards, accountability, and continuous improvement practices needed to keep those gains moving forward.",
    icon: ShieldCheck,
  },
];

export default function Framework() {
  return (
    <section
      id="approach"
      className="scroll-mt-28 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeIn className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Our Approach
          </h2>
        </FadeIn>

        <div className="relative mt-8">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="pointer-events-none absolute top-10 right-8 left-8 z-0 hidden h-0.5 origin-left bg-emerald-500/20 lg:block dark:bg-emerald-500/25"
            aria-hidden
          />

          <ol className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="group h-full list-none"
                >
                  <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-500/5">
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                          {step.number}
                        </span>
                        <Icon
                          className="h-5 w-5 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-600 dark:text-emerald-400 dark:group-hover:text-emerald-300"
                          aria-hidden
                        />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {step.summary}
                      </p>
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <FadeIn className="mt-10 max-w-3xl">
          <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            From the Production Floor to Your Next Level of Performance
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Manufacturing is where people, processes, technology, and business performance come
            together. At Arsy Consulting, we bring real operational experience to that
            intersection—helping manufacturers see opportunities, overcome challenges, and turn
            improvement into a competitive advantage.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
