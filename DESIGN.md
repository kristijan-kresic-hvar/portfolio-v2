# DESIGN — portfolio-v2

Token spec consumed by the `impeccable` skill. Mirrored in `src/styles/global.css` (`@theme {}` block) — that file is the source of truth at code level. If they ever diverge, fix the CSS first and reflect it here.

Dark only. Single amber accent. Geist + Geist Mono.

## Colors

### Backgrounds (4 elevation steps)

| Token         | Hex       | Use                                         |
| ------------- | --------- | ------------------------------------------- |
| `--bg-base`   | `#0A0A0B` | Page background                             |
| `--bg-elev-1` | `#141416` | Cards, subtle elevation                     |
| `--bg-elev-2` | `#1C1C20` | Hover states, deeper cards                  |
| `--bg-elev-3` | `#26262B` | Highest elevation — modals, popovers (rare) |

### Text (5 steps)

| Token              | Hex       | Use                                                           |
| ------------------ | --------- | ------------------------------------------------------------- |
| `--text-primary`   | `#F5F5F5` | H1, hero copy. Slightly warm — easier on eyes than pure white |
| `--text-secondary` | `#D4D4D4` | H2-H4, prominent UI                                           |
| `--text-body`      | `#A1A1A6` | Body paragraphs                                               |
| `--text-muted`     | `#8C8C8C` | Metadata, labels, captions                                    |
| `--text-disabled`  | `#5C5C62` | Disabled, decorative                                          |

**Never use pure `#FFFFFF`** — `--text-primary` is the brightest white.

### Borders

| Token              | Hex       | Use                         |
| ------------------ | --------- | --------------------------- |
| `--border-subtle`  | `#1F1F23` | Card edges, low contrast    |
| `--border-default` | `#2A2A30` | Dividers, inputs            |
| `--border-strong`  | `#3A3A3F` | Focus borders, hover states |

### Accent — amber `#F59E0B`

| Token             | Hex                     | Use                                        |
| ----------------- | ----------------------- | ------------------------------------------ |
| `--accent`        | `#F59E0B`               | Primary CTAs, focus rings, focal moments   |
| `--accent-hover`  | `#FBBF24`               | Hover state                                |
| `--accent-active` | `#D97706`               | Active / pressed                           |
| `--accent-subtle` | `rgba(245,158,11,0.10)` | Tinted backgrounds (chips, callouts)       |
| `--accent-glow`   | `rgba(245,158,11,0.20)` | Soft glow behind headshot, CTAs            |
| `--accent-text`   | `#FCD34D`               | Lighter amber for text on dark when needed |

**Accent caps at ~5% of viewport area.** Reserved for: primary CTAs, focus rings, link hover, focal hero moments, OG image highlights. Never decorative backgrounds. Never the dominant chrome color.

### Semantic (minimal)

| Token       | Hex       | Use                                             |
| ----------- | --------- | ----------------------------------------------- |
| `--success` | `#34D399` | Form success only                               |
| `--warning` | `#F59E0B` | Matches accent — warning IS the accent register |
| `--danger`  | `#F87171` | Form errors, destructive                        |
| `--info`    | `#60A5FA` | Informational toasts (rare)                     |

### Code (MDX blog + case studies)

| Token            | Hex       | Role                      |
| ---------------- | --------- | ------------------------- |
| `--code-bg`      | `#141416` | Block bg                  |
| `--code-text`    | `#F5F5F5` | Default                   |
| `--code-comment` | `#6B7280` | Comments                  |
| `--code-keyword` | `#FBBF24` | Keywords (matches accent) |
| `--code-string`  | `#86EFAC` | Strings (soft green)      |
| `--code-number`  | `#F87171` | Numbers (soft red)        |

### Contrast targets

- Body text: WCAG AA min (4.5:1)
- Large display text: AA min (3:1)
- Accent on dark: passes both
- Verify in Phase 10 a11y audit

## Typography — Geist + Geist Mono

Self-hosted via `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`. Imported at top of `src/styles/global.css`.

**Why Geist:** designed for technical/dev context, perfect register match for senior full-stack positioning. Geist Mono is best-in-class for code + section labels. Pairs cleanly with amber on dark. OFL-licensed.

### Families

| Token         | Stack                                                                |
| ------------- | -------------------------------------------------------------------- |
| `--font-sans` | `'Geist Variable', system-ui, -apple-system, 'Segoe UI', sans-serif` |
| `--font-mono` | `'Geist Mono Variable', 'JetBrains Mono', ui-monospace, monospace`   |

### Type scale

