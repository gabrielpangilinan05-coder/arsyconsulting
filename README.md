# Arsy Consulting Website

High-converting Next.js marketing site for **Arsy Consulting** — operational excellence consulting for food manufacturing and industrial production facilities.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Plus Jakarta Sans

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-org/discovery
```

## Sections

1. **Hero** — brand-led headline, dual CTAs, trust metrics  
2. **Framework** — interactive Analyze → Improve → Implement → Sustain  
3. **Niche focus** — food & industrial manufacturing challenges  
4. **Services** — four capability cards  
5. **ROI Estimator** — interactive savings model  
6. **Contact** — lead form + Calendly booking link  

## Lead form

The contact form currently simulates submission (`console.info`). Wire `ContactForm.tsx` to Formspree, Resend, or a Next.js API route for production.

## Build

```bash
npm run build
npm start
```
