# Site Layout Brief — portfolio-v2 (KKD-17, Phase 3)

Produced by `/impeccable shape "site layout brief"`. Sets the structural register for the whole site: nav, footer, content shells, container widths, section rhythm. Consumed by the Nav/Footer/PageShell `craft` passes. Every value below is a DESIGN.md token — no new tokens invented.

## 1. Feature summary

The persistent chrome and structural grid for a five-route conversion funnel (`/`, `/work`, `/blog`, `/about`, `/contact`). Recruiters and prospective clients must always see a path to Contact; peer developers must be able to move between Work/Blog/About without friction. The chrome is deliberately quiet — accent lives in the Contact button and the active-link underline, nothing else — so page content (proof, case studies, CTAs) carries the persuasion.

## 2. Primary user action

From any scroll position on any page, reach Contact in one click. The sticky nav's accent Contact button is the site's always-visible conversion exit.

## 3. Design direction

- **Color strategy: Restrained** (per PRODUCT.md — accent ≤5% of viewport; chrome gets the Contact button + active underline only). No override for this surface: layout chrome is the one place restraint IS the brand voice.
- **Scene sentence:** a hiring manager on a laptop at night, LinkedIn tab still open, deciding in 60 seconds whether this developer is worth an email — dark room, dark site, one warm amber exit sign. (Dark-only is locked; the sentence confirms it.)
- **Anchor references (Mobbin reference pass, 2026-07-19):**
  - [Linear — landing nav](https://mobbin.com/screens/887269c3-bc0d-4090-aaef-13c4462a1b53) — wordmark left, quiet text links, small single CTA right, hairline bottom border on near-black. The exact nav register.
  - [Modal — landing nav](https://mobbin.com/screens/fa75138f-7ba1-4f9e-a5a0-d1c150ffe76e) — single accent CTA as the only saturated element in dark chrome; confirms the one-accent-exit pattern.
  - [Vapi — landing nav](https://mobbin.com/screens/c960e4d4-12cc-4211-ac97-83136a5c152f) — small mono-register nav labels on dark; matches the Geist Mono label language (used sparingly — labels stay Geist Sans, mono is for metadata).
  - [FLORA — footer](https://mobbin.com/sites/sections/2ba8e617-64ad-485c-8795-08de17c5c042) and [Chronicle — footer](https://mobbin.com/sites/sections/62013f0b-73f1-4c27-83fc-c8bf21aa687c) — minimal dark footers: one band, small links, copyright + social, no column stacks. Right size for a five-page site.
  - [UGLYCASH — CTA band](https://mobbin.com/sites/sections/a61ca807-9b71-4722-90b2-4bc6a927125d) — headline + single button above the footer; the peak-end seam the footer must sit quietly under.
  - Moodboard (PRODUCT.md "Look at instead"): **brittanychiang.com** and **rauno.me** — personal sites with few links that keep them visible on mobile (no hamburger); the personal-site precedent for the mobile-nav call below.

## 4. Scope

Production-ready structural spec; breadth is site chrome + shells (Nav, Footer, PageShell), not page sections. Interactivity: shipped-quality, zero-JS chrome. This brief is the shape artifact for KKD-17's Nav build and the Phase 3 Footer/PageShell work that follows.

## 5. Layout strategy

### Nav (sticky header)

- **Structure (desktop ≥640px):** wordmark left ("Kristijan Krešić", Geist, weight 700, `--text-base`) · text links center-right (`Work` `Blog` `About`, weight 500, `--text-sm`, `--color-text-secondary`, hover → `--color-text-primary` at `--duration-fast`) · Contact button far right (primary accent button, `sm` height 32px, `--radius-md`).
- **Active link:** `aria-current="page"` + `--color-text-primary` + 2px `--color-accent` underline (`text-underline-offset` ~6px). Wordmark is the home link — `/` gets no separate nav item and no underline.
- **Height:** 64px desktop / 56px mobile (DESIGN.md Nav tokens) — implemented as `min-height` so the mobile wrap case can grow.
- **Surface:** `rgba(10, 10, 11, 0.8)` + `backdrop-filter: blur(12px)`; `position: sticky; top: 0`; z-index `--z-sticky` (200). Border-bottom `--color-border-subtle`, revealed after scroll via a CSS scroll-driven animation (`animation-timeline: scroll()`) — static always-on border as the no-support fallback. Zero JS either way.
- **Mobile behavior — WRAP, no hamburger (the call):**
  - Single row at 56px min-height: condensed wordmark left, `Work · Blog · About` links, Contact button right. Below ~360px the link group may wrap to a second line (flex-wrap; nav grows past 56px naturally).
  - Wordmark condenses below `sm` (640px) to the monogram/short mark (secondary brand mark per PRODUCT.md) so three links + Contact fit a 375px viewport inside the 24px gutters.
  - Why not hamburger: (1) three links don't earn a disclosure — hiding the funnel behind a tap costs the recruiter's 60-second scan more than it saves in chrome; (2) the hamburger would be the only JS + the largest a11y surface in the site chrome, against the zero-JS default and the Lighthouse 100 bar; (3) the personal-site register (brittanychiang, rauno) keeps links visible — hamburgers read as app chrome, an anti-reference here.
- **View transitions:** the `<header>` gets `view-transition-name: site-nav` so cross-document transitions hold the chrome visually stable while page content crossfades (nav is rebuilt per load; the named transition makes the rebuild imperceptible). Lives inside the existing `@view-transition` / reduced-motion wrapping in `global.css`.

### Footer

- **Direction:** one quiet band, FLORA/Chronicle register — not link columns (five pages can't fill them; columns read corporate).
- Border-top `--color-border-subtle`, `--color-bg-base`, `py-16 md:py-24` (DESIGN.md Footer tokens).
- Contents, single `max-w-wide` row (stacking on mobile): wordmark + one-line positioning echo (`--color-text-muted`, `--text-sm`) left; inline link echo `Work · Blog · About · Contact` (ghost links) right; below, a meta line in Geist Mono `--text-xs` `--color-text-muted`: `© <year> Kristijan Krešić · Hvar, Croatia (CET) · GitHub · LinkedIn`.
- **No accent in the footer** except link hover. The CTA band (a page section, not chrome) sits directly above it and owns the peak-end accent moment — the footer's job is to be the quiet after it.

### Content shells (PageShell)

- `PageShell` = Nav + `<main>` + Footer. `<body>` is `min-h-dvh` flex column, `<main>` is `flex-1` — short pages (Contact, 404) pin the footer to the viewport bottom.
- Width variants via the existing `Container` primitive (`px-6` gutters, 24px):
  - `content` (`--container-content`, 1200px) — default page content.
  - `reading` (`--container-reading`, 680px) — blog + case-study body.
  - `wide` (`--container-wide`, 1280px) — work grid, case-study heroes.
- **Nav and footer inner containers use `max-w-wide` (1280px)** so no page content ever outdents the chrome; content simply uses narrower containers inside it.
- One `<h1>` per page (semantic + SEO, per DESIGN.md composition rules).

### Section vertical rhythm

- The existing `Section` primitive is the site beat: `py-12 sm:py-20 lg:py-24` (48 / 80 / 96px, DESIGN.md presets). Hero and the pre-footer CTA band may extend to `lg:py-32` (128px) — the two moments that earn extra air.
- Sections separate by whitespace only — no rules/dividers between sections. Horizontal hairlines are reserved for chrome (nav bottom, footer top), which keeps the chrome legible as chrome.

## 6. Key states

- **Nav at top of page:** border-bottom invisible (or the static fallback), backdrop blur imperceptible against `bg-base`.
- **Nav after scroll:** border-subtle hairline visible; blur reads against scrolled content.
- **Active route:** exactly one link underlined per page; no underline on `/` (wordmark is home).
- **Keyboard focus:** every chrome interactive gets the surface-aware focus ring (`outline: 2px solid --color-accent; outline-offset: 2px`, `:focus-visible` only).
- **Narrow viewport (<360px):** link group wraps; nav grows; nothing truncates or overflows.
- **Reduced motion:** border-reveal animation and view transitions are already gated (`@media (prefers-reduced-motion: no-preference)` / wrapped `@view-transition`); sticky positioning and blur are static properties, unaffected.

## 7. Interaction model

- Links: standard navigation, full page loads with cross-document view transitions; hover color shift at `--duration-fast` (200ms), instant-feel per the motion psychology playbook (feedback ≤100ms perceived).
- Contact button: primary-button behavior from the Button primitive (accent bg, `--shadow-glow` on hover).
- No dropdowns, no menus, no toggle state anywhere in the chrome. The chrome has zero client-side state by design.

## 8. Content requirements

- Nav labels: `Work` `Blog` `About` `Contact` — locked, one word each, no cleverness in chrome.
- Wordmark text: `Kristijan Krešić` (full, ≥640px) / monogram mark (<640px).
- Footer positioning echo: reuse the hero sub line register — one line, no new copy invented here (final line via the copywriting lane when Footer is crafted).
- Footer meta: `© <build-year> Kristijan Krešić`, `Hvar, Croatia (CET)`, GitHub + LinkedIn links.

## 9. Recommended references (for the craft passes)

- `layout.md` — nav/footer spacing precision.
- `animate.md` — the border-reveal scroll animation + view-transition naming (Phase 8 revisits).
- `audit.md` — after Nav lands: focus order, `aria-current`, contrast of secondary link text on the blurred surface.

## 10. Open questions

None blocking. Two decisions asserted above that the main session should record on KKD-17: the **wrap (no-hamburger) mobile nav** and the **monogram wordmark condensation <640px** (extends the secondary-mark usage list in PRODUCT.md by one surface).