| Token            | Size                     | Use                        |
| ---------------- | ------------------------ | -------------------------- |
| `--text-xs`      | 12px                     | Metadata, tiny mono labels |
| `--text-sm`      | 14px                     | Small UI text, captions    |
| `--text-base`    | 16px                     | Body default               |
| `--text-lg`      | 18px                     | Lead body, large UI        |
| `--text-xl`      | 20px                     | Small section headers      |
| `--text-2xl`     | 24px                     | Section headers (H3)       |
| `--text-3xl`     | 32px                     | Card titles (H2)           |
| `--text-4xl`     | 40px                     | Page H1                    |
| `--text-5xl`     | 56px                     | Hero secondary             |
| `--text-6xl`     | 72px                     | Hero primary               |
| `--text-display` | `clamp(48px, 8vw, 96px)` | Hero responsive            |

### Line-heights

| Token               | Value | Use                 |
| ------------------- | ----- | ------------------- |
| `--leading-tight`   | 1.1   | Hero, large display |
| `--leading-snug`    | 1.25  | H2-H4               |
| `--leading-normal`  | 1.5   | Body, UI            |
| `--leading-relaxed` | 1.6   | Long-form blog body |

### Letter-spacing

| Token                | Value   | Use                         |
| -------------------- | ------- | --------------------------- |
| `--tracking-tighter` | -0.04em | Hero display (≥56px)        |
| `--tracking-tight`   | -0.02em | Large headings (32-48px)    |
| `--tracking-normal`  | 0       | Body, UI default            |
| `--tracking-wide`    | 0.05em  | Small mono labels, eyebrows |

### Weights

- 400 — body, paragraphs
- 500 — UI labels, chips, nav links
- 600 — sub-headlines, prominent UI
- 700 — H1, hero, CTAs

### Composition

- One H1 per page (semantic + SEO).
- Section eyebrows: mono `--text-xs` `--tracking-wide` uppercase + `--text-muted` color.
- Stack chips: mono `--text-sm` + subtle accent-tinted border.
- Inline code in body: mono at `0.9em` of surrounding text.
- Reading width (blog + case study body): max 680px.

## Spacing (4px base)

| Token        | Px  |
| ------------ | --- |
| `--space-1`  | 4   |
| `--space-2`  | 8   |
| `--space-3`  | 12  |
| `--space-4`  | 16  |
| `--space-5`  | 20  |
| `--space-6`  | 24  |
| `--space-8`  | 32  |
| `--space-10` | 40  |
| `--space-12` | 48  |
| `--space-16` | 64  |
| `--space-20` | 80  |
| `--space-24` | 96  |
| `--space-32` | 128 |

### Section padding presets

- Mobile (<640): `py-12` (48px)
- Tablet (640–1024): `py-20` (80px)
- Desktop (≥1024): `py-24` to `py-32` (96–128px)

### Container max-widths

- Reading (blog body): 680px
- Default page content: 1200px
- Wide (work grid, case study hero): 1280px

## Radius

| Token           | Value  | Use                               |
| --------------- | ------ | --------------------------------- |
| `--radius-none` | 0      | —                                 |
| `--radius-sm`   | 4px    | Chips, small buttons, inline code |
| `--radius-md`   | 8px    | Cards, inputs, buttons            |
| `--radius-lg`   | 12px   | Large cards, modals               |
| `--radius-xl`   | 16px   | Hero blocks, featured cards       |
| `--radius-2xl`  | 24px   | Full-bleed feature panels (rare)  |
| `--radius-full` | 9999px | Pills, avatars, round buttons     |

## Shadows / elevation

Drop shadows look weak on dark. Replace with subtle borders for elevation tiers, accent glow for focal CTAs, inner highlights for tactile cards.

```css
--shadow-card: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 0 0 1px var(--border-subtle);
--shadow-card-hover: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 0 0 1px var(--border-default);
--shadow-elevated:
  0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 0 0 1px var(--border-strong),
  0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-glow: 0 0 40px var(--accent-glow);
--shadow-glow-strong: 0 0 60px rgba(245, 158, 11, 0.4);
--shadow-focus-ring: 0 0 0 2px var(--bg-base), 0 0 0 4px var(--accent);
```

## Motion

### Durations

| Token                   | Value | Use                                       |
| ----------------------- | ----- | ----------------------------------------- |
| `--duration-instant`    | 100ms | —                                         |
| `--duration-fast`       | 200ms | Hover state transitions                   |
| `--duration-normal`     | 300ms | Standard UI                               |
| `--duration-slow`       | 500ms | Card reveal, prominent micro-interactions |
| `--duration-deliberate` | 800ms | Hero reveal, page transitions             |

### Easings

