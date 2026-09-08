import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://arsyconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arsy Consulting | Operational Excellence for Manufacturing",
    template: "%s | Arsy Consulting",
  },
  description:
    "Hands-on operational transformation for food manufacturing and industrial plants. Analyze, improve, implement, and sustain measurable factory-floor results.",
  keywords: [
    "operational excellence",
    "lean manufacturing",
    "food manufacturing consulting",
    "cost reduction",
    "OEE optimization",
    "KPI frameworks",
    "plant performance improvement",
  ],
  authors: [{ name: "Arsy Consulting" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Arsy Consulting",
    title: "Arsy Consulting | Transform Plant Operations. Eliminate Waste.",
    description:
      "Hands-on consulting for food and industrial manufacturers. Measurable gains in OEE, cost, and productivity — from audit to sustained execution.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Arsy Consulting — Operational Excellence for Manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsy Consulting | Operational Excellence for Manufacturing",
    description:
      "Hands-on operational transformation for food manufacturing and industrial production facilities.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arsy Consulting",
  description:
    "International consulting firm specializing in operational excellence, lean manufacturing, cost reduction, and KPI systems for food manufacturing and industrial production facilities.",
  url: siteUrl,
  areaServed: "Worldwide",
  serviceType: [
    "Operational Excellence Consulting",
    "Lean Manufacturing",
    "Cost Reduction",
    "Performance Management",
    "Workforce Optimization",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hong Kong",
    addressCountry: "HK",
  },
  knowsAbout: [
    "Lean manufacturing",
    "OEE optimization",
    "Food manufacturing operations",
    "KPI frameworks",
    "Waste elimination",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
