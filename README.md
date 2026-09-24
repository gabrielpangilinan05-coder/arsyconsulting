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

Local form submissions use the Next.js API route at `/api/audit-request` (requires `RESEND_API_KEY` in `.env.local`).

## Configuration

Create `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxx
# Optional override for the contact form endpoint (defaults to /api/audit-request)
# NEXT_PUBLIC_FORM_ENDPOINT=/api/audit-request.php
```

## Deploy to Host Hong Kong (cPanel)

Shared hosting cannot run `next start`. Build a static export plus a PHP form handler:

```bash
npm run build:cpanel
```

This writes production files to `out/`.

### Upload

1. In cPanel File Manager (or FTP), open `public_html` for `arsyconsulting.com`  
   (or `public_html` / the account home folder for the temporary URL `http://103.16.230.32/~arsycons/`).
2. Upload **everything inside** `out/` (including `.htaccess` — enable “Show hidden files” in File Manager).
3. On the server, copy `api/config.example.php` → `api/config.local.php` and set:
   - `recipient` — live default is `info@arsyconsulting.com` (local Next.js route emails `gabrielpangilinan05@gmail.com` unless `AUDIT_RECIPIENT` is set)
   - `from_email` — an address on your domain (create it in cPanel → Email Accounts)
   - optional `resend_api_key` — if set, email goes through Resend instead of PHP `mail()`
4. Point the domain nameservers at Host Hong Kong when ready:
   - `dns11.hosthongkong.com`
   - `dns12.hosthongkong.com`

### Verify

- Homepage loads on the temporary or live URL
- Submit the contact form once and confirm the email arrives
- `/privacy-policy/` and `/terms/` load (trailing slashes)

## Sections

1. **Hero** — brand-led headline, dual CTAs, trust metrics  
2. **Framework** — interactive Analyze → Improve → Implement → Sustain  
3. **Niche focus** — food & industrial manufacturing challenges  
4. **Services** — four capability cards  
5. **ROI Estimator** — interactive savings model  
6. **Contact** — lead form + discovery scheduling  

## Build (Node host / local)

```bash
npm run build
npm start
```
