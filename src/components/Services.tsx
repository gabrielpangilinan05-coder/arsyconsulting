"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullText: string;
  image: string;
  capabilities: string[];
  icon: ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "operational-excellence",
    title: "Operational Excellence",
    tagline: "Structured & High-Performing Operations",
    description:
      "Build a more efficient, disciplined, and high-performing manufacturing operation. We optimize shop-floor workflows, enforce standard operating procedures (SOPs), and eliminate operational friction.",
    fullText:
      "Deep-dive analysis into line productivity, overall equipment effectiveness (OEE), and shop-floor workflow optimization. We eliminate bottlenecks to help your plant achieve maximum operational capacity while building discipline into daily routines.",
    image: "/images/services/operational-excellence.jpg",
    capabilities: [
      "OEE Improvement",
      "Downtime Reduction",
      "Standard Operating Procedures (SOPs)",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 19V5M4 19h16M8 15V9m4 6V7m4 8v-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "process-improvement",
    title: "Process Improvement",
    tagline: "Smarter Workflows & Bottleneck Removal",
    description:
      "Identify line bottlenecks and create smarter, more streamlined processes. We utilize value-stream mapping and Lean principles to boost throughput and improve product consistency.",
    fullText:
      "Value-stream mapping and Lean manufacturing principles applied directly to production lines to streamline workflow speed and product consistency. We remove non-value-added steps that quietly erode capacity.",
    image: "/images/services/process-improvement.jpg",
    capabilities: ["Value-Stream Mapping", "Line Balancing", "Bottleneck Elimination"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 7h10M4 12h16M4 17h8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M16 5l4 2-4 2V5zM14 15l4 2-4 2v-4z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "cost-efficiency",
    title: "Cost & Efficiency Optimization",
    tagline: "Reduce Waste & Control Operating Expenses",
    description:
      "Improve bottom-line margins without simply adding headcount. We audit yield losses, minimize raw material waste, and optimize utility usage across your facility.",
    fullText:
      "Data-driven strategies to reduce material yield loss, optimize utility/energy consumption, and eliminate non-value-added steps in production — protecting quality and safety while improving margins.",
    image: "/images/services/cost-optimization.jpg",
    capabilities: ["Yield Loss Control", "Raw Material Waste Audit", "Resource Allocation"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 3v18M7 8.5c0-1.9 2.2-3.5 5-3.5s5 1.6 5 3.5-2.2 3.5-5 3.5-5 1.6-5 3.5 2.2 3.5 5 3.5 5-1.6 5-3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "production-capacity",
    title: "Production & Capacity Optimization",
    tagline: "Maximize Output From Existing Equipment",
    description:
      "Get significantly more throughput from your current machinery and plant footprint. We balance line speeds and eliminate unscheduled downtime without requiring major CAPEX investments.",
    fullText:
      "Unlock capacity already sitting inside your plant. We improve production flow, changeovers, workforce utilization, and line performance so you get more output from assets you already own.",
    image: "/images/services/capacity-optimization.png",
    capabilities: ["Line Speed Balancing", "Changeover Reduction", "Throughput Gains Without CapEx"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M3 20h18M5 20V10l4-3 4 5 3-2 3 4v6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "kpi-performance",
    title: "KPI & Performance Management",
    tagline: "Turn Shop-Floor Data Into Action",
    description:
      "Establish clear KPIs, real-time tracking dashboards, and frontline accountability. We install daily tier-meeting governance to ensure continuous performance tracking.",
    fullText:
      "Implementing real-time shop-floor KPI tracking dashboards, daily tier-meeting governance, and frontline management accountability tools — so data drives action, not just reports.",
    image: "/images/services/kpi-management.png",
    capabilities: ["Custom KPI Dashboards", "Shop-floor Leadership", "Sustained Governance"],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M4 20V10m5 10V4m5 16v-7m5 7V8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "operational-transformation",
    title: "Operational Transformation",
    tagline: "Lasting Cultural & Operational Change",
    description:
      "Drive full-scale plant transformation with hands-on leadership coaching. We help your teams adopt new operating standards that stick long after the project ends.",
    fullText:
      "Broader transformation programs covering processes, structure, performance management, leadership routines, and continuous improvement — moving from problem identification to lasting operational and cultural change.",
    image: "/images/services/transformation.jpg",
    capabilities: [
      "Leadership Coaching",
      "New Operating Standards",
      "Sustained Cultural Change",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
];

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl animate-[fade-in_0.2s_ease-out] overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-slate-100 p-2 text-slate-700 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative h-56 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-900 dark:via-slate-900/40"
            aria-hidden
          />
        </div>

        <div className="p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
            {service.tagline}
          </p>
          <h3 id={titleId} className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
            {service.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {service.fullText}
          </p>

          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Key Capabilities
          </p>
          <ul className="mb-8 space-y-3">
            {service.capabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:bg-emerald-700"
          >
            Request Audit for This Service
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const closeModal = useCallback(() => setSelectedService(null), []);

  return (
    <section id="services" className="scroll-mt-24 bg-white py-10 sm:py-14 lg:py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            Our Services
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Turning Operational Challenges Into Measurable Results
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Arsy Consulting helps manufacturing companies improve productivity, reduce costs,
            optimize processes, and build stronger, more profitable operations. We combine
            operational expertise with a practical, results-driven approach — from identifying
            opportunities to implementing sustainable improvements.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service)}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:border-emerald-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/80"
            >
              <div className="relative h-36 w-full overflow-hidden sm:h-40">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    {service.icon}
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    {service.tagline}
                  </p>
                  <p className="text-xs leading-normal text-slate-600 sm:text-sm dark:text-slate-300">
                    {service.description}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 transition group-hover:text-emerald-700 sm:text-sm dark:text-emerald-400 dark:group-hover:text-emerald-300">
                  Learn more
                  <span aria-hidden>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} />
      )}
    </section>
  );
}
