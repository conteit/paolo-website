# Project Handoff

> Last updated: 2026-04-24

## Current Focus

Site is live and fully functional. No active feature work in progress. Next priorities are adding tests (Vitest + Playwright), expanding the Projects section with real content, and addressing known tech debt items listed below.

---

## Tech Stack Snapshot

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Router 7 (SSR) | 7.13.0 |
| UI | React | 19.2.1 |
| Build | Vite | 7.2.6 |
| Language | TypeScript (strict) | 5.9.3 |
| Styling | Tailwind CSS v4 | 4.1.17 |
| Components | shadcn/ui (New York style) | — |
| Icons | Lucide React + React Icons | 0.556.0 / 5.5.0 |
| Deployment | Vercel (SSR preset) | — |
| Analytics | Vercel Analytics (consent-gated) | 1.6.1 |
| Email | Resend | 6.9.1 |
| CAPTCHA | Cloudflare Turnstile | — |

> **Important:** This project migrated from Remix to React Router 7. CLAUDE.md still references Remix in some places — treat React Router 7 as the source of truth.

---

## Route Map

| URL | File | Purpose |
|-----|------|---------|
| `/` | `app/routes/_index.tsx` | Homepage: Hero → Motto → Philosophy → CTA |
| `/projects` | `app/routes/projects.tsx` | Projects showcase (Coming Soon placeholder) |
| `/privacy` | `app/routes/privacy.tsx` | Privacy policy |
| `/edge` | `app/routes/edge.tsx` | Placeholder edge route |
| `POST /api/contact` | `app/routes/api.contact.ts` | Contact form handler |
| — | `app/routes/routes.ts` | Flat-file routing config (`@react-router/fs-routes`) |

---

## Component Architecture

```
app/
├── root.tsx                    # HTML shell, favicons, structured data (Person + WebSite schema)
├── app.css                     # Global styles, animations, View Transitions API CSS
├── routes/
│   └── _index.tsx              # Composes 4 homepage sections
├── components/
│   ├── AnalyticsProvider.tsx   # Wraps Vercel Analytics behind consent gate
│   ├── CookieBanner.tsx        # Cookie consent UI + useAnalyticsConsent hook
│   └── features/
│       ├── HeroSection.tsx     # Animated "Paolo" title with background image
│       ├── MottoSection.tsx    # Photo + motto (scroll-triggered)
│       ├── PhilosophySection.tsx # 4 philosophy cards (scroll-triggered)
│       ├── CTASection.tsx      # Contact form + Turnstile CAPTCHA + social links
│       └── ProjectCard.tsx     # Reusable project card template (unused — for future)
├── hooks/
│   └── useBackground.ts        # Background image picker with 8-hour localStorage cache
└── lib/
    ├── utils.ts                # cn() utility (clsx + tailwind-merge)
    ├── ConstructionAnimation.tsx # Unused — safe to delete
    └── construction.css        # Unused — safe to delete
```

---

## Environment Variables

All secrets live in the **Vercel project dashboard** — never committed to git.

| Variable | Side | Required | Purpose |
|----------|------|----------|---------|
| `RESEND_API_KEY` | Server | Production | Sends contact form emails |
| `CONTACT_EMAIL` | Server | Production | Recipient of contact emails |
| `TURNSTILE_SECRET_KEY` | Server | Production | Verifies CAPTCHA server-side |
| `VITE_TURNSTILE_SITE_KEY` | Client (build-time) | Production | Renders Turnstile widget |

**Fallback behavior if variables are missing:**
- No `RESEND_API_KEY` → logs to console instead of sending (no error returned to user)
- No `TURNSTILE_SECRET_KEY` → skips server-side CAPTCHA verification silently
- No `CONTACT_EMAIL` → returns error to user

For local dev: create a `.env` file (gitignored) with `VITE_TURNSTILE_SITE_KEY` to test the CAPTCHA widget. Email sending will fall back to console logging without `RESEND_API_KEY`.

---

## Development Workflow

```bash
npm install
npm run dev          # Dev server at localhost:3000
npm run typecheck    # Required before every commit (react-router typegen + tsc)
npm run format       # Prettier formatting
npm run build        # Production build → build/
npm start            # Serve production build locally
```

**Dev tricks:**
- `?bkg=N` URL param forces a specific background image (bypasses 8-hour cache)
- Cookie consent is stored in `localStorage` under `cookie-consent` — clear it to re-test the banner

---

## CI/CD & Deployment

- **Push to `main`** → Vercel auto-deploys to production
- **Pull requests** → Vercel creates preview deployments automatically
- **GitHub Actions CI** (`.github/workflows/ci.yml`): typecheck + build on every push/PR
- **Security workflow** (`.github/workflows/security.yml`): weekly `npm audit` + dependency review on PRs
- **Dependabot** (`.github/dependabot.yml`): weekly npm updates, max 5 open PRs
  - React 19.0.0–19.2.0 are blocked (CVE-2025-55182 / React2Shell vulnerability)

### Updating Dependencies

1. Dependabot PRs are created automatically every Monday — review and merge them
2. For manual updates: `npm update` then `npm run typecheck && npm run build` to verify
3. React Router and its packages (`@react-router/*`, `react-router`) must be updated together — they share a version
4. Tailwind v4 packages (`tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss`) must also be updated together
5. After any update: run `npm run typecheck` and check the build before merging

---

## Key Design Decisions

