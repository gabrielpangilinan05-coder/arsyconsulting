"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  Car,
  Check,
  Cpu,
  Factory,
  FlaskConical,
  HeartPulse,
  Package,
  Pill,
  UtensilsCrossed,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
  capabilities: string[];
  icon: LucideIcon;
}

const services: ServiceItem[] = [
  {
    id: "food-beverage",
    title: "Food & Beverage",
    description:
  "Improve production efficiency, reduce waste, and maintain consistent quality while meeting food safety and regulatory requirements.",
    fullText:
  "Optimize yield, eliminate processing bottlenecks, and build reliable routines to ensure total operational compliance and consistent product quality across lines.",
    image: "/images/services/food-beverage-production.png",
    capabilities: [
  "Waste & Yield Optimization",
  "Food Safety & Compliance",
  "Quality Control & Line Efficiency",],
    icon: UtensilsCrossed,
  },
  {
    id: "pharmaceuticals",
    title: "Pharmaceuticals",
    description:
  "Strengthen manufacturing processes, improve operational efficiency, and support consistent quality in highly regulated production environments.",
    fullText:
  "Streamline pharmaceutical production workflows, maintain strict compliance standards, and ensure high yield while safeguarding batch integrity and product quality across lines.",
    image: "/images/services/pharmaceuticals.png",
    capabilities: [
  "Regulatory & GMP Compliance",
  "Batch Process Optimization",
  "Quality Assurance & Control",],
    icon: Pill,
  },
  {
    id: "medical-devices",
    title: "Medical Devices",
    description:
  "Build reliable and controlled manufacturing processes that support product quality, regulatory compliance, and efficient production.",
    fullText:
  "Optimize medical device assembly and manufacturing workflows, maintain strict regulatory compliance, and ensure zero-defect quality standards across production lines.",
    image: "/images/services/medical-devices.png",
  capabilities: [
  "Quality System & Regulatory Compliance",
  "Assembly Line Optimization",
  "Traceability & Defect Reduction",],
    icon: HeartPulse,
  },
  {
    id: "chemicals",
title: "Chemicals",
description:
  "Improve process control, production efficiency, and workplace safety while reducing waste, downtime, and unnecessary operating costs.",
fullText:
  "Optimize chemical manufacturing workflows, enhance process stability, and implement robust safety protocols to lower operating costs and ensure peak operational yield.",
image: "/images/services/chemicals.png",
capabilities: [
  "Process & Yield Optimization",
  "EHS & Workplace Safety",
  "Downtime & Waste Reduction",],

    icon: FlaskConical,
  },
  {
    id: "automotive",
  title: "Automotive",
    description:
  "Optimize production flow, improve quality, reduce downtime, and create more efficient processes that support demanding automotive standards.",
    fullText:
  "Streamline assembly line workflows, eliminate operational bottlenecks, and enforce rigorous quality control to maximize throughput and meet strict automotive manufacturing standards.",
    image: "/images/services/automotive.png",
    capabilities: [
  "Assembly Line & Flow Optimization",
  "Downtime & Bottleneck Reduction",
  "Quality Standards & Defect Control",],

    icon: Car,
  },
  {
   id: "electronics",
title: "Electronics",
description:
  "Increase production reliability and consistency by improving workflows, quality controls, and manufacturing processes in fast-moving production environments.",
fullText:
  "Optimize high-velocity electronics assembly lines, enhance yield rates, and implement rigorous quality checks to maintain consistency across fast-moving production schedules.",
image: "/images/services/electronics.png",
capabilities: [
  "Workflow & Line Efficiency",
  "Yield & Quality Control",
  "Process Reliability & Defect Reduction",],
    icon: Cpu,
  },
  {
    id: "packaging",
    title: "Packaging",
    description:
      "Reduce production losses, improve line efficiency, and optimize processes to deliver consistent output while controlling operating costs.",
    fullText:
      "Optimize packaging line throughput, minimize material waste, and refine operational processes to maintain high output standards while keeping operating costs under control.",
    image: "/images/services/packaging.png",
    capabilities: [
      "Line Efficiency & Speed",
      "Waste & Loss Reduction",
      "Process Optimization & Cost Control",
    ],
    icon: Package,
  },
  {
    id: "industrial-manufacturing",
    title: "Industrial Manufacturing",
    description:
      "Identify bottlenecks, improve shop-floor performance, and establish more disciplined processes that help manufacturers operate efficiently and consistently.",
    fullText:
      "Streamline complex plant workflows, eliminate shop-floor bottlenecks, and instill operational discipline to ensure reliable, high-yield production across facilities.",
    image: "/images/services/industrial-manufacturing.png",
    capabilities: [
      "Bottleneck & Flow Analysis",
      "Shop-Floor Performance Optimization",
      "Process Discipline & Standardization",
    ],
    icon: Factory,
  },
  {
    id: "machinery-equipment",
    title: "Machinery & Equipment",
    description:
      "Improve manufacturing workflows, production planning, and process reliability while reducing avoidable downtime.",
    fullText:
      "Enhance heavy equipment manufacturing workflows, refine master production planning, and build reliable processes to minimize downtime and maximize operational capacity.",
    image: "/images/services/machinery-equipment.png",
    capabilities: [
      "Production Planning & Scheduling",
      "Downtime Reduction & Preventative Maintenance",
      "Workflow & Reliability Optimization",
    ],
    icon: Wrench,
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

      <div className="scrollbar-hide relative max-h-[90vh] w-full max-w-2xl animate-[fade-in_0.2s_ease-out] overflow-y-auto rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-white">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-slate-100 p-2 text-slate-700 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
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
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
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
    <section
      id="services"
      className="scroll-mt-28 bg-white py-10 sm:py-14 lg:py-16 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeIn className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
            Our Services
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Practical Solutions for Better Manufacturing Performance
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Arsy Consulting works with manufacturers across a wide rage of industries to improve operations,
            control costs, and build more reliable processes. Our approach is practical and hands-on-focused on solving the issues that affect your people, 
            production, quality, and bottom line.
          </p>
        </FadeIn>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={0.06 * index}>
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800/90 dark:bg-slate-900/90 dark:hover:border-emerald-500/40 dark:hover:shadow-emerald-950/40"
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

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400 dark:group-hover:text-slate-950">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="mb-1.5 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                        {service.description}
                      </p>
                    </div>
                    <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Learn more
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {selectedService && <ServiceModal service={selectedService} onClose={closeModal} />}
    </section>
  );
}
