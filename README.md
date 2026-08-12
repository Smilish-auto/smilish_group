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
  (site)/                  Route group for the public site — its own root layout
    layout.tsx               Navbar, Footer, site-wide metadata
    page.tsx                 Homepage
    about/                    About page (story, milestones, mission, vision, values)
    contact/                  Contact page + form
    fashion/
      page.tsx                Fashion hub (hero, categories, featured, custom design, work)
      products/                Product listing with category filter
      product/[slug]/           Product detail page
      projects/                 Fashion project gallery
    automation/
      page.tsx                AI Automation hub
      services/                 Service listing
      service/[slug]/           Service detail page
      projects/                 Case studies
    real-estate/
      page.tsx                Real Estate hub (search, featured listings, services)
      properties/               Property listing with filters
      property/[slug]/          Property detail page
      inspection/                Book Inspection form
    projects/                 Unified project gallery (filter by branch)
    project/[slug]/            Unified project detail page
    not-found.tsx              Custom 404
  admin/                    Route group for the admin panel — its own root layout, no public chrome
    layout.tsx                Minimal root layout (html/body only)
    login/                     Admin sign-in (Supabase Auth)
    (dashboard)/               Everything behind the sidebar — only rendered once signed in
      layout.tsx                Sidebar shell
      page.tsx                  Dashboard overview (live counts)
      fashion-products/          List, create, edit/delete — the pattern for every other module
  globals.css               Design tokens, fonts
middleware.ts             Protects /admin/* — redirects signed-out or non-admin visitors

components/               Reusable public UI: Navbar, Footer, Button, Cards, Forms, CTA, etc.
components/admin/         Admin-only UI: sidebar, image upload, product form
lib/data/                 Typed mock content powering the public pages for now
lib/supabase/             Supabase client setup (browser + server) and generated types
lib/format.ts             Currency formatting helper
supabase/schema.sql       Full database schema, RLS policies, and storage bucket setup
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

This covers **Phase 1** (the public brand website, all three branches) plus
the **foundation of Phase 2/3** — a real, working admin panel backed by
Supabase:

**Working right now:**
- Full Supabase schema (`supabase/schema.sql`) for every content type in the
  spec — fashion products & projects, automation services & projects,
  properties, inspections, leads, contact messages, media, site content —
  with Row Level Security so public visitors can only read published content
  and only signed-in admins can write.
- Admin authentication at `/admin/login`, fully separate from the public
  site (own layout, no public nav/footer), protected by `middleware.ts` —
  unauthenticated visitors and non-admin accounts are redirected out.
- A live dashboard (`/admin`) showing real counts pulled from the database.
- **Every content module has full create/edit/delete** — Fashion Products,
  Fashion Projects, Automation Services, Automation Projects (case studies),
  and Real Estate Properties — each with image upload straight to Supabase
  Storage.
- **Leads**, **Inspections**, and **Messages** — list views with inline
  status updates (and read/unread for messages) for everything submitted
  through the public site's forms.
- **Media Library** (`/admin/media`) — browse every uploaded image across
  the site, upload new ones directly, copy a public URL, or delete.
- **Settings** (`/admin/settings`) — switch the homepage hero between the
  default gradient and an uploaded photo.

**Not yet wired up:**
The public pages (`/fashion/products`, `/automation/services`,
`/real-estate/properties`, etc.) still read from the mock data in
`lib/data/` rather than the database — so anything you add in the admin
panel won't appear on the live public pages yet. That's the next piece:
swapping those pages over to read from Supabase the same way the homepage
hero now does. Say the word and I'll wire it up.

The public forms (Contact, Custom Design, Automation Audit, Inspection)
also don't save anywhere yet or send you an email — that's next too.

## Setting up the admin panel

### 1. Run the database schema

In your Supabase project, go to **SQL Editor → New query**, paste the
entire contents of `supabase/schema.sql`, and click **Run**. This creates
every table, sets up security rules, and creates the `media` storage bucket
for image uploads. Safe to re-run if needed.

### 2. Add your Supabase keys locally

Copy `.env.local.example` to `.env.local` and fill in the two values from
your Supabase project (**Project Settings → API**):

```bash
cp .env.local.example .env.local
```

`.env.local` is already in `.gitignore` — it never gets committed or pushed.

### 3. Create your first admin login

There's no public sign-up form for `/admin` on purpose. To create yourself
an account:

1. In Supabase: **Authentication → Users → Add user** — enter your email
   and a password, and confirm the email automatically.
2. Copy that user's ID (shown in the users table).
3. In **SQL Editor**, run:
   ```sql
   insert into admin_users (id, full_name) values ('paste-the-user-id-here', 'Your Name');
   ```
4. Run `npm run dev`, go to `http://localhost:3000/admin/login`, and sign in.

Repeat steps 1–3 for anyone else on your team who needs admin access.

### 4. Add the same keys to Vercel

Once this is pushed, your live site needs the same two environment
variables: in your Vercel project, go to **Settings → Environment
Variables**, add `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` with the same values as your `.env.local`,
then redeploy (**Deployments → ⋯ → Redeploy**) so the live site picks them up.

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
