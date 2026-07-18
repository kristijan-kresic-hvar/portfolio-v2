# CLAUDE.md

Engineering conventions for AI coding agents working in this repo. Mirror of the source-of-truth spec in the Obsidian vault at `01 - Projects/portfolio-v2/dev-conventions.md`.

Private repo. Every change is deliberate.

## Accessibility (Phase 2+ — UI file edits)

a11y review is **manual** via `/impeccable audit` — there is no enforcement hook. The old `accessibility-agents:accessibility-lead` delegation + the `a11y-enforce-edit.sh` PreToolUse hook were **removed in the `.claude` rebuild**; do not wait on a `/tmp/a11y-reviewed-*` marker or delegate to a plugin that no longer exists. Target stays `a11y = 100` (Phase 10 Lighthouse) — run `/impeccable audit` during UI work and again at Phase 10.

## Stack

- Astro 6 (file-based routing) — `output: 'static'` w/ Vercel adapter
- TypeScript strict + `noUncheckedIndexedAccess`
- Tailwind CSS v4 (`@theme {}` block in `src/styles/global.css`)
- MDX via Astro Content Collections (`work` + `blog`)
- **No client framework** — React dropped 2026-07-17 (nothing in the spec needs client state); zero JS by default
- **Motion** (vanilla `motion` package — NOT `framer-motion`, that's the legacy name) in plain `<script>` tags + CSS scroll-driven animations; **native cross-document View Transitions** (CSS `@view-transition` in `global.css` — no `<ClientRouter />`); native scroll (Lenis dropped — smooth-scroll libs only earn their cost on choreographed scroll storytelling, which this site deliberately avoids)
- **Astro Actions** for the contact form (`src/actions/index.ts`, `accept: 'form'` + Zod) — not a hand-rolled `/api/contact` endpoint
- Geist + Geist Mono via `@fontsource-variable`
- Yarn 4 Berry (`nodeLinker: node-modules`)

## Common scripts

- `yarn dev` — dev server (localhost:4321)
- `yarn build` — production build
- `yarn preview` — preview production build
- `yarn typecheck` — `astro check`
- `yarn lint` — ESLint + astro check
- `yarn lint:fix` — ESLint with autofix
- `yarn format` — Prettier write
- `yarn format:check` — Prettier check

## Folder structure

Target structure — most of it is `.gitkeep` scaffolding until Phases 2+ land (same status caveat as ARCHITECTURE.md).

```
src/
├── actions/
│   └── index.ts         # Astro Actions (contact form: Zod + Resend)
├── components/
│   ├── primitives/      # Button, Card, Chip, Link, Section, Container
│   ├── layout/          # Nav, Footer, PageShell
│   ├── sections/        # Hero, TrustStrip, FeaturedWork, CTABand (landing)
│   └── mdx/             # MDX-only components (Callout, Image, Video, Code)
├── content/
│   ├── blog/            # MDX briefs + deep-dives
│   └── work/            # MDX case studies
├── content.config.ts    # Zod schemas for collections (Astro 6: src root, NOT content/config.ts)
├── layouts/             # RootLayout, BlogLayout, WorkLayout
├── lib/
│   ├── brief/           # AI Brief workflow (Anthropic SDK + Octokit; run by scripts/brief.ts)
│   │   ├── prompts/     # research.md, draft.md (version-controlled)
│   │   ├── generate.ts
│   │   └── github.ts
│   ├── motion/          # Spring presets, motion utilities (vanilla `motion`)
│   ├── seo/             # JSON-LD builders, OG image template
│   ├── email/           # Resend wrapper
│   └── utils/           # Generic helpers
├── pages/
│   ├── og/[slug].png.ts # Dynamic OG generator (server-runtime)
│   ├── blog/
│   ├── work/
│   ├── about.astro
│   ├── contact.astro
│   └── index.astro
├── styles/
│   ├── global.css       # @theme {} block + base reset + @view-transition
│   └── prose.css        # MDX typography
└── env.d.ts
scripts/
└── brief.ts             # Brief runner — scheduled GitHub Action + local debug (same entry)
```

## Path aliases

Always import via aliases. No deep relative paths (`../../../`).

```ts
import Button from '@/components/primitives/Button.astro';
import { generateBrief } from '@/lib/brief/generate';
import { collections } from '@/content.config';
```

## Naming

| Item                  | Convention                                    |
| --------------------- | --------------------------------------------- |
| Files                 | `kebab-case.{astro,ts,tsx}`                   |
| Components (exported) | `PascalCase`                                  |
| Types / interfaces    | `PascalCase`                                  |
| Variables / functions | `camelCase`                                   |
| Constants             | `SCREAMING_SNAKE_CASE`                        |
| CSS                   | Tailwind utilities only (`@theme` for tokens) |
| Routes                | `kebab-case.astro`                            |

## Commits — Conventional Commits, plain

Format:

```
<type>(<scope>): <imperative description ≤72 chars>

<optional body — why, not what. Wrap at 100 chars.>
```

**Types:** `feat` `fix` `refactor` `style` `chore` `docs` `perf` `test` `build` `ci`

**Scopes (whitelist in commitlint.config.js):** `setup` `tokens` `primitives` `layout` `hero` `trust-strip` `featured-work` `capabilities` `workflow` `stack-chips` `cta-band` `work` `blog` `brief-cron` `contact` `about` `seo` `motion` `a11y` `deps` `cv`

**Banned in commits:**

- ❌ `Co-Authored-By:` trailers
- ❌ `🤖 Generated with Claude Code` footers
- ❌ HEREDOC `$(cat <<'EOF' ... EOF)` wrapping
- ❌ "Generated by AI" / "Assisted by" boilerplate

**Atomicity:** one logical change per commit. If the message needs `and`, split the commit.

Enforced by `commitlint` (commit-msg hook via lefthook).

## Branching

Trunk-based with self-PR + squash-merge.

- `main` = always deployable
- Feature branches per phase or logical chunk
- PR titles match Conventional Commits format
- Squash-merge by default (clean linear history)
- Rebase to update branches (no merge commits in feature branches)

Branch naming: `<type>/<scope>-<short-slug>` (e.g. `feat/hero-with-headshot`, `chore/setup-scaffold`)

## TypeScript rules

- `strict: true` + `noUncheckedIndexedAccess: true`
- No `any` — use `unknown` and narrow
- No `// @ts-ignore` — fix or use `// @ts-expect-error <reason>`

## Interactivity rules (no client framework)

- Default: zero JS. Interactivity is progressive enhancement in plain `<script>` tags.
- Animation: vanilla `motion` (`animate`, `inView`) or CSS scroll-driven animations — never re-add `framer-motion`/React for it.
- **Conversion-first motion budget:** reveals ≤400ms, opacity + small translate only, trigger once, never gate content (hero copy readable immediately, no scroll hijacking).
- **Motion psychology playbook** — DESIGN.md § "Motion psychology" governs WHAT animates and why: one moving element per resting viewport (CTA-first), stagger-to-CTA reading order, single-fire arrival emphasis, ≥500ms labor illusion on form submit, no loops / fake urgency / attention-jacking. Consult it before animating anything.
- **Reduced-motion HARD RULE — every animation respects `prefers-reduced-motion`, no exceptions.** The `global.css` blanket override (0.01ms durations) is a floor, not a substitute: it only catches CSS/WAAPI animations. Motion's JS springs run on rAF and bypass it — every `animate()`/`inView` call gates itself on `matchMedia('(prefers-reduced-motion: reduce)')` first. New CSS animations go inside `@media (prefers-reduced-motion: no-preference)`. Ship the reduced variant first; the animated version is the enhancement.
- If a genuinely stateful island ever becomes necessary, adding `@astrojs/react` back is a deliberate decision — raise it first, don't drift into it.

## Images

- **Every image slot that lacks its real asset uses a placehold.co placeholder at the final intended dimensions** — e.g. `https://placehold.co/800x600/141416/f59e0b?text=Agrivi+hero` (bg = `--color-bg-elev-1`, text = accent; format `WxH/bg-hex/text-hex?text=…`, hex without `#`). Correct dimensions keep layout and CLS honest during build; never leave an `img` slot empty or commented out. (Settled 2026-07-17 after review churn: both placehold.co and placeholdit.com serve this exact format; standardized on placehold.co — better-known, CORS-enabled. One convention, no arguing.)
- **No placeholder ships.** Pre-launch gate: `grep -rE "placehold\.co|placeholdit\.com" src/` must return zero hits before the Phase 11 deploy (both domains guarded so no stray from either convention era survives).

## Astro component rules

- Frontmatter (`---`) for data fetching + props (TypeScript-typed)
- HTML below frontmatter
- Component-scoped `<style>` only when Tailwind can't (rare)
- Extract logic >10 lines into `src/lib/utils/`

## API endpoints — `prerender = false` required

`astro.config.mjs` uses `output: 'static'` (Astro 5+ default; the legacy `output: 'hybrid'` was removed). Static mode prerenders everything at build time, which breaks server-runtime endpoints.

Every route that must run on Vercel at request time — e.g. the dynamic OG generator `src/pages/og/[slug].png.ts`, or any future file under `src/pages/api/**` — **must export `prerender = false`** at the top, before any other code:

```ts
// src/pages/og/[slug].png.ts
export const prerender = false;

import type { APIRoute } from 'astro';
// …
```

(The contact form uses Astro Actions, which are server-handled by design — no flag needed there.)

Forgetting this means Astro tries to evaluate the endpoint at build time, which either fails (no env vars) or produces a useless static response. The Vercel adapter relies on this flag to know which routes ship as serverless functions.

## Comments

Default: no comments. Only when WHY is non-obvious.

Bad:

```ts
// Get user data
const user = getUser();
```

Good:

```ts
// Resend rate-limits at 100/sec; honeypot delay prevents bot-burst
const delay = Math.max(0, 1000 - (Date.now() - submittedAt));
```

Never:

- `TODO` / `FIXME` without a GitHub issue link
- `// removed X` (delete the code)
- `// added for issue #123` (commit message has it)

## Secrets

- `.env` ALWAYS in `.gitignore`
- `.env.example` committed with ALL required vars + comments
- Vercel env vars set via dashboard, never in code
- Local dev uses `.env.local`

## Design workflow (impeccable)

All non-trivial UI work runs through the `impeccable` skill. The skill loads two project files at the repo root automatically — they're the contract:

- **`PRODUCT.md`** — positioning, users, tone, anti-references, strategic principles. `register: brand` (portfolio is a marketing surface; design IS the product).
- **`DESIGN.md`** — colors, typography, spacing, motion, components. Mirror of `src/styles/global.css` `@theme {}` block; if they diverge, fix the CSS first and reflect it here.

Before touching components, layouts, sections, motion, or a11y: invoke `/impeccable <sub-command> <target>`. The sub-command tells the skill what flow to load.

### Reference pass (Mobbin) — before design, never after

Every page/section-level `/impeccable shape` or `craft` starts from real production references, not the model's priors — AI guessing layout patterns from scratch is the failure mode this step exists to prevent.

1. Pull 5–10 references for the target (hero, case-study page, blog index, contact form, …) via the **Mobbin MCP** (subscribed + registered at user scope 2026-07-17, official HTTP server `api.mobbin.com/mcp`; `firecrawl` CLI + `exa` stay for portfolio-gallery pulls outside Mobbin's library).
2. Choose the best-fit pattern against `PRODUCT.md` (tone, anti-references) and name the chosen references + why in the shape/craft brief.
3. Only then run the impeccable flow, with the chosen pattern as the layout starting point.

Primitives (Phase 2) skip this — they're token application. Mobbin is a deliberate exception to the CLI-over-MCP preference: no CLI exists.

**Source fit:** Mobbin covers product UI — strongest for component/flow patterns (forms, indexes, card grids, nav, CTA bands); personal portfolios aren't in its library. Portfolio-identity sections (hero, work showcase) lean on the locked moodboard (canonical list: `PRODUCT.md` § Anti-references → "Look at instead") + portfolio galleries (godly.website, land-book) via firecrawl/exa. **Subscription timing:** subscribed 2026-07-17; cancel after Phase 8 motion polish if design work is done — references are pulled just-in-time per section, no upfront batch pull.

### Phase → skill mapping

| Phase | Task                                                                      | Primary skill(s)                                                                                                                                                                                                                     |
| ----- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2     | Design tokens + primitives (Button, Card, Chip, Link, Section, Container) | `/impeccable document` once to verify DESIGN.md, then ONE batched `/impeccable craft` pass over the primitive set (per-primitive ceremony dropped 2026-07-17 — tokens are locked; quality gate moves to page-level `polish`/`audit`) |
| 3     | Layouts (Nav, Footer, PageShell)                                          | `/impeccable shape` brief, then `/impeccable craft`                                                                                                                                                                                  |
| 4     | Landing sections (Hero, TrustStrip, FeaturedWork, etc.)                   | `/impeccable craft` per section, `/impeccable polish` over the full page                                                                                                                                                             |
| 5     | Case study template + 3 real studies                                      | `/impeccable craft` template, `/impeccable polish` per filled study; screenshot optimization by hand (WebP, sizing, lazy-load — the old `image` skill is gone)                                                                       |
| 6     | Blog templates (Brief + Deep-dive)                                        | `/impeccable craft` for templates, `/impeccable typeset` for prose tuning                                                                                                                                                            |
| 7     | About + Contact pages                                                     | `/impeccable craft` per page, `/impeccable harden` on the contact form, `playwright-cli` for browser QA                                                                                                                              |
| 8     | Motion polish                                                             | `/impeccable animate` page-by-page, `/impeccable polish` for hover micro-interactions                                                                                                                                                |
| 9     | SEO / structured data / meta                                              | Manual JSON-LD authoring + technical sweep (`find-docs` for schema.org/meta references; the old `schema`/`seo-audit`/`ai-seo` skills are gone)                                                                                       |
| 10    | A11y + perf pass                                                          | `/impeccable audit` site-wide, `/impeccable harden` for fixes, `playwright-cli` cross-device checks, `npx lighthouse` for CWV (old `webapp-testing`/`web-quality-skills` are gone)                                                   |
| 11    | Deploy + launch                                                           | `vercel` CLI for deploys; launch sequencing + directory submissions by hand (old `deploy-to-vercel`/`launch`/`directory-submissions` skills are gone)                                                                                |

Phases 1 (setup) is mechanical — no impeccable.

**Gate granularity (revised 2026-07-17):** respect `craft`'s multi-step gates (shape → mock direction → palette → build) at the **page/section level** — they're how the skill avoids generic output. Don't run the full gate sequence per primitive; with DESIGN.md locked, primitives are token application, and per-primitive ceremony is where the original 2-week plan stalled.

`/impeccable live` warms context via `live.mjs` and serves a local browser session for real-time iteration. Use it during Phase 4 polish.

## Skill invocation rules

When working in this repo, invoke these skills proactively. Default to **CLI + skill over MCP** wherever a CLI covers the capability (preference locked 2026-05-19).

### Primary (always-on for matching phases)

- **`impeccable`** — primary design driver for all UI work. See "Design workflow (impeccable)" above for the gate + sub-command mapping. Preferred over `frontend-design` for this project — broader scope + auto-loads PRODUCT.md / DESIGN.md.
- **`claude-api`** — BEFORE writing or modifying any code that imports `@anthropic-ai/sdk`. Applies to `scripts/brief.ts`, `src/lib/brief/generate.ts`, and any future Anthropic SDK integration. Skill bundles current best practices (prompt caching, model migration, tool use, batch, citations).
- **`verify-library-api`** (paired with `find-docs` — see Auxiliary, which owns its description) — for non-trivial `.astro` work, content collections, adapter config: check the installed Astro/Tailwind version first, then version-pinned docs. (The old `astro` skill is gone — these two cover it.)

### Phase-bound

- **`playwright-cli`** — Phase 7. Contact form QA + Phase 10 browser checks.

**Removed in the `.claude` rebuild — do NOT invoke; listed so they aren't re-added by mistake.** Their jobs are covered in the Phase table above: `schema`, `seo-audit`, `ai-seo` (Phase 9 → manual + `find-docs`), `webapp-testing` (Phase 10 → `playwright-cli` + `npx lighthouse`), `image` (Phase 5 → manual), `launch`, `directory-submissions`, `deploy-to-vercel` (Phase 11 → `vercel` CLI + manual).

### Auxiliary (auto-triggered or per-need)

- **`brainstorming`** — auto-triggers on creative/build work; respect the design-doc gate.
- **`firecrawl` CLI** — for content research (Brief enrichment, reference site scraping); the old `firecrawl-*` skills are gone, the CLI is installed and allowlisted. `exa` MCP for general web search.
- **`find-docs`** — verify Astro 6 / Tailwind v4 / Resend / Octokit API references before writing integration code (Anthropic SDK → `claude-api` instead).
- **`simplify`** — pre-PR code review for reuse + quality.

### Community skills

**None installed.** `web-quality-skills`, `accessibility-agents`, and `schema-markup-generator` were all removed in (or never survived) the `.claude` rebuild — a11y is manual via `/impeccable audit`, Lighthouse via `npx lighthouse`, JSON-LD by hand. Listed only so they aren't re-added by mistake.

### Project-local skills (committed to repo at `.claude/skills/`)

- **`astro-prerender-check`** — enforces `prerender = false` on any file under `src/pages/api/**` or `src/pages/og/**`. Auto-triggers on edits to those paths.
- **`commit-scope-validator`** — pre-validates commit messages against the scope whitelist in `commitlint.config.js` before lefthook runs.

### CLI-over-MCP integrations

- **Vercel** — use the `vercel` CLI. No Vercel MCP.
- **GitHub** — use `gh` CLI + Octokit (programmatic, in `src/lib/brief/github.ts`). No GitHub MCP.

**NOT applicable:** `next-best-practices` · `shadcn` · `biocirv-*` (this is Astro, not Next; no shadcn registry; not BioCirV).

## Pre-commit gate (lefthook)

- Pre-commit: Prettier + ESLint (auto-fix + stage)
- Commit-msg: commitlint (Conventional Commits + scope whitelist)

To bypass (rare): `git commit --no-verify`. Don't.

## CI

- `.github/workflows/ci.yml` — typecheck + lint + test + build on PR
- `.github/workflows/code-review.yml` — Claude Code Action on PR open/sync; auth via `CLAUDE_CODE_OAUTH_TOKEN` repo secret (Claude subscription OAuth, not API credits). With the `LINEAR_API_KEY` repo secret set, it also fetches the Linear ticket named in the branch/title/body and reviews the diff against its spec (silent no-op otherwise)
- `.github/workflows/merge-gate.yml` — adaptive two-leg merge gate; stamps the `merge-gate` commit status, green only when every applicable AI reviewer is clean on the current head
- Review-fix loop: `.github/ai-review-loop.md` (canonical playbook — see the "AI review loop" section below for the auto-run wiring)

## What we are NOT doing (v1)

- E2E / Playwright tests (Vitest unit tests are wired — `yarn test`, run in CI; add e2e when a real flow needs it)
- Storybook (component count too low)
- Design tokens build step (Tailwind v4 `@theme` handles it natively)
- i18n (EN only)
- React / any client framework (dropped 2026-07-17 — vanilla `motion` covers animation, Actions cover the form)
- Lenis / smooth-scroll libs (dropped 2026-07-17 — no choreographed scroll on a conversion site)
- Contact-form rate limiting (in-memory counters are placebo on serverless; honeypot + min-time + Zod v1, Turnstile/Upstash only on real spam)
- `astro-seo` package / Partytown (inline meta component; no heavy 3rd-party scripts to offload)
- husky (using lefthook — single YAML config, no postinstall)
- PWA — no service worker, no offline, no install prompt (decided 2026-07-19). The site is a one-visit conversion funnel: nobody installs a portfolio, and a service worker's cache can serve stale availability/CV copy — the exact drift class KKD-12 guards against. Lighthouse dropped its PWA category in v12, so there's no score value either. Allowance: a plain web manifest (`theme-color`, icons) as part of Phase 9 meta — that's the whole budget. Do not add `@vite-pwa/astro` or hand-rolled SW code.

**Changed 2026-07-17:** analytics ship AT launch (Vercel Analytics free tier) — the conversion KPI (2-4% target) is unmeasurable without it. Plausible later only if it earns its cost.

## Reference

- Vault spec: `~/Obsidian/brain/01 - Projects/portfolio-v2/` (portfolio-v2.md, dev-conventions.md, stack-decisions.md, design-system.md, content-outline.md)
- Architecture overview: [`./ARCHITECTURE.md`](./ARCHITECTURE.md)

## AI review loop (ai-review-kit — auto-run)

When CREATING a pull request in this repo, fill every section of
`.github/PULL_REQUEST_TEMPLATE.md` with real content — actual verification results,
real trade-offs with reasoning. The AI reviewers treat stated trade-offs as intentional
and verify Verification claims; empty or false sections make reviews worse, not softer.

After opening ANY pull request in this repo, immediately and without being asked:
fire the Codex trigger (`gh pr comment <N> --body "@codex review"`) — skip it if an
ack for this head already exists OR the repo has no Codex leg (no `## Code Review
Rules` section in AGENTS.md) — then read `.github/ai-review-loop.md` fully and drive
it to convergence. It is autonomous by design — only its critical escalations stop for a
human, and it NEVER merges. Report the end state in one line.

At the START of a session in this repo: `gh search prs --author "@me" --state open
--repo kristijan-kresic-hvar/portfolio-v2` — THIS repository only (other repos' sweeps
belong to their own sessions/crons); anything actionable → run the playbook's sweep
mode unprompted, restricted to this repo. Quiet when idle.
(Coverage between sessions is owned by the babysitter, which runs from the
ai-review-kit CLONE (deliberately not vendored into this repo) — install it with
`~/DEV/ai-review-kit/babysit.sh --install-cron` from this repo's root; it picks the
right scheduler per OS:
macOS gets a LaunchAgent, NOT crontab (plain cron can't reach the login Keychain for
`gh`/`claude` auth — every cron sweep would 401); Linux gets a `*/30` crontab. Do NOT
also create a Claude scheduled task for sweeping: it runs under interactive permission
settings and doesn't take the script's lock.)

Installed by ai-review-kit's setup.sh — keep this section when editing CLAUDE.md.
