"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const calendlyUrl =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/";

const cardShell =
  "w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/80 dark:shadow-xl";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/20";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      const payload = Object.fromEntries(data.entries());
      console.info("Lead capture:", payload);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50 py-10 sm:py-14 lg:py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
              Lead Capture
            </p>
            <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Request an operational audit
            </h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              Tell us where the plant is underperforming. We respond with a structured assessment
              plan — scope, timeline, and expected impact areas.
            </p>

            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Prefer to book directly?
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Schedule a discovery call with the Arsy team.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
              >
                Open Calendly Booking
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className={`${cardShell} flex flex-col justify-between`}
            noValidate
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Full name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={fieldClass}
                  placeholder="Jane Chen"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Business email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="jane@company.com"
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Company name
                </span>
                <input
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  className={fieldClass}
                  placeholder="Acme Foods Ltd."
                />
              </label>

              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Plant / facility location
                </span>
                <input
                  name="location"
                  type="text"
                  required
                  className={fieldClass}
                  placeholder="City, Country"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Main operational challenge
                </span>
                <textarea
                  name="challenge"
                  required
                  rows={4}
                  className={`${fieldClass} resize-y`}
                  placeholder="e.g. OEE below target on packaging lines; rising labor cost per unit; yield loss on high-volume SKUs…"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sending…" : "Submit Audit Request"}
            </button>

            {status === "success" && (
              <p className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-400" role="status">
                Request received. We&apos;ll follow up within one business day.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-400" role="alert">
                Something went wrong. Please try again or book via Calendly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
