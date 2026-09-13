"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FounderSection from "@/components/FounderSection";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 bg-slate-50 dark:bg-slate-950">
      <div className="py-10 sm:py-14 lg:py-16">
        <FadeIn className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            About Us
          </p>
          <h2 className="mb-3 mt-2 max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Built on Manufacturing Experience. Focused on Better Results.
          </h2>
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            <p>
              At Arsy Consulting, we believe better manufacturing starts with understanding how a
              business really operates.
            </p>
            <p>
              Our foundation comes from firsthand experience inside manufacturing—from working on
              the production floor to leading teams and managing increasingly complex operations.
              That experience has provided a practical understanding of the challenges manufacturers
              face every day: productivity, costs, quality, people, processes, performance, and the
              pressure to deliver results.
            </p>
            <p>
              Arsy Consulting was created to bring that experience to manufacturers looking for more
              than advice.
            </p>
            <p>
              We work alongside management and operational teams to understand what is happening on
              the floor, identify the real causes behind performance gaps, and put practical
              improvement into action. Our work focuses on operational excellence, production
              efficiency, productivity, cost reduction, Lean manufacturing, KPI and performance
              management, workforce optimization, leadership, change management, and continuous
              improvement.
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              We don&apos;t believe in one-size-fits-all solutions.
            </p>
            <p>
              Every factory has its own people, processes, culture, equipment, and challenges. Our
              approach is to understand your operations first, then develop solutions that make
              sense for your business.
            </p>
            <p>
              The goal is simple: improve the way your operation works—and make those improvements
              last.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="pb-8 lg:pb-10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <FadeIn>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
              Meet Our Founder &amp; CEO
            </p>
          </FadeIn>

          <FounderSection />
        </div>
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
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
              Our Mission
            </p>
            <h3 className="mb-3 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              Helping Manufacturers Work Smarter and Perform Better.
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Our mission is to help manufacturing companies improve productivity, reduce
                unnecessary costs, strengthen their processes, and develop stronger teams.
              </p>
              <p>
                We work alongside our clients to turn operational challenges into practical
                improvements and measurable results—creating manufacturing operations that are more
                efficient, disciplined, competitive, and profitable.
              </p>
              <p>
                We measure our success by the improvements our clients are able to achieve and
                sustain.
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
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
              Our Vision
            </p>
            <h3 className="mb-3 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              To Help Shape the Future of Better Manufacturing.
            </h3>
            <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Our vision is to build Arsy Consulting into a trusted international manufacturing
                consulting partner, working alongside organizations around the world to create
                stronger, smarter, and more competitive operations.
              </p>
              <p>
                We want to help manufacturers eliminate unnecessary losses, develop capable teams,
                improve performance, and build systems that allow their businesses to grow with
                confidence.
              </p>
              <p className="font-medium text-slate-800 dark:text-slate-100">
                Our ambition is international, but our approach remains personal.
              </p>
            </div>
          </motion.article>
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
