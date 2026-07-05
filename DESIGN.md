# DESIGN — portfolio-v2

Token spec consumed by the `impeccable` skill. Encoded into `src/styles/global.css` (`@theme {}` block) by KKD-6/7/8/9 — that file becomes the source of truth at code level. If they ever diverge, fix the CSS first and reflect it here.

Dark only. Single amber accent. Geist + Geist Mono.

## Canonical token convention (LOCKED — KKD-5)

**Tailwind v4 `@theme` namespaces are the source of truth.** Every token below uses a reserved Tailwind v4 namespace, because Tailwind v4 only auto-generates utility classes from these namespaces — raw names (`--bg-base`, `--space-4`, `--accent`) generate nothing:

- `--color-*` — all colors (backgrounds, text, borders, accent, semantic, code)
- `--text-*` — font sizes
- `--font-*` — font families
- `--spacing-*` — spacing scale
- `--radius-*` — border radii
- `--shadow-*` — shadows / elevation
- `--leading-*` / `--tracking-*` — line-height / letter-spacing
- `--ease-*` / `--duration-*` — motion easings / durations

**Values are reconciled to the vault `design-system.md` spec** (`01 - Projects/portfolio-v2/design-system.md`) — the richer 4-step bg / 5-step text / 3-border / code / accent-subtle+accent-text scale — plus the Phase 2 **color-sweep** refinements: `--color-text-muted` = `#8E8E8E`; `--color-accent-subtle` = `rgba(245,158,11,0.13)`. Locked brand decisions carry over unchanged: dark-only, single amber `#F59E0B` (hover `#FBBF24`, active `#D97706`), Geist + Geist Mono.

**KKD-6/7/8/9 encode these tokens into `global.css @theme`** (colors, typography, spacing/radius/shadow, motion). This doc is what those tickets cite.

> **Status:** the token spec below is now **locked** (KKD-5) and being encoded into `src/styles/global.css @theme` across KKD-6/7/8/9. Before those land, `global.css` still holds only Phase-1 placeholder tokens — until a ticket encodes a given group, don't assume a token named here resolves in CSS.
>
> Non-`@theme` scales (z-index, breakpoints, component tokens) keep their descriptive form — Tailwind v4 provides `--breakpoint-*` natively and z-index is a plain custom-property set, not a utility-generating namespace.

## Colors

All color tokens use the `--color-*` namespace (`--color-accent` → `bg-accent` / `text-accent` / `border-accent`).

### Backgrounds (4 elevation steps)

| Token               | Hex       | Use                                         |
| ------------------- | --------- | ------------------------------------------- |
| `--color-bg-base`   | `#0A0A0B` | Page background                             |
| `--color-bg-elev-1` | `#141416` | Cards, subtle elevation                     |
| `--color-bg-elev-2` | `#1C1C20` | Hover states, deeper cards                  |
| `--color-bg-elev-3` | `#26262B` | Highest elevation — modals, popovers (rare) |

### Text (5 steps)

| Token                    | Hex       | Use                                                           |
| ------------------------ | --------- | ------------------------------------------------------------- |
| `--color-text-primary`   | `#F5F5F5` | H1, hero copy. Slightly warm — easier on eyes than pure white |
| `--color-text-secondary` | `#D4D4D4` | H2-H4, prominent UI                                           |
| `--color-text-body`      | `#A1A1A6` | Body paragraphs                                               |
| `--color-text-muted`     | `#8E8E8E` | Metadata, labels, captions (color-sweep: was `#8C8C8C`)       |
| `--color-text-disabled`  | `#5C5C62` | Disabled, decorative                                          |

**Never use pure `#FFFFFF`** — `--color-text-primary` is the brightest white.

### Borders

| Token                    | Hex       | Use                         |
| ------------------------ | --------- | --------------------------- |
| `--color-border-subtle`  | `#1F1F23` | Card edges, low contrast    |
| `--color-border-default` | `#2A2A30` | Dividers, inputs            |
| `--color-border-strong`  | `#3A3A3F` | Focus borders, hover states |

### Accent — amber `#F59E0B`

| Token                   | Value                   | Use                                          |
| ----------------------- | ----------------------- | -------------------------------------------- |
| `--color-accent`        | `#F59E0B`               | Primary CTAs, focus rings, focal moments     |
| `--color-accent-hover`  | `#FBBF24`               | Hover state                                  |
| `--color-accent-active` | `#D97706`               | Active / pressed                             |
| `--color-accent-subtle` | `rgba(245,158,11,0.13)` | Tinted backgrounds (color-sweep: was `0.10`) |
| `--color-accent-glow`   | `rgba(245,158,11,0.20)` | Soft glow behind headshot, CTAs              |
| `--color-accent-text`   | `#FCD34D`               | Lighter amber for text on dark when needed   |

