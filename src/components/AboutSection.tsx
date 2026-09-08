"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const whyFeatures: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Hands-On Floor Experience",
    copy: "Practical, on-site implementation alongside plant managers and shop floor operators.",
    icon: Wrench,
  },
  {
    title: "Data-Driven Strategy",
    copy: "Root cause identification using operational data, OEE tracking, and capacity bottlenecks.",
    icon: BarChart3,
  },
  {
    title: "Sustainable Culture",
    copy: "Building long-term continuous improvement (Kaizen) and ownership directly within your workforce.",
    icon: Users,
  },
];

const highlightBadges = [
  "Less waste",
  "Higher efficiency",
  "Better performance",
  "Stronger profitability",
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-slate-50 dark:bg-slate-950">
      <div className="py-10 sm:py-14 lg:py-16">
        <FadeIn className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            About Us
          </p>
          <h2 className="mb-3 mt-2 max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Transforming Operations. Creating Lasting Results.
          </h2>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Arsy Consulting is an international consulting firm focused on helping manufacturing
            companies improve operational performance, increase efficiency, reduce costs, and
            achieve sustainable profitable growth. We believe successful transformation goes beyond
            advice. It requires understanding what happens on the production floor, identifying the
            real causes behind performance gaps, and turning opportunities into measurable
            improvements.
          </p>
        </FadeIn>
      </div>

      <div className="pb-8 lg:pb-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 lg:grid-cols-2 lg:gap-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-emerald-500/40 hover:shadow-xl sm:p-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <Target className="mb-3 h-6 w-6 text-emerald-500" aria-hidden />
            <h3 className="mb-3 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              Our Mission
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We work alongside management and operational teams to identify improvement
              opportunities, strengthen processes, increase productivity, and create a culture of
              continuous improvement. Our goal is not only to recommend change — but to help make
              change happen.
            </p>
            <div className="mt-4 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4 pl-4 dark:bg-emerald-500/10">
              <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-200">
                Our mission is simple: to make manufacturing businesses stronger, smarter, and more
                profitable.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="h-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-emerald-500/40 hover:shadow-xl sm:p-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <TrendingUp className="mb-3 h-6 w-6 text-emerald-500" aria-hidden />
            <h3 className="mb-3 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              From the Production Floor to Business Performance
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Great results start with strong operations. We look at the complete operation —
              people, processes, productivity, quality, costs, capacity, and management systems — to
              understand where performance can be improved. Every solution is built around the needs
              and challenges of the organization.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {highlightBadges.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>

      <div className="py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <FadeIn className="mb-8 max-w-3xl">
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Why Arsy Consulting?
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              We combine hands-on manufacturing experience with a performance-driven consulting
              approach. Our focus is always on practical execution and measurable results.
            </p>
          </FadeIn>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {whyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110 dark:bg-emerald-500/15 dark:text-emerald-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {feature.copy}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pb-8 lg:px-8">
        <FadeIn className="mx-auto max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-900/10 p-6 text-center sm:p-8 dark:border-emerald-800/50 dark:bg-emerald-950/40">
          <h3 className="mb-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            Better Operations. Stronger Business.
          </h3>
          <p className="mx-auto max-w-xl text-sm text-slate-600 dark:text-slate-300">
            Whether your goal is to increase productivity, reduce costs, improve manufacturing
            performance, or transform your operations, Arsy Consulting is ready to help you move
            forward.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-700"
          >
            Let&apos;s build better operations together
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
