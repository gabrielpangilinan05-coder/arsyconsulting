"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function RoiEstimator() {
  const [annualCost, setAnnualCost] = useState(12_000_000);
  const [wastePercent, setWastePercent] = useState(18);
  const [recoveryRate, setRecoveryRate] = useState(35);

  const results = useMemo(() => {
    const wasteCost = annualCost * (wastePercent / 100);
    const recoverable = wasteCost * (recoveryRate / 100);
    const conservative = recoverable * 0.7;
    const stretch = recoverable * 1.15;
    return { wasteCost, recoverable, conservative, stretch };
  }, [annualCost, wastePercent, recoveryRate]);

  return (
    <section
      id="roi-estimator"
      className="scroll-mt-28 bg-slate-100/70 py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
              <Calculator className="h-3.5 w-3.5" aria-hidden />
              ROI Estimator
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Estimate potential annual savings
            </h2>
            <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Model the opportunity from Lean and operational excellence. Adjust annual operating
              cost, estimated waste, and realistic recovery rate to preview savings range. This is
              directional — a plant audit validates the precise number.
            </p>

            <div className="mt-6 space-y-5">
              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Estimated annual operational cost
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(annualCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min={1_000_000}
                  max={100_000_000}
                  step={500_000}
                  value={annualCost}
                  onChange={(e) => setAnnualCost(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-valuetext={formatCurrency(annualCost)}
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>$1M</span>
                  <span>$100M</span>
                </div>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Estimated waste / inefficiency
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {wastePercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={wastePercent}
                  onChange={(e) => setWastePercent(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>5%</span>
                  <span>40%</span>
                </div>
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    Recoverable with Lean optimization
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {recoveryRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={60}
                  step={1}
                  value={recoveryRate}
                  onChange={(e) => setRecoveryRate(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>15%</span>
                  <span>60%</span>
                </div>
              </label>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
                Projected opportunity
              </p>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Estimated annual waste cost
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                {formatCurrency(results.wasteCost)}
              </p>

              <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400">Potential annual savings</p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight text-emerald-600 sm:text-4xl dark:text-emerald-400">
                  {formatCurrency(results.recoverable)}
                </p>
                <p className="mt-2 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  Conservative range: {formatCurrency(results.conservative)} –{" "}
                  {formatCurrency(results.stretch)}
                </p>
              </div>

              <a href="#contact" className="group/cta cta-contextual mt-6">
                Explore Your Opportunity
                <ArrowRight className="cta-arrow" aria-hidden />
              </a>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Illustrative model only. Actual savings depend on facility maturity, product mix,
                labor markets, and execution quality.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
