import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <a href="#top" className="inline-flex" aria-label="Arsy Consulting">
              <Logo circular />
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Hands-on operational excellence for food manufacturing and industrial production.
              Better operations. Stronger profitability.
            </p>
          </div>

          <div className="space-y-6 md:justify-self-end md:text-right">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Headquarters
              </p>
              <address className="mt-2 not-italic text-sm text-slate-700 dark:text-slate-400">
                Hong Kong, HK
              </address>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Direct Contact
              </p>
              <a
                href="mailto:info@arsyconsulting.com"
                className="mt-2 inline-block text-sm text-slate-700 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                info@arsyconsulting.com
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Connect
              </p>
              <a
                href="https://www.linkedin.com/company/arsy-consult"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-slate-700 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arsy Consulting. All rights reserved.</p>
          <p>Operational Excellence. Stronger Teams. Better Performance.</p>
        </div>
      </div>
    </footer>
  );
}