| Token             | Curve                               | Use                                    |
| ----------------- | ----------------------------------- | -------------------------------------- |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)`      | Default UI                             |
| `--ease-out`      | `cubic-bezier(0.16, 1, 0.3, 1)`     | Entrances, reveals                     |
| `--ease-in`       | `cubic-bezier(0.7, 0, 0.84, 0)`     | Exits                                  |
| `--ease-bounce`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-interactions (sparingly) |

### Framer Motion springs

Defined in `src/lib/motion/springs.ts`:

```ts
export const gentle = { type: 'spring', stiffness: 100, damping: 20 };
export const snappy = { type: 'spring', stiffness: 300, damping: 30 };
export const bouncy = { type: 'spring', stiffness: 400, damping: 17 };
```

### Reduced motion

- Wrap entrance animations in `@media (prefers-reduced-motion: no-preference)` OR use Motion's `useReducedMotion` hook.
- Page transitions degrade to opacity-only crossfade when reduced.
- Lenis smooth scroll disabled when `prefers-reduced-motion: reduce`.

## Breakpoints (mobile-first)

| Token | Min-width | Use                                   |
| ----- | --------- | ------------------------------------- |
| `sm`  | 640px     | Small tablets, large phones landscape |
| `md`  | 768px     | Tablets                               |
| `lg`  | 1024px    | Small desktop / laptop                |
| `xl`  | 1280px    | Desktop                               |
| `2xl` | 1536px    | Wide desktop                          |

### Responsive type drops

- Hero `--text-display` uses `clamp(48px, 8vw, 96px)` — handles itself.
- H1 page titles: `text-4xl md:text-5xl` (40 → 56).
- H2 section headers: `text-2xl md:text-3xl` (24 → 32).
- Body stays 16px across breakpoints.

## Z-index

| Token          | Value | Layer                   |
| -------------- | ----- | ----------------------- |
| `--z-base`     | 0     | —                       |
| `--z-elevated` | 10    | Raised cards on hover   |
| `--z-dropdown` | 100   | Nav dropdowns, popovers |
| `--z-sticky`   | 200   | Sticky nav backdrop     |
| `--z-overlay`  | 300   | Page overlays           |
| `--z-modal`    | 400   | Modals, dialogs         |
| `--z-toast`    | 500   | Toasts, notifications   |
| `--z-max`      | 9999  | Emergency override only |

## Components

### Button

- Height: `sm=32` `md=40` `lg=48` `xl=56` (xl reserved for primary hero CTA)
- Horizontal padding: `sm=12` `md=16` `lg=20` `xl=24`
- Radius: `--radius-md` (8px)
- Primary CTA: `--accent` bg + `--bg-base` text + `--shadow-glow` on hover
- Secondary CTA: transparent bg + `--border-default` border + `--text-primary` text
- Ghost: no bg / border + `--text-secondary` text + underline on hover

### Input / form field

- Height: `40` (md) / `48` (lg)
- Background: `--bg-elev-1`
- Border: `--border-default` → `--accent` on focus
- Radius: `--radius-md`
- Padding: 12–16px horizontal
- Placeholder: `--text-muted`

### Card

- Background: `--bg-base` (or `--bg-elev-1` for elevated)
- Border: `--border-subtle`
- Padding: 24–32px
- Radius: `--radius-lg` (12px)
- Hover: `--border-default` + `--shadow-card-hover`

### Chip (stack tags, metadata)

- Height: 28px
- Padding: 4px 10px
- Background: `--accent-subtle` for accent-coded, `--bg-elev-1` for neutral
- Border: `--border-subtle`
- Font: mono `--text-sm` `--tracking-wide`
- Radius: `--radius-full`

### Nav

- Height: 64px desktop / 56px mobile
- Background: `rgba(10, 10, 11, 0.8)` + `backdrop-filter: blur(12px)`
- Border-bottom: `--border-subtle` (visible after scroll)
- Z-index: `--z-sticky`

### Footer

- Height: auto
- Padding: `py-16 md:py-24`
- Border-top: `--border-subtle`
- Background: `--bg-base`

### Focus ring

- 2px solid `--accent`, 2px offset from element bg
- Visible only on `:focus-visible` (keyboard nav)
- Mandatory on every interactive element

## Implementation notes

Tokens live in `src/styles/global.css` inside the `@theme {}` block. Tailwind v4 generates utility classes automatically (e.g. `--color-accent` → `bg-accent` / `text-accent`).

Source-of-truth files:

- `src/styles/global.css` — `@theme {}` definitions + base reset (loaded by every page)
- `src/styles/prose.css` — MDX prose typography (created in Phase 6)
- `src/lib/motion/springs.ts` — Framer Motion spring presets
- `src/components/primitives/` — Button, Card, Chip, Input wrappers binding these tokens

## Open items (resolve before / during Phase 2)

- Headshot treatment final pick (after HeadshotPro photo arrives) — may affect hero spacing tokens
- Verify accent contrast on actual buttons in Phase 2 (eyeball test on real screens, then formal a11y audit in Phase 10)
