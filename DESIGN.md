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
- `--ease-*` — motion easings
- `--duration-*` — motion durations. **Not a utility namespace** — raw custom properties, referenced as `duration-(--duration-fast)`. See § Motion → Durations.

**Values are reconciled to the vault `design-system.md` spec** (`01 - Projects/portfolio-v2/design-system.md`) — the richer 4-step bg / 5-step text / 3-border / code / accent-subtle+accent-text scale — plus the Phase 2 **color-sweep** refinements: `--color-text-muted` = `#8E8E8E`; `--color-accent-subtle` = `rgba(245,158,11,0.13)`. Locked brand decisions carry over unchanged: dark-only, single amber `#F59E0B` (hover `#FBBF24`, active `#D97706`), Geist + Geist Mono.

**KKD-6/7/8/9 encode these tokens into `global.css @theme`** (colors, typography, spacing/radius/shadow, motion). This doc is what those tickets cite.

> **Status:** the token spec below is **locked and fully encoded** into `src/styles/global.css @theme` (landed in PR #24, incl. the color-sweep refinements). `global.css` is the code-level source of truth; this doc mirrors it.
>
> Non-`@theme` scales (z-index, breakpoints, component tokens) keep their descriptive form — Tailwind v4 provides `--breakpoint-*` natively and z-index is a plain custom-property set, not a utility-generating namespace.

## Design register & elevation bar (LOCKED — 2026-07-20, KKD-30 rescope)

Origin: the Phase-4 landing shipped six AC-compliant sections that read "dead, plain, templated" (KK verdict on live review, 2026-07-20). Root cause: craft passes ran in the default quiet register and tickets measured only compliance (locked copy, zero JS, tokens) — nothing measured distinctiveness. This section is the durable fix. **It applies to EVERY new surface** — Phase 5 case studies, Phase 6 blog, Phase 7 About/Contact, post-launch sections — not just the landing.

Rules for every new page/section craft pass:

- **Bolder direction by default** — run impeccable's bolder register for new surfaces; "quiet" is reserved for deliberately quiet bands (footer), not the site's voice.
- **One signature moment per section** — scale contrast, asymmetry, oversized numeral/eyebrow, band treatment, distinctive border/background. A section that reads as "same card stack as its neighbor" fails.
- **Accent presence at every scroll depth** — amber appears deliberately (eyebrows, numerals, key stats, quote marks, hover states, band edges) in every viewport-height of scroll. Never a full screen without it.
- **Hierarchy contrast** — section headers carry the hero's type-scale drama; mono meta-rows are seasoning, not the default voice.
- **Imagery earns proof surfaces** — work cards and case studies lead with real product imagery (harvest → astro:assets), never text-only slabs.
- **Layout tells a story, not a résumé** — sections are never centered text columns stacked like an A4 CV (the failure mode: 2026-07-20 HowIWork verdict "centered, plain text, looks like a CV sheet"). Vary composition per section: split/offset layouts, asymmetry, elements crossing section boundaries, content anchored off-axis. The page reads as a designed narrative with pacing, not a document.
- **Iconography is welcome** — inline SVG icons (consistent stroke style, token colors via `currentColor`, hand-placed — no icon font, no icon package) wherever they add scanability: capability cards, process steps, chip group labels, CTA affordances. Decorative-only icons get `aria-hidden`.
- **Static ≠ inert — interaction floor** — every interactive element ships a designed hover/focus treatment, and CSS-level interactivity (hover reveals, `details/summary`, CSS scroll-driven effects inside the reduced-motion rules) is in-scope for every craft pass NOW. **Script-driven interaction effects are also in-scope when the design needs them** (policy KK 2026-07-20 — plain gated `<script>` tags, progressive enhancement, Lighthouse 100 governs; see root `CLAUDE.md` § Interactivity rules; first example: hero constellation cursor-reveal). Phase 8 owns the choreographed motion PASS (staggers, arrival reveals via the `motion` package), not a monopoly on scripts. "No motion yet" is not license for a lifeless surface.
- **Bold serves the funnel, never fights it** — this site stays conversion-first (PRODUCT.md KPI: visitor → contact). Every signature moment is a salience decision: visual energy points at what the section wants the visitor to read or click next (outcome lines, proof, CTAs) — attention is a budget, spend it on the conversion path. Run the `marketing-psychology` skill alongside craft for section-level choices (social-proof prominence, anchoring on outcome metrics, directional cues toward CTAs, objection-handling placement). Boring loses the visitor before psychology can work; decoration that doesn't aim at the funnel is equally banned.
- **Definition of done:** AC-compliance alone ≠ done. The screenshot test — _would a designer screenshot this section?_ — is part of the bar, judged at the six locked widths (§ All-viewport rule).

**Ticket-authoring rule:** every UI ticket's Acceptance Criteria must include a design-ambition criterion (signature moment + accent presence + screenshot judgment) alongside compliance checks. An agent that satisfies compliance AC but ships a flat surface has not finished the ticket.

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

Encoded in the Tailwind v4 `--container-*` namespace (`--container-reading` → `max-w-reading`).

| Token                 | Value  | Use                        |
| --------------------- | ------ | -------------------------- |
| `--container-reading` | 680px  | Blog + case study body     |
| `--container-content` | 1200px | Default page content       |
| `--container-wide`    | 1280px | Work grid, case study hero |

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
/* Focus ring is surface-aware — outline + offset, NOT a box-shadow halo. A halo
   with a fixed gap color (var(--color-bg-base)) mismatches on elevated surfaces
   (--color-bg-elev-1/2/3); an outline lets the real background show through:
     :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px } */
```

## Motion

### Durations

Durations use the `--duration-*` namespace. Unlike `--ease-*`, this is a **raw custom-property namespace, not a Tailwind utility namespace** — on Tailwind 4.3.0 `duration-fast` generates nothing (the namespace behind the `duration-*` utility is `--transition-duration-*`). Reference the tokens with v4's custom-property syntax; that is the sanctioned canonical form here:

```html
<a class="ease-standard transition-colors duration-(--duration-fast)">…</a>
```

| Token                   | Value | Utility                            | Use                                       |
| ----------------------- | ----- | ---------------------------------- | ----------------------------------------- |
| `--duration-instant`    | 100ms | `duration-(--duration-instant)`    | —                                         |
| `--duration-fast`       | 200ms | `duration-(--duration-fast)`       | Hover state transitions                   |
| `--duration-normal`     | 300ms | `duration-(--duration-normal)`     | Standard UI                               |
| `--duration-slow`       | 500ms | `duration-(--duration-slow)`       | Card reveal, prominent micro-interactions |
| `--duration-deliberate` | 800ms | `duration-(--duration-deliberate)` | Hero reveal, page transitions             |

### Easings

Easings use the `--ease-*` namespace.

| Token             | Curve                               | Use                                    |
| ----------------- | ----------------------------------- | -------------------------------------- |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)`      | Default UI                             |
| `--ease-out`      | `cubic-bezier(0.16, 1, 0.3, 1)`     | Entrances, reveals                     |
| `--ease-in`       | `cubic-bezier(0.7, 0, 0.84, 0)`     | Exits                                  |
| `--ease-bounce`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-interactions (sparingly) |

### Motion springs (vanilla `motion`)

Defined in `src/lib/motion/springs.ts` — pass as `animate()` transition options:

```ts
export const gentle = { type: 'spring', stiffness: 100, damping: 20 };
export const snappy = { type: 'spring', stiffness: 300, damping: 30 };
export const bouncy = { type: 'spring', stiffness: 400, damping: 17 };
```

### Reduced motion — HARD RULE

- **Every animation respects `prefers-reduced-motion`, no exceptions.** The `global.css` blanket override only catches CSS/WAAPI; Motion JS springs run on rAF and bypass it — each `animate()`/`inView` call self-gates on `matchMedia('(prefers-reduced-motion: reduce)')`.
- New CSS animations go inside `@media (prefers-reduced-motion: no-preference)`; the `@view-transition` rule is already wrapped.
- Reduced variant ships first; the animated version is the enhancement.

### Motion psychology (conversion playbook — locked 2026-07-17)

Motion is a conversion instrument, not decoration. Everything below operates inside the motion budget (reveals ≤400ms, opacity + small translate, content never gated) and the reduced-motion hard rule. Marginal gains on top of copy + proof — never a substitute.

1. **Motion hierarchy (saliency + isolation effect):** at rest, at most ONE element per viewport carries motion, and it must be conversion-relevant (primary CTA, or a trust signal's arrival). Peripheral vision is drawn to movement — spend that draw on the click target. Decorative elements never self-animate.
2. **Staggered reveal = guided reading order:** section children reveal in intended reading order with 40–80ms stagger, CTA last — the last thing to move is the last thing read and the best remembered (serial-position).
3. **Single-fire CTA arrival emphasis:** when a CTA band enters the viewport, the primary card gets ONE subtle amber glow sweep. Never loops — a repeated cue becomes a nag and trains banner blindness.
4. **Instant feedback = perceived craftsmanship (halo effect):** hover/press respond within `--duration-instant` (100ms). On a portfolio the meta-message IS the product — a site that feels precise transfers to "this person ships quality."
5. **Labor illusion on contact submit:** show a working state for ≥500ms even if the Action resolves faster, then a definite confirmation with the response-time line. Instant flips read as "did that even send?"; brief visible work reads as reliability.
6. **Goal-gradient on the project form:** chip selections confirm instantly (~150ms scale tick) — each answered step feels like progress and pulls toward completion.
7. **Peak-end:** the last scroll moment of every page is a mini-CTA carrying rule 3's arrival emphasis. The end of the page is the point of decision — make it the best-crafted beat.
8. **Human-warmth sequencing on the hero:** copy is readable at first paint; the headshot's amber glow fades in one beat later (~300ms delay). Faces win eye fixations — let the positioning headline land first, then the human warmth. **Deferred 2026-07-19 (KKD-23): the glow itself was dropped from v1 after four rejected treatments — the hero currently ships glow-less. Revisit with the Phase 8 motion pass (KKD-32); this rule governs the sequencing IF/WHEN it returns.**
9. **Banned (backfires):** looping/idle animations, attention-jacking wiggles, fake urgency or fake activity toasts ("someone just hired…"), hover-only reveals of load-bearing content, anything that delays copy. Dark-pattern motion burns the exact trust this site sells. **Scoped exception (user decision 2026-07-20, KKD-34): the hero constellation's ambient junction twinkle.** Each amber junction fires one soft sparkle on its own randomized 3–9s cycle (re-randomized per cycle — no shared rhythm, nothing blinks in sync), self-gated on `prefers-reduced-motion`. It is the hero's single ambient texture layer (counts as the hero's rule-1 element), reads as "alive," not as a nag — the ban targets synchronized attention-grabbing loops, not this. No other surface inherits this exception; any new ambient loop is a fresh deliberate decision documented here.

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

- Hero headline is sized by **wrap math per tier**, not `--text-display`'s global clamp — see the all-viewport rule below. (`--text-display` stays available for surfaces where a capped clamp genuinely fits.)
- H1 page titles: `text-4xl md:text-5xl` (40 → 56).
- H2 section headers: `text-2xl md:text-3xl` (24 → 32).
- Body stays 16px across breakpoints.

### All-viewport rule (added 2026-07-19 after the KKD-23 hero rework)

Every section must look GOOD — not merely unbroken — at **375, 768, 1024, 1280, 1440, 1920 and 2560**. (1024 added 2026-07-21: the hero wrapped into a 4-line tower at ~1024, caught by the user — in-between bands are where towers hide.) Sign-off requires an actual screenshot at each width, looked at, before the build is called done. A 1280-tuned layout that floats in a larger void is the failure this rule exists to prevent. Tower-class failures additionally require a continuous SWEEP through the breakpoint seams (≤10px steps, assert headline line-count), not just the locked widths — the failure lives between the spot-checks. Distilled from the hero's failure modes:

1. **Type fills its measure.** Size headlines by wrap math per breakpoint tier (measure the real line widths in-browser, in the production font); a display-size cap that wraps into a narrow ragged tower at wide viewports is wrong even if it "fits". Prototype fonts lie — re-measure after the real font loads (Inter-sized wrap math broke in Geist).
2. **Focal imagery scales as viewport share, not fixed px.** A 460px portrait that reads right at 1280 is a lost thumbnail at 2560; target a proportional share (hero portrait: ~35–45% of viewport width at wide tiers) with srcset tiers to match.
3. **Dark sections need background body.** A cutout (or any focal element) on flat `--color-bg-base` reads as floating in nothingness; give the background mass (offset elevation-lobe radials — non-concentric, or they read as a spotlight) and dissolve the element INTO it on every visible edge.
4. **The tablet tier (640–1024) is a real tier**, not interpolation leftovers — it gets its own sizing and field treatment pass.
5. **Gradient/pseudo layers complete their fade inside their own box** (overshoot draws rectangle seams) and must not bleed past the section (horizontal scroll at 375 — clip at the section, and verify `scrollWidth === innerWidth` at every width).
6. **Glow shapes around people are treacherous**: head-height radial = halo; masked ellipse = half-circle; amber inside a cutout's dissolve zone shines through the fading torso; silhouette-hugging light = rim glow. If a glow won't land after two treatments, ship without it and file the revisit (KKD-32).
7. **`<Picture>` always gets an explicit `width`** capping the fallback `<img>` (otherwise Astro emits the intrinsic-size original for no-srcset UAs).
8. **Utility overrides on primitives lose CSS-order battles** (`lg:py-0` vs Section's `lg:py-24`) — use the important modifier (`lg:py-0!`) or a prop, and verify the computed style, not the class list.

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

- **Surface-aware:** `outline: 2px solid var(--color-accent)` + `outline-offset: 2px` — the browser shows the real background under the gap, so it works on any elevation (never a fixed-bg box-shadow halo)
- Visible only on `:focus-visible` (keyboard nav)
- Mandatory on every interactive element

## Performance budget — Lighthouse 100 (locked 2026-07-19)

Launch bar: **100/100/100/100 mobile throttled** (performance, accessibility, best practices, SEO). Desktop 100 is not the bar — mobile throttled is. Enforcement (Lighthouse CI on PRs) + formal audit owned by Linear [KKD-14](https://linear.app/kkdev/issue/KKD-14/phase-10-lighthouse-100-budget-perfa11y-guardrails-ci-enforcement); decision record in vault `perf-budget.md`.

Structural advantage: static Astro, zero-JS default, self-hosted fonts — the site starts at ~100 and only loses points as features land. These rules stop the point loss:

- **Fonts:** `<link rel="preload">` for both Geist variable woff2 files in the base layout — import the built asset URL (Vite hashes fontsource filenames; never hardcode paths). `font-display: swap`. Metric-matched fallback (`size-adjust`) only if CLS shows up in reports.
- **Hero headshot (LCP element):** AVIF, explicit `width`/`height`, `fetchpriority="high"`, never lazy-loaded. Every other image: `loading="lazy"` + explicit dimensions (the placehold.co convention already keeps dimensions honest pre-asset).
- **JS:** the zero-JS default stands. Motion stays in per-component `<script>` tags; no site-wide script bundles. Re-adding a client framework is both a deliberate decision (root `CLAUDE.md` rule) and a Lighthouse-budget event.
- **Third-party:** Vercel Analytics (launch decision 2026-07-17) loads deferred; nothing render-blocking. Any new third-party script requires a budget check first.
- **Contrast floors (a11y 100):** `--color-text-disabled` `#5C5C62` fails AA on every surface — decorative only, never information-carrying text. `--color-text-muted` `#8E8E8E` must be re-verified ≥4.5:1 on elevated surfaces (`bg-elev-2`/`bg-elev-3`) in the Phase 10 audit. Focus rings + reduced-motion rules above are part of the same score.
- **Regression guard:** Lighthouse CI check on every PR (KKD-14) — any category below threshold fails the check; tighten threshold to 100 pre-launch.

## Implementation notes

Tokens live in `src/styles/global.css` inside the `@theme {}` block. Tailwind v4 generates utility classes automatically from the reserved namespaces above (e.g. `--color-accent` → `bg-accent` / `text-accent`; `--spacing-4` → `p-4`; `--radius-md` → `rounded-md`; `--ease-out` → `ease-out`). Raw names outside these namespaces generate no utilities — that is why KKD-5 locked the `--color-*` / `--text-*` / `--font-*` / `--spacing-*` / `--radius-*` / `--shadow-*` / `--leading-*` / `--tracking-*` / `--ease-*` convention.

**`--duration-*` is the deliberate exception** (verified on Tailwind 4.3.0, KKD-16): it is a raw custom-property namespace and auto-generates nothing — `duration-fast` is dead. Tailwind's duration utility reads `--transition-duration-*` instead. We keep the `--duration-*` token names and reference them with the custom-property syntax `duration-(--duration-fast)`, which every primitive and section already ships; renaming the tokens to `--transition-duration-*` would churn all of them for utility-name cosmetics alone.

Source-of-truth files:

- `src/styles/global.css` — `@theme {}` definitions + base reset (loaded by every page)
- `src/styles/prose.css` — MDX prose typography (created in Phase 3, KKD-19)
- `src/lib/motion/springs.ts` — Motion spring presets (vanilla `motion`)
- `src/components/primitives/` — Button, Card, Chip, Input wrappers binding these tokens

## Open items (resolve before / during Phase 2)

- Headshot treatment final pick (after HeadshotPro photo arrives) — may affect hero spacing tokens
- Verify accent contrast on actual buttons in Phase 2 (eyeball test on real screens; formal a11y audit in Phase 10 — owned by [KKD-14](https://linear.app/kkdev/issue/KKD-14/phase-10-lighthouse-100-budget-perfa11y-guardrails-ci-enforcement))
