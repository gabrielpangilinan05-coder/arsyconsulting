import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LegalPageShellProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPageShell({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-100/70 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16 lg:px-8">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </a>

          <div className="space-y-3">
            <div className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Legal
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              {description}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          <article className="mt-10 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {children}
          </article>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            <a
              href="/#contact"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
            >
              Return to contact form
            </a>
            <span aria-hidden className="text-slate-300 dark:text-slate-700">
              |
            </span>
            <a
              href="/privacy-policy"
              className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
            >
              Privacy Policy
            </a>
            <span aria-hidden className="text-slate-300 dark:text-slate-700">
              |
            </span>
            <a
              href="/terms"
              className="underline-offset-2 hover:text-emerald-600 hover:underline dark:hover:text-emerald-400"
            >
              Terms and Conditions
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}
