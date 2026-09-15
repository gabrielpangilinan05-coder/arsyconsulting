"use client";

import { motion, useReducedMotion } from "framer-motion";
import { User } from "lucide-react";

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
        className="group relative overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_20px_60px_-28px_rgba(2,6,23,0.7)] transition-shadow duration-300 hover:shadow-[0_24px_70px_-24px_rgba(2,6,23,0.75)]"
        style={{
          background:
            "linear-gradient(135deg, #0b1324 0%, #0d1728 55%, #09252d 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-8 p-6 sm:gap-9 sm:p-10 lg:grid-cols-[minmax(230px,260px)_1fr] lg:gap-12 lg:p-12 xl:p-14">
          {/* Portrait column ~35% */}
          <aside className="flex flex-col items-center lg:items-start">
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex h-[300px] w-[240px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#101D30] sm:h-[310px] sm:w-[250px]"
            >
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0b1324]/80 via-transparent to-emerald-500/[0.04]"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <User className="h-8 w-8" aria-hidden />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                  Photo coming soon
                </p>
              </div>
            </motion.div>

            <span className="mt-5 inline-flex rounded-full border border-emerald-500/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-400">
              Founder &amp; CEO
            </span>
          </aside>

          {/* Editorial column ~65% */}
          <div className="min-w-0 max-w-[42rem] text-left">
            <h3
              id="founder-name"
              className="text-[1.65rem] font-bold tracking-tight text-white sm:text-[2rem] lg:text-[2.15rem]"
            >
              U. Arslan
            </h3>
            <p className="mt-2 text-[13px] font-medium text-emerald-400">
              Founder &amp; CEO, Arsy Consulting
            </p>

            <blockquote className="my-6 rounded-r-[10px] border-l-2 border-emerald-500 bg-[#0a1520]/80 px-[17px] py-4">
              <p className="text-[15px] font-medium italic leading-[1.6] text-white/85 sm:text-base">
                I&apos;ve experienced manufacturing from the inside—as an employee, a leader, and now
                as a business owner.
              </p>
            </blockquote>

            <div className="space-y-3.5 text-[13px] leading-[1.75] text-white/72 sm:text-sm sm:leading-[1.8]">
              <p>
                U. Arslan built his career around one goal:{" "}
                <strong className="font-semibold text-white/90">
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

            <div className="mt-8 rounded-[11px] border border-[rgba(0,180,160,0.35)] bg-[rgba(0,150,130,0.05)] p-[17px] transition-colors duration-300 hover:border-[rgba(0,180,160,0.5)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400">
                Our Operating Philosophy
              </p>
              <p className="mt-2.5 text-[14px] font-medium leading-[1.6] text-white sm:text-[15px]">
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
