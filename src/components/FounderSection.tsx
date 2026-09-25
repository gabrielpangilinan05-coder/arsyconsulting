"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function FounderSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="founder-name" className="mx-auto w-full max-w-[72rem] px-6">
      <p className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
        Meet Our Founder &amp; CEO
      </p>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-slate-700/80 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900/90 dark:shadow-[0_20px_60px_-28px_rgba(2,6,23,0.55)] dark:hover:shadow-[0_24px_70px_-24px_rgba(2,6,23,0.65)]"
      >
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/[0.08] blur-3xl dark:bg-emerald-500/[0.07]"
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 sm:gap-9 sm:p-10 lg:grid-cols-[minmax(230px,260px)_1fr] lg:gap-12 lg:p-12 xl:p-14">
          {/* Portrait column ~35% */}
          <aside className="flex flex-col items-center lg:items-start">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative h-[300px] w-[240px] overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-100 sm:h-[310px] sm:w-[250px] dark:border-emerald-500/25 dark:bg-slate-700/60"
            >
              <Image
                src="/images/founder-arslan.jpg"
                alt="U. Arslan, Founder & CEO of Arsy Consulting"
                fill
                sizes="250px"
                className="object-cover object-top"
              />
            </motion.div>

            <span className="mt-5 inline-flex rounded-full border border-emerald-600/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-400">
              Founder &amp; CEO
            </span>
          </aside>

          {/* Editorial column ~65% */}
          <div className="min-w-0 max-w-[42rem] text-left">
            <h3
              id="founder-name"
              className="text-[1.65rem] font-bold tracking-tight text-slate-900 sm:text-[2rem] lg:text-[2.15rem] dark:text-white"
            >
              U. Arslan
            </h3>
            <p className="mt-2 text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
              Founder &amp; CEO, Arsy Consulting
            </p>

            <blockquote className="my-6 rounded-r-[10px] border-l-2 border-emerald-500 bg-emerald-50/80 px-[17px] py-4 dark:bg-slate-900/50">
              <p className="text-[15px] font-medium italic leading-[1.6] text-slate-700 sm:text-base dark:text-white/85">
                I&apos;ve experienced manufacturing from the inside—as an employee, a leader, and now
                as a business owner.
              </p>
            </blockquote>

            <div className="space-y-3.5 text-[13px] leading-[1.75] text-slate-600 sm:text-sm sm:leading-[1.8] dark:text-slate-300">
              <p>
                U. Arslan built his career around one goal:{" "}
                <strong className="font-semibold text-slate-800 dark:text-white/90">
                  making manufacturing work better.
                </strong>
              </p>
              <p>
                His journey began as an employee, gaining firsthand experience of the realities of
                production and learning that strong manufacturing results are driven not by machines
                and systems alone, but by the right combination of people, processes, leadership, and
                continuous improvement.
              </p>
              <p>
                As his career progressed, he took on greater responsibility in manufacturing
                operations, developing hands-on experience in production management, operational
                performance, workforce management, process improvement, KPIs, quality, safety, and
                continuous improvement.
              </p>
              <p>
                After years within manufacturing organizations, he moved into independent consulting,
                working across different companies, cultures, production systems, and operational
                environments. This experience reinforced an important lesson: while every factory is
                different, many of the challenges holding businesses back are remarkably similar.
              </p>
              <p>That experience became the foundation of Arsy Consulting.</p>
              <p>
                Today, Ugur brings together the perspective of the employee, operational leader,
                consultant, and business owner to help manufacturers identify opportunities, solve
                operational challenges, and build stronger businesses.
              </p>
            </div>

            <div className="mt-8 rounded-[11px] border border-emerald-500/35 bg-emerald-50/60 p-[17px] transition-colors duration-300 hover:border-emerald-500/50 dark:border-[rgba(0,180,160,0.35)] dark:bg-[rgba(0,150,130,0.08)] dark:hover:border-[rgba(0,180,160,0.5)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                Our Operating Philosophy
              </p>
              <p className="mt-2.5 text-[14px] font-medium leading-[1.6] text-slate-900 sm:text-[15px] dark:text-white">
                Don&apos;t just point out the problem. Understand it. Fix it. Make the improvement
                last.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
