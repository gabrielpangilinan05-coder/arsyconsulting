"use client";

import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Hands-on manufacturing consulting focused on better operations, stronger teams, and
                measurable business performance.
              </p>
            </div>

            <div className="space-y-6 md:justify-self-end md:text-right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Headquarters
                </p>
                <address className="mt-2 flex items-center gap-2 not-italic text-sm text-slate-700 md:justify-end dark:text-slate-400">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                  Hong Kong, HK
                </address>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Direct Contact
                </p>
                <div className="mt-2 space-y-2">
                  <a
                    href="mailto:info@arsyconsulting.com"
                    className="inline-flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-emerald-600 md:justify-end dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <Mail
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    />
                    info@arsyconsulting.com
                  </a>
                  <a
                    href="tel:+852800938238"
                    className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-emerald-600 md:justify-end dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <Phone
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    />
                    +852 800 938 238
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Connect
                </p>
                <div className="mt-2 space-y-2">
                  <a
                    href="https://www.linkedin.com/company/arsy-consult"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-emerald-600 md:justify-end dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    />
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/arsyconsulting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-700 transition-colors hover:text-emerald-600 md:justify-end dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    <ExternalLink
                      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden
                    />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Arsy Consulting. All rights reserved.</p>
            <p>Operational Excellence. Stronger Teams. Better Performance.</p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
