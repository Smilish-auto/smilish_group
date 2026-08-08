# Smilish Group Website — Deployment Guide

> **Version 1.0** | Built with React 19 + Vite + Tailwind CSS 4 + shadcn/ui

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Local Development Setup](#2-local-development-setup)
3. [Project Structure](#3-project-structure)
4. [Deploying to GitHub Pages](#4-deploying-to-github-pages)
5. [Deploying to Vercel (Recommended)](#5-deploying-to-vercel-recommended)
6. [Deploying to Netlify](#6-deploying-to-netlify)
7. [Environment Variables](#7-environment-variables)
8. [Updating Content](#8-updating-content)
9. [Adding New Pages](#9-adding-new-pages)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project Overview

Smilish Group is a static React SPA (Single Page Application) built with:

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| Tailwind CSS | 4 | Styling |
| shadcn/ui | Latest | UI components |
| Wouter | 3 | Client-side routing |
| TypeScript | 5.6 | Type safety |
| pnpm | 10 | Package manager |

**Pages included:**

| Route | Page |
|---|---|
| `/` | Homepage |
| `/about` | About Smilish Group |
| `/contact` | Contact & enquiry form |
| `/projects` | All projects with filter tabs |
| `/fashion` | Smilish Fashion landing |
| `/fashion/products` | All fashion products |
| `/fashion/product/:slug` | Product detail |
| `/fashion/custom` | Custom design order form |
| `/automation` | Smilish AI Automation landing |
| `/automation/service/:slug` | Service detail |
| `/automation/audit` | Free automation audit form |
| `/real-estate` | Smilish Real Estate landing |
| `/real-estate/properties` | All properties with filters |
| `/real-estate/property/:slug` | Property detail |
| `/real-estate/inspection` | Book inspection form |

---

## 2. Local Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **pnpm** v8 or higher — install with `npm install -g pnpm`
- **Git** — [git-scm.com](https://git-scm.com)

### Clone and Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/smilish-group.git
cd smilish-group

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

```bash
pnpm dev        # Start development server with hot reload
pnpm build      # Build for production (outputs to dist/)
pnpm preview    # Preview the production build locally
pnpm check      # Run TypeScript type checking
pnpm format     # Format code with Prettier
```

---

## 3. Project Structure

```
smilish-group/
├── client/
│   ├── index.html              # HTML entry point (fonts, meta tags)
│   ├── public/                 # Static files (favicon, robots.txt)
│   └── src/
│       ├── App.tsx             # All routes registered here
│       ├── index.css           # Global styles & brand tokens
│       ├── main.tsx            # React entry point
│       ├── components/
│       │   ├── Navbar.tsx      # Top navigation
│       │   ├── Footer.tsx      # Site footer
│       │   ├── Layout.tsx      # Page wrapper (Navbar + Footer)
│       │   └── ui/             # shadcn/ui components
│       ├── hooks/
│       │   └── useFadeUp.ts    # Scroll-triggered fade-up animation
│       ├── lib/
│       │   └── data.ts         # ALL website content (products, services, properties, projects)
│       └── pages/
│           ├── Home.tsx
│           ├── About.tsx
│           ├── Contact.tsx
│           ├── Projects.tsx
│           ├── Fashion.tsx
│           ├── FashionProducts.tsx
│           ├── FashionProduct.tsx
│           ├── FashionCustom.tsx
│           ├── Automation.tsx
│           ├── AutomationAudit.tsx
│           ├── AutomationService.tsx
│           ├── RealEstate.tsx
│           ├── RealEstateProperties.tsx
│           ├── RealEstateProperty.tsx
│           ├── RealEstateInspection.tsx
│           └── NotFound.tsx
├── DEPLOYMENT_GUIDE.md         # This file
├── ideas.md                    # Design direction document
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Deploying to GitHub Pages

GitHub Pages hosts static sites directly from a GitHub repository. This is free for public repositories.

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it `smilish-group` (or any name you prefer).
4. Set visibility to **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2 — Push the Code

```bash
# Inside your project directory:
git init
git add .
git commit -m "Initial commit: Smilish Group website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smilish-group.git
git push -u origin main
```

### Step 3 — Configure Vite for GitHub Pages

If you deploy to a subdirectory (e.g., `https://yourusername.github.io/smilish-group/`), update `vite.config.ts`:

```ts
// vite.config.ts
export default defineConfig({
  base: '/smilish-group/',   // Add this line
  // ... rest of config
});
```

If you use a custom domain (e.g., `smilishgroup.com`), keep `base: '/'`.

### Step 4 — Add GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/public'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Push any change to `main` to trigger the first deployment.
5. Your site will be live at `https://YOUR_USERNAME.github.io/smilish-group/`.

### Step 6 — Handle Client-Side Routing on GitHub Pages

GitHub Pages does not natively support SPA routing. Add a `404.html` file that redirects to `index.html`:

Create `client/public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?/' +
        l.pathname.slice(1).replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

And add this to `client/index.html` inside `<head>`:

```html
<script>
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&');
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location));
</script>
```

---

## 5. Deploying to Vercel (Recommended)

Vercel is the easiest and most reliable option for React + Vite SPAs. It handles routing automatically and provides free SSL, CDN, and preview deployments.

### Option A — Deploy via Vercel Dashboard (No CLI needed)

1. Push your code to GitHub (see Step 2 above).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New Project**.
4. Select your `smilish-group` repository.
5. Vercel auto-detects Vite. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (leave as default)
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
6. Click **Deploy**.
7. Your site is live in ~60 seconds at `https://smilish-group.vercel.app`.

### Option B — Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: smilish-group
# - Directory: ./
# - Override settings? Yes
#   - Build command: pnpm build
#   - Output directory: dist/public

# Deploy to production
vercel --prod
```

### Add a Custom Domain on Vercel

1. In the Vercel dashboard, go to your project → **Settings** → **Domains**.
2. Add your domain (e.g., `smilishgroup.com`).
3. Update your DNS records as instructed by Vercel.
4. SSL is provisioned automatically.

---

## 6. Deploying to Netlify

Netlify is another excellent option with a generous free tier.

### Via Netlify Dashboard

1. Push your code to GitHub.
2. Go to [netlify.com](https://netlify.com) and sign in.
3. Click **Add new site** → **Import an existing project**.
4. Connect your GitHub account and select the repository.
5. Configure build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`
6. Click **Deploy site**.

### Handle SPA Routing on Netlify

Create `client/public/_redirects` with:

```
/*    /index.html   200
```

This ensures all routes are served by `index.html` (required for client-side routing).

---

## 7. Environment Variables

The project uses Vite environment variables. Create a `.env` file in the project root for local development:

```env
# Analytics (optional — leave blank to disable)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# App metadata
VITE_APP_TITLE=Smilish Group
VITE_APP_ID=smilish-group
```

**Important:** Never commit `.env` to Git. Add it to `.gitignore`:

```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

On Vercel/Netlify, add environment variables through the platform dashboard under **Settings → Environment Variables**.

---

## 8. Updating Content

All website content — products, services, properties, projects, and brand information — is stored in a single file:

```
client/src/lib/data.ts
```

### Update Brand Information

Edit the `BRAND` object at the top of `data.ts`:

```ts
export const BRAND = {
  name: "Smilish Group",
  phone: "+234 000 000 0000",    // ← Update with real phone
  email: "hello@smilishgroup.com", // ← Update with real email
  whatsapp: "+234 000 000 0000",  // ← Update with real WhatsApp
  location: "Nigeria, Africa",
  socials: {
    instagram: "https://instagram.com/smilishgroup",  // ← Add real URLs
    twitter: "https://twitter.com/smilishgroup",
    linkedin: "https://linkedin.com/company/smilishgroup",
    facebook: "https://facebook.com/smilishgroup",
  },
};
```

### Add a Fashion Product

Add a new object to the `FASHION_PRODUCTS` array:

```ts
{
  id: "7",                          // Unique ID
  name: "Wedding Agbada Set",
  slug: "wedding-agbada-set",       // URL-friendly slug
  category: "African Wear",
  price: 120000,
  description: "Luxurious wedding Agbada...",
  image: "https://your-image-url.com/image.jpg",
  featured: true,                   // Shows on homepage
  status: "published",
}
```

### Add a Property

Add a new object to the `PROPERTIES` array:

```ts
{
  id: "7",
  title: "5-Bedroom Mansion",
  slug: "5-bedroom-mansion-banana-island",
  type: "House",
  transaction: "For Sale",
  price: 500000000,
  location: "Banana Island, Lagos",
  bedrooms: 5,
  bathrooms: 6,
  area: "800 sqm",
  description: "Ultra-luxury mansion...",
  features: ["Swimming Pool", "Cinema Room", "Gym"],
  image: "https://your-image-url.com/property.jpg",
  status: "Available",
  featured: true,
}
```

### Add a Project

Add a new object to the `PROJECTS` array. The `category` field controls which filter tab it appears under:

```ts
{
  id: "7",
  title: "New Project Title",
  slug: "new-project-slug",
  category: "fashion",    // "fashion" | "ai" | "realestate"
  description: "Project description...",
  image: "https://your-image-url.com/project.jpg",
  date: "2025-01-15",
  featured: false,
}
```

---

## 9. Adding New Pages

### Step 1 — Create the Page Component

Create a new file in `client/src/pages/`, for example `client/src/pages/Blog.tsx`:

```tsx
import Layout from "@/components/Layout";

export default function Blog() {
  return (
    <Layout>
      <section className="bg-[#061426] pt-32 pb-14">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-white">Blog</h1>
        </div>
      </section>
      {/* Add your page content here */}
    </Layout>
  );
}
```

### Step 2 — Register the Route

Open `client/src/App.tsx` and add the import and route:

```tsx
import Blog from "./pages/Blog";

// Inside the Router function:
<Route path="/blog" component={Blog} />
```

### Step 3 — Add to Navigation (Optional)

Open `client/src/components/Navbar.tsx` and add the link to `NAV_LINKS`:

```tsx
{ label: "Blog", href: "/blog" },
```

---

## 10. Troubleshooting

### Build fails with TypeScript errors

```bash
pnpm check    # See all TypeScript errors
```

Fix any type errors before deploying. The most common issue is a missing import or incorrect prop type.

### Images not loading after deployment

Images hosted on `/manus-storage/` are served by the Manus CDN and will continue to work after deployment. If you move to self-hosted images, upload them to a CDN (Cloudinary, Supabase Storage, or AWS S3) and update the URLs in `data.ts`.

### Routes return 404 on refresh (GitHub Pages)

Add the `404.html` redirect file described in Section 4, Step 6.

### Routes return 404 on Netlify

Add the `_redirects` file described in Section 6.

### pnpm not found

```bash
npm install -g pnpm
```

### Port 3000 already in use

```bash
pnpm dev -- --port 3001
```

---

## Phase 2 Roadmap

The specification defines six development phases. This delivery covers **Phase 1** (public brand website). The recommended next phases are:

| Phase | Description | Key Technologies |
|---|---|---|
| Phase 2 | CMS / Admin Dashboard | Supabase, Next.js API Routes |
| Phase 3 | Lead & Request Management | Supabase DB, n8n |
| Phase 4 | Commerce & Orders | Stripe, Supabase |
| Phase 5 | Advanced AI & Workflow Automation | LLM API, n8n |
| Phase 6 | Customer Accounts & Analytics | Supabase Auth, Analytics |

---

*Built by Manus AI for Smilish Group. For questions, contact hello@smilishgroup.com.*
