"use client";

import { CheckCircle2, Factory } from "lucide-react";

const tickerItems = [
  { label: "Better Efficiency", isValueProp: true },
  { label: "Higher Productivity", isValueProp: true },
  { label: "Stronger Profitability", isValueProp: true },
  { label: "Cleanroom Manufacturing", isValueProp: false },
  { label: "Consumer Products", isValueProp: false },
  { label: "Food & Beverage", isValueProp: false },
  { label: "Pharmaceuticals", isValueProp: false },
  { label: "Medical Devices", isValueProp: false },
  { label: "Chemicals", isValueProp: false },
  { label: "Automotive", isValueProp: false },
  { label: "Electronics", isValueProp: false },
  { label: "Packaging", isValueProp: false },
  { label: "Industrial Manufacturing", isValueProp: false },
  { label: "Machinery", isValueProp: false },
];

export function IndustryTicker() {
  const loop = [...tickerItems, ...tickerItems];

  return (
    <div className="industry-ticker relative -mx-5 overflow-hidden py-2 lg:-mx-8">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100/70 to-transparent sm:w-24 dark:from-slate-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100/70 to-transparent sm:w-24 dark:from-slate-950"
        aria-hidden
      />

      <ul
        className="industry-marquee flex w-max items-center gap-3 px-5 lg:px-8"
        aria-label="Value propositions and industries"
      >
        {loop.map((item, idx) => (
          <li key={`${item.label}-${idx}`}>
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm transition-all dark:text-emerald-300">
              {item.isValueProp ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Factory className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              )}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