**Accent caps at ~5% of viewport area.** Reserved for: primary CTAs, focus rings, link hover, focal hero moments, OG image highlights. Never decorative backgrounds. Never the dominant chrome color.

### Semantic (minimal)

| Token             | Hex       | Use                                             |
| ----------------- | --------- | ----------------------------------------------- |
| `--color-success` | `#34D399` | Form success only                               |
| `--color-warning` | `#F59E0B` | Matches accent — warning IS the accent register |
| `--color-danger`  | `#F87171` | Form errors, destructive                        |
| `--color-info`    | `#60A5FA` | Informational toasts (rare)                     |

### Code (MDX blog + case studies)

| Token                  | Hex       | Role                      |
| ---------------------- | --------- | ------------------------- |
| `--color-code-bg`      | `#141416` | Block bg                  |
| `--color-code-text`    | `#F5F5F5` | Default                   |
| `--color-code-comment` | `#6B7280` | Comments                  |
| `--color-code-keyword` | `#FBBF24` | Keywords (matches accent) |
| `--color-code-string`  | `#86EFAC` | Strings (soft green)      |
| `--color-code-number`  | `#F87171` | Numbers (soft red)        |

### Contrast targets

- Body text: WCAG AA min (4.5:1)
- Large display text: AA min (3:1)
- Accent on dark: passes both
- Verify in Phase 10 a11y audit

## Typography — Geist + Geist Mono

Self-hosted via `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`. Imported at top of `src/styles/global.css`.

**Why Geist:** designed for technical/dev context, perfect register match for senior full-stack positioning. Geist Mono is best-in-class for code + section labels. Pairs cleanly with amber on dark. OFL-licensed.

### Families

Font families use the `--font-*` namespace (`--font-sans` → `font-sans`).

| Token         | Stack                                                                |
| ------------- | -------------------------------------------------------------------- |
| `--font-sans` | `'Geist Variable', system-ui, -apple-system, 'Segoe UI', sans-serif` |
| `--font-mono` | `'Geist Mono Variable', 'JetBrains Mono', ui-monospace, monospace`   |

### Type scale

Font sizes use the `--text-*` namespace (`--text-xl` → `text-xl`).

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

Line-heights use the `--leading-*` namespace (`--leading-snug` → `leading-snug`).

| Token               | Value | Use                 |
| ------------------- | ----- | ------------------- |
| `--leading-tight`   | 1.1   | Hero, large display |
| `--leading-snug`    | 1.25  | H2-H4               |
| `--leading-normal`  | 1.5   | Body, UI            |
| `--leading-relaxed` | 1.6   | Long-form blog body |

### Letter-spacing

Letter-spacing uses the `--tracking-*` namespace (`--tracking-wide` → `tracking-wide`).

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
- Section eyebrows: mono `--text-xs` `--tracking-wide` uppercase + `--color-text-muted` color.
- Stack chips: mono `--text-sm` + subtle accent-tinted border.
- Inline code in body: mono at `0.9em` of surrounding text.
- Reading width (blog + case study body): max 680px.

## Spacing (4px base)

Spacing uses the `--spacing-*` namespace (`--spacing-4` → `p-4` / `gap-4` / `m-4`).

| Token          | Px  |
| -------------- | --- |
| `--spacing-1`  | 4   |
| `--spacing-2`  | 8   |
| `--spacing-3`  | 12  |
| `--spacing-4`  | 16  |
| `--spacing-5`  | 20  |
| `--spacing-6`  | 24  |
| `--spacing-8`  | 32  |
| `--spacing-10` | 40  |
| `--spacing-12` | 48  |
| `--spacing-16` | 64  |
| `--spacing-20` | 80  |
| `--spacing-24` | 96  |
| `--spacing-32` | 128 |

### Section padding presets

- Mobile (<640): `py-12` (48px)
- Tablet (640–1024): `py-20` (80px)
- Desktop (≥1024): `py-24` to `py-32` (96–128px)

### Container max-widths

- Reading (blog body): 680px
- Default page content: 1200px
- Wide (work grid, case study hero): 1280px

## Radius

Radii use the `--radius-*` namespace (`--radius-md` → `rounded-md`).

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

Shadows use the `--shadow-*` namespace (`--shadow-card` → `shadow-card`). Drop shadows look weak on dark. Replace with subtle borders for elevation tiers, accent glow for focal CTAs, inner highlights for tactile cards. (References to color tokens below use their `--color-*` names.)

