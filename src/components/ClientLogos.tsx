import type { ReactNode } from "react";

export interface ClientLogo {
  name: string;
  mark: ReactNode;
}

const logos: ClientLogo[] = [
  {
    name: "Danone",
    mark: (
      <svg viewBox="0 0 140 48" className="h-10 w-auto" aria-hidden>
        <circle cx="22" cy="24" r="16" fill="currentColor" opacity="0.9" />
        <path
          d="M16 28c2.5-7 6-11 10-12 1.5 4 2 8 1.5 13-3.5 1-7.5 1-11.5-1z"
          fill="#0f172a"
        />
        <text
          x="46"
          y="29"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="1.5"
        >
          DANONE
        </text>
      </svg>
    ),
  },
  {
    name: "Nutricia",
    mark: (
      <svg viewBox="0 0 150 48" className="h-9 w-auto" aria-hidden>
        <text
          x="0"
          y="28"
          fill="currentColor"
          fontFamily="Georgia,serif"
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.5"
        >
          NUTRICIA
        </text>
        <rect x="2" y="34" width="118" height="2" fill="currentColor" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "Coca-Cola",
    mark: (
      <svg viewBox="0 0 160 48" className="h-10 w-auto" aria-hidden>
        <text
          x="4"
          y="34"
          fill="currentColor"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="28"
          fontStyle="italic"
          fontWeight="700"
        >
          Coca-Cola
        </text>
      </svg>
    ),
  },
  {
    name: "Refresco",
    mark: (
      <svg viewBox="0 0 150 48" className="h-10 w-auto" aria-hidden>
        <circle cx="18" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M10 24c4-8 12-8 16 0-4 8-12 8-16 0z"
          fill="currentColor"
          opacity="0.85"
        />
        <text
          x="40"
          y="29"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="18"
          fontWeight="600"
        >
          Refresco
        </text>
      </svg>
    ),
  },
  {
    name: "Omron",
    mark: (
      <svg viewBox="0 0 130 48" className="h-9 w-auto" aria-hidden>
        <text
          x="0"
          y="32"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="2"
        >
          OMRON
        </text>
      </svg>
    ),
  },
  {
    name: "Pepsi",
    mark: (
      <svg viewBox="0 0 120 48" className="h-10 w-auto" aria-hidden>
        <circle cx="20" cy="24" r="16" fill="currentColor" />
        <path d="M6 24h28" stroke="#0f172a" strokeWidth="5" />
        <circle cx="20" cy="24" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
        <text
          x="44"
          y="30"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="20"
          fontWeight="700"
        >
          pepsi
        </text>
      </svg>
    ),
  },
  {
    name: "Monster Energy",
    mark: (
      <svg viewBox="0 0 170 48" className="h-10 w-auto" aria-hidden>
        <path
          d="M4 10l6 28M14 8l6 32M24 10l6 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="42"
          y="22"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="1.5"
        >
          MONSTER
        </text>
        <text
          x="42"
          y="36"
          fill="currentColor"
          fontFamily="system-ui,sans-serif"
          fontSize="11"
          fontWeight="800"
          letterSpacing="1.5"
        >
          ENERGY
        </text>
      </svg>
    ),
  },
];

function LogoItem({ logo }: { logo: ClientLogo }) {
  return (
    <li className="flex shrink-0 items-center justify-center px-8 sm:px-10">
      <div
        className="text-slate-700 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:text-slate-200"
        title={logo.name}
      >
        <span className="sr-only">{logo.name}</span>
        {logo.mark}
      </div>
    </li>
  );
}

export default function ClientLogos() {
  const track = [...logos, ...logos];

  return (
    <section
      aria-label="Client logos"
      className="border-y border-slate-200 bg-slate-100/70 py-8 sm:py-10 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 sm:text-left sm:text-sm">
          Trusted by teams at leading global enterprises
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100/70 to-transparent sm:w-24 dark:from-slate-950"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100/70 to-transparent sm:w-24 dark:from-slate-950"
          aria-hidden
        />

        <ul className="logo-marquee flex w-max items-center">
          {track.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </ul>
      </div>

      <ul className="mx-auto hidden max-w-6xl grid-cols-2 gap-6 px-5 motion-reduce:mt-2 motion-reduce:grid sm:grid-cols-4 lg:grid-cols-7 lg:px-8">
        {logos.map((logo) => (
          <LogoItem key={`static-${logo.name}`} logo={logo} />
        ))}
      </ul>
    </section>
  );
}
