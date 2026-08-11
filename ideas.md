# Smilish Group — Design Direction

## Three Stylistic Approaches

### 1. Sovereign Minimalism (probability: 0.07)
Clean white canvas with deep navy structure and surgical gold accents. Inspired by top-tier African investment firms and luxury consultancies. Geometric precision, wide margins, and typographic hierarchy do all the heavy lifting.

### 2. Bold African Modernism (probability: 0.06)
Warm earth tones mixed with electric gold and deep navy. Asymmetric grid layouts inspired by Kente cloth geometry. Textured backgrounds, oversized display type, and editorial photography energy.

### 3. Prestige Navy & Gold (probability: 0.05)
Deep navy dominates as the primary canvas. Gold is used as the signature accent — borders, underlines, CTA buttons. Inspired by premium financial brands and luxury African conglomerates. Confident, authoritative, and unmistakably high-value.

---

## Chosen Approach: **Prestige Navy & Gold**

### Design Movement
Premium African Business Conglomerate — drawing from luxury financial brand aesthetics (think Goldman Sachs meets Dangote Group) with a distinctly modern African identity.

### Core Principles
1. **Navy as the canvas** — deep navy backgrounds anchor every hero and section, communicating trust and intelligence.
2. **Gold as the voice** — gold is used sparingly but powerfully: CTAs, underlines, monogram, key statistics, and hover states.
3. **Asymmetric editorial layouts** — offset grids, large typographic numbers, and diagonal section breaks prevent the "template" feeling.
4. **Purposeful whitespace** — generous padding and breathing room signal premium quality.

### Color Philosophy
- Primary Navy `#0B1F3A` — trust, intelligence, depth
- Deep Navy `#061426` — hero backgrounds, footer
- Gold `#D4AF37` — value, excellence, ambition (signature brand color)
- Soft Gold `#E6C75A` — hover states, secondary accents
- Black `#080808` — sophistication, authority
- White `#FFFFFF` — clarity, clean sections
- Light Background `#F7F8FA` — off-white content sections

### Layout Paradigm
Asymmetric split layouts: text-heavy left column paired with visual right column. Diagonal clip-path section transitions. Full-bleed navy hero with centred editorial headline. Cards use subtle gold left-border accents.

### Signature Elements
1. **SG Monogram** — bold geometric lettermark in gold on navy, used in navbar and footer
2. **Gold rule lines** — thin 2px gold horizontal dividers under headings and above section labels
3. **Offset number callouts** — large translucent navy numbers (01, 02, 03) behind section content for depth

### Interaction Philosophy
Interactions feel deliberate and weighty — not playful. Hover states reveal gold accents. CTAs scale slightly on hover. Navigation links underline with a gold sweep animation.

### Animation
- Page entrance: staggered fade-up (opacity 0→1, translateY 20px→0, 400ms ease-out, 60ms stagger)
- Navbar: transparent over hero → navy/90 backdrop-blur on scroll
- CTA buttons: scale(0.97) on active, 160ms ease-out
- Card hover: translateY(-4px) + gold border-left intensify, 200ms ease-out
- Section reveals: IntersectionObserver-triggered fade-up

### Typography System
- Display: **Playfair Display** (serif) — headlines, hero text, section titles
- Body: **DM Sans** (sans-serif) — body copy, navigation, labels
- Monospace accent: **DM Mono** — statistics, codes, small caps labels
- Scale: 12/14/16/18/20/24/32/40/48/64/80px
- Weight hierarchy: 400 body → 500 medium → 600 semibold → 700 bold → 800 extrabold display

### Brand Essence
**Smilish Group** — Africa's next-generation business conglomerate, for ambitious individuals and businesses who demand quality, innovation, and long-term value.
Personality: **Authoritative. Ambitious. Trustworthy.**

### Brand Voice
Headlines are declarative and confident. CTAs are action-oriented without being aggressive.
- Example headline: "Fashion. Technology. Real Estate. One Group."
- Example CTA: "Work With Smilish"
- Banned phrases: "Welcome to our website", "Get started today", "We are the best"

### Wordmark & Logo
**SG** — bold geometric sans-serif monogram with a gold diagonal slash between S and G. The S and G share equal weight; the slash is the brand's signature mark of intersection (fashion × tech × real estate).

### Signature Brand Color
**Gold `#D4AF37`** — unmistakably Smilish.

---

## Style Decisions
- Navbar transitions from transparent (over dark hero) to `#0B1F3A/95 backdrop-blur` on scroll
- Section labels use small-caps DM Mono in gold before headings
- All primary CTAs use gold background with deep navy text
- Footer is always deep navy `#061426` with gold monogram

## Style Decisions (from review)
- Composition rule: every page must include at least one asymmetric editorial moment using offset media, a large numeric callout, overlap, or a diagonal/slash-inspired transition; standard centered card grids may support the page but must not define it.
- Imagery rule: Smilish visuals must feel African-premium and business-specific — African tailoring and identity for fashion, Lagos/Abuja investment-grade property for real estate, and intelligent operational systems for automation — never generic stock catalog imagery.
- Gold rule: `#D4AF37` is a precision prestige accent for CTAs, rules, key words, prices, and numerals; large gold background fields are rare campaign moments, not a default section treatment.
- Section headings in key sections are left-aligned with a secondary descriptor, not centered, to create editorial asymmetry.
- The SG diagonal slash motif is carried into CSS utilities (`.gold-slash`, `.editorial-offset`) for use in dividers and section breaks.