```css
--shadow-card: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 0 0 1px var(--color-border-subtle);
--shadow-card-hover: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 0 0 1px var(--color-border-default);
--shadow-elevated:
  0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 0 0 1px var(--color-border-strong),
  0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-glow: 0 0 40px var(--color-accent-glow);
--shadow-glow-strong: 0 0 60px rgba(245, 158, 11, 0.4);
--shadow-focus-ring: 0 0 0 2px var(--color-bg-base), 0 0 0 4px var(--color-accent);
```

## Motion

### Durations

Durations use the `--duration-*` namespace.

| Token                   | Value | Use                                       |
| ----------------------- | ----- | ----------------------------------------- |
| `--duration-instant`    | 100ms | —                                         |
| `--duration-fast`       | 200ms | Hover state transitions                   |
| `--duration-normal`     | 300ms | Standard UI                               |
| `--duration-slow`       | 500ms | Card reveal, prominent micro-interactions |
| `--duration-deliberate` | 800ms | Hero reveal, page transitions             |

### Easings

Easings use the `--ease-*` namespace.

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

Tailwind v4 exposes these natively via the `--breakpoint-*` namespace; the defaults below match Tailwind's stock scale — no override needed.

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

Plain custom properties (not a utility-generating `@theme` namespace) — referenced directly in component styles.

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

Component tokens reference the `--color-*`, `--radius-*`, and `--shadow-*` tokens above.

### Button

- Height: `sm=32` `md=40` `lg=48` `xl=56` (xl reserved for primary hero CTA)
- Horizontal padding: `sm=12` `md=16` `lg=20` `xl=24`
- Radius: `--radius-md` (8px)
- Primary CTA: `--color-accent` bg + `--color-bg-base` text + `--shadow-glow` on hover
- Secondary CTA: transparent bg + `--color-border-default` border + `--color-text-primary` text
- Ghost: no bg / border + `--color-text-secondary` text + underline on hover

### Input / form field

- Height: `40` (md) / `48` (lg)
- Background: `--color-bg-elev-1`
- Border: `--color-border-default` → `--color-accent` on focus
- Radius: `--radius-md`
- Padding: 12–16px horizontal
- Placeholder: `--color-text-muted`

### Card

- Background: `--color-bg-base` (or `--color-bg-elev-1` for elevated)
- Border: `--color-border-subtle`
- Padding: 24–32px
- Radius: `--radius-lg` (12px)
- Hover: `--color-border-default` + `--shadow-card-hover`

### Chip (stack tags, metadata)

- Height: 28px
- Padding: 4px 10px
- Background: `--color-accent-subtle` for accent-coded, `--color-bg-elev-1` for neutral
- Border: `--color-border-subtle`
- Font: mono `--text-sm` `--tracking-wide`
- Radius: `--radius-full`

### Nav

- Height: 64px desktop / 56px mobile
- Background: `rgba(10, 10, 11, 0.8)` + `backdrop-filter: blur(12px)`
- Border-bottom: `--color-border-subtle` (visible after scroll)
- Z-index: `--z-sticky`

### Footer

- Height: auto
- Padding: `py-16 md:py-24`
- Border-top: `--color-border-subtle`
- Background: `--color-bg-base`

### Focus ring

- 2px solid `--color-accent`, 2px offset from element bg
- Visible only on `:focus-visible` (keyboard nav)
- Mandatory on every interactive element

## Implementation notes

Tokens live in `src/styles/global.css` inside the `@theme {}` block. Tailwind v4 generates utility classes automatically from the reserved namespaces above (e.g. `--color-accent` → `bg-accent` / `text-accent`; `--spacing-4` → `p-4`; `--radius-md` → `rounded-md`). Raw names outside these namespaces generate no utilities — that is why KKD-5 locked the `--color-*` / `--text-*` / `--font-*` / `--spacing-*` / `--radius-*` / `--shadow-*` / `--leading-*` / `--tracking-*` / `--ease-*` / `--duration-*` convention.

Source-of-truth files:

- `src/styles/global.css` — `@theme {}` definitions + base reset (loaded by every page)
- `src/styles/prose.css` — MDX prose typography (created in Phase 6)
- `src/lib/motion/springs.ts` — Framer Motion spring presets
- `src/components/primitives/` — Button, Card, Chip, Input wrappers binding these tokens

## Open items (resolve before / during Phase 2)

- Headshot treatment final pick (after HeadshotPro photo arrives) — may affect hero spacing tokens
- Verify accent contrast on actual buttons in Phase 2 (eyeball test on real screens, then formal a11y audit in Phase 10)