1. **React Router 7 over Remix** — The project migrated from Remix to React Router 7, which absorbed the same SSR primitives. All loaders/actions follow the same patterns; just the package imports changed (`react-router` instead of `@remix-run/*`).

2. **Tailwind CSS v4** — Uses the new v4 API with CSS-native variables and OKLch color space. Config is minimal (`tailwind.config.js`); most customization lives in `app/app.css` as CSS custom properties. No `@apply` — prefer utility classes directly in JSX.

3. **shadcn/ui (New York style)** — Components are copied into `app/components/ui/` and owned by the project. Installing new shadcn components: `npx shadcn@latest add <component>`. Never update them via npm.

4. **Consent-gated analytics** — Vercel Analytics only loads after explicit user acceptance of the cookie banner. Consent is stored in `localStorage`. The `AnalyticsProvider` wraps the `Analytics` component and checks consent on mount.

5. **No database** — Pure static portfolio with server-side email dispatch only. Content is hardcoded in components; projects page is a placeholder.

6. **View Transitions API** — Page navigation uses the View Transitions API for slide animations (forward: right-to-left, back: left-to-right). Degrades gracefully on unsupported browsers.

7. **Dark mode via system preference** — `darkMode: 'media'` in Tailwind config. No toggle; respects `prefers-color-scheme`. Accent color is purple-600.

8. **Turnstile CAPTCHA** — Bot protection on the contact form. Server verifies the token before dispatching email. If the secret key is absent in dev, verification is skipped — form still works for testing.

---

## Known Issues & Tech Debt

### Bugs

| Issue | File | Impact |
|-------|------|--------|
| Cookie banner flashes on load even when consent was already given | `CookieBanner.tsx:26`, `AnalyticsProvider.tsx:6-7` | UX annoyance; 1s delay partially masks it |
| Back-navigation page transition direction may not animate correctly | `routes/projects.tsx:117-129` | Cosmetic only |
| Timer leaks possible if CTASection unmounts mid-submission | `CTASection.tsx:81-90` | Low risk; two `setTimeout` without full cleanup |

### Tech Debt

| Issue | File | Fix |
|-------|------|-----|
| `TOTAL_BACKGROUNDS = 1` hardcoded | `hooks/useBackground.ts:7` | Must be updated manually when adding new background images |
| Email sender (`hello@paolocontessi.me`) hardcoded | `routes/api.contact.ts:115` | Move to `CONTACT_EMAIL_FROM` env var |
| Basic email regex rejects valid addresses like `user+tag@domain.com` | `routes/api.contact.ts:85` | Replace with `zod` or `email-validator` library |
| `console.error` calls leak internals in production | `routes/api.contact.ts:17,37,98,107,125,134` | Use environment-aware logger |
| Intersection Observer duplicated across 4 components | `CTASection`, `PhilosophySection`, `MottoSection`, `HeroSection` | Extract `useIntersectionObserver` custom hook |
| `localStorage` accessed without try/catch | `CookieBanner.tsx:20,32,39`, `AnalyticsProvider.tsx:6` | Wrap in try/catch for private-browsing compatibility |
| Silent success when `RESEND_API_KEY` is missing in production | `routes/api.contact.ts:97-102` | Fail fast on startup if required env vars absent |

### Missing Infrastructure

- **No tests** — Vitest and Playwright are planned but not set up
- **No error tracking** — Only console logs (no Sentry etc.)
- **No rate limiting** on contact form — spam risk if traffic grows

---

## Static Assets

| Asset | Path | Notes |
|-------|------|-------|
| Profile photo | `public/images/avatar.jpeg` | Used in MottoSection |
| Background image | `public/images/bkg/bkg-1.jpg` | Only 1 exists; `TOTAL_BACKGROUNDS` must match count |
| Favicons | `public/favicon.svg`, `favicon.ico`, `favicon-32.png`, `favicon-192.png` | Multiple formats for browser compatibility |
| Apple touch icon | `public/apple-touch-icon.png` | iOS home screen |
| robots.txt | `public/robots.txt` | Allows all crawlers |
| sitemap.xml | `public/sitemap.xml` | Static sitemap; update manually when adding routes |

**Adding background images:** drop files as `bkg-2.jpg`, `bkg-3.jpg`, etc. into `public/images/bkg/`, then update `TOTAL_BACKGROUNDS` in `app/hooks/useBackground.ts:7`.

---

## SEO & Structured Data

- OpenGraph and Twitter meta tags set in each route's `meta()` export
- `root.tsx` injects JSON-LD structured data: `Person` schema + `WebSite` schema
- `public/sitemap.xml` — static, must be updated manually when routes change
- `public/robots.txt` — allows all crawlers

---

## Session Log

### 2026-04-24 — Initial handoff documentation

**Done:**
- Comprehensive HANDOFF.md created from full codebase audit

**In Progress:**
- Nothing actively in flight

**Next Steps:**
- Set up Vitest for unit tests (start with `api.contact.ts` email validation and `useBackground` hook)
- Set up Playwright for E2E (contact form flow, cookie consent banner)
- Replace Projects page placeholder with real project content
- Extract `useIntersectionObserver` custom hook to reduce duplication
- Add startup env var validation to fail fast in production when required vars are missing

**Blockers / Open Questions:**
- Projects page content: what projects should be listed and in what format?
- Should the Projects section use markdown files (as CLAUDE.md describes `/lab/projects/`) or remain hardcoded? The `/lab/projects/` directory does not yet exist.
