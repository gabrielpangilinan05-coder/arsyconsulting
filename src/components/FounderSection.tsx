"use client";

import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";

export default function FounderSection() {
  return (
    <div className="relative mt-4">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md lg:p-12"
      >
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-2 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              <User className="h-14 w-14" aria-hidden />
            </motion.div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">
              Photo coming soon
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ugur Arslan
            </h3>
            <p className="mt-1 text-sm font-semibold italic text-emerald-400">
              Founder &amp; CEO, Arsy Consulting
            </p>

            <blockquote className="mt-6 flex gap-3 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-950/20 p-4 transition-colors hover:bg-emerald-950/30">
              <Quote className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <p className="text-sm font-medium italic leading-relaxed text-slate-200">
                I&apos;ve experienced manufacturing from the inside—as an employee, a leader, and now
                as a business owner.
              </p>
            </blockquote>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
              <p>
                Ugur Arslan built his career around one goal:{" "}
                <strong className="font-semibold text-white">
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

            <div className="mt-6 rounded-r-xl border-l-4 border-emerald-500 bg-emerald-950/20 p-4 transition-colors hover:bg-emerald-950/30">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-400">
                His Philosophy Is Straightforward
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
                Don&apos;t just point out the problem. Understand it. Fix it. Make the improvement
                last.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
