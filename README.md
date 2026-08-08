# Smilish Group — Website (Phase 1: Public Brand Site)

This is the public-facing website for **Smilish Group**, covering all three
business branches — **Fashion**, **AI Automation**, and **Real Estate** —
built from `Smilish_Group_Business_Website_Specification.md`.

Stack: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, using
self-hosted fonts (`@fontsource`) and `lucide-react` icons. Content currently
comes from typed mock data in `lib/data/` so the whole site runs with zero
external services — see **"What's built vs. what's next"** below for how to
wire it to a real CMS/database.

## Project structure

```
app/
  layout.tsx              Root layout — Navbar, Footer, site-wide metadata
  page.tsx                Homepage
  about/                  About page (story, mission, vision, values, leadership)
  contact/                Contact page + form
  fashion/
    page.tsx              Fashion hub (hero, categories, featured, custom design, work)
    products/              Product listing with category filter
    product/[slug]/         Product detail page
    projects/               Fashion project gallery
  automation/
    page.tsx              AI Automation hub (what we automate, how it works, case studies)
    services/               Service listing
    service/[slug]/         Service detail page
    projects/               Case studies
  real-estate/
    page.tsx              Real Estate hub (search, featured listings, services)
    properties/            Property listing with filters (location/type/price/state)
    property/[slug]/        Property detail page
    inspection/             Book Inspection form
  projects/                Unified project gallery (filter by branch)
  project/[slug]/           Unified project detail page
  not-found.tsx            Custom 404

components/               Reusable UI: Navbar, Footer, Button, Cards, Forms, CTA, etc.
lib/data/                 Typed mock content: fashion.ts, automation.ts, real-estate.ts, projects.ts
lib/format.ts             Currency formatting helper
```

## Brand system

- **Colors** — Navy `#0B1F3A`, Deep Navy `#061426`, Gold `#D4AF37`, Soft Gold
  `#E6C75A`, Black `#080808`, White, Light Background `#F7F8FA` — defined as
  CSS variables in `app/globals.css`.
- **Type** — Fraunces (display/headlines), Inter (body/UI), IBM Plex Mono
  (labels, prices, data) — self-hosted via `@fontsource` so the build never
  depends on Google Fonts at build time.
- **Signature mark** — a three-bar motif (Navy / Black / Gold) representing
  the three businesses under one group, used in the nav, section headings,
  footer and CTA banners (`components/Mark.tsx`).

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint     # ESLint
```

## What's built vs. what's next

This covers **Phase 1** from the spec (the public brand website) for all
three business branches, plus the unified Projects gallery. It intentionally
does **not** include Phase 2+ (admin/CMS, database, auth, file uploads, lead
storage) — that requires real infrastructure decisions (a Postgres/Supabase
project, auth provider, storage bucket) that only you can set up with your
own credentials.

**Currently:**
- All content (products, services, properties, projects) lives in typed
  mock data in `lib/data/` — easy to read, easy to swap out.
- The Contact, Custom Design, Automation Audit and Inspection forms are
  fully built and validated client-side, but currently just show a
  confirmation message (`components/form/SubmittableForm.tsx`) — they don't
  send anywhere yet.

**To move into Phase 2/3 (CMS + lead capture), the recommended path is:**
1. Create a [Supabase](https://supabase.com) project (Postgres + Auth + Storage).
2. Model the tables from spec sections 17–23 (fashion products, properties,
   projects, leads, inspections, messages).
3. Replace the static reads in `lib/data/*.ts` with Supabase queries.
4. Turn `SubmittableForm`'s simulated submit into a real `fetch()` to a
   Next.js API route (`app/api/.../route.ts`) that writes to the database
   and (optionally) notifies you via email/WhatsApp/n8n.
5. Build `/admin` as a separate, authenticated route group (`app/admin/`)
   using Supabase Auth — keep it entirely out of the public `LINKS` array in
   `components/Navbar.tsx` per the spec's admin/public separation rule.

## Deploying

### 1. Push the code to GitHub

This folder is already a git repo with an initial commit made. From inside
the `smilish-group` folder, create a new, empty repository on GitHub (no
README/license, so it doesn't conflict with what's already committed) —
either on github.com or with the GitHub CLI:

```bash
gh repo create smilish-group --private --source=. --remote=origin
git push -u origin master
```

Or without the CLI: create the repo on github.com, then:

```bash
git remote add origin https://github.com/<your-username>/smilish-group.git
git branch -M main
git push -u origin main
```

(If you use the second option, `git branch -M main` renames the default
`master` branch to `main` before pushing — either name works, just be
consistent with what you select as the default branch on GitHub.)

### 2. Deploy to Vercel (recommended — built by the makers of Next.js)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import the `smilish-group` repository.
3. Framework preset auto-detects as **Next.js** — leave build settings as
   default (`npm run build`, output handled automatically).
4. Click **Deploy**. You'll get a live `*.vercel.app` URL in a couple of
   minutes, and every future push to `main` auto-deploys.
5. Once you have a domain (e.g. `smilishgroup.com`), add it under
   **Project → Settings → Domains** and point your DNS at Vercel per their
   on-screen instructions.

### 3. Alternative: any Node host

The app is a standard Next.js app, so it also runs on Netlify, Render,
Railway, or your own server:

```bash
npm run build
npm run start   # serves on port 3000 by default
```

Set `PORT` as needed for your host.

## Notes

- No environment variables are required yet since there's no backend —
  once you wire up Supabase (or another provider), add a `.env.local` with
  your keys and set the same variables in your host's dashboard. Never
  commit `.env.local` (already covered by `.gitignore`).
- Placeholder image blocks (labelled in navy/light-grey with the item name)
  stand in for real photography — swap them for real images via `next/image`
  once you have product/property photos or a media library.
