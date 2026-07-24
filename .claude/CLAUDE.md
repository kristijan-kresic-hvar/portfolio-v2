# portfolio-v2 — Claude Code project instructions

Merges with global `~/.claude/CLAUDE.md`. Project design/product/architecture docs live at repo root (`PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CLAUDE.md`) and in the Obsidian vault `01 - Projects/portfolio-v2/`.

## Linear

- Team: `KKD`
- Project: `Portfolio v2`
- This project is **opted into Linear** (side project). Track non-trivial work as issues; status↔git per global rules. **Status↔git is automated by Linear's native GitHub integration** (branch → In Progress, PR → In Review, merge → Done). The old custom `linear-pr-sync.sh` Stop hook was retired 2026-06-27 in favor of it.

## Verification Commands

- Dev: `yarn dev`
- Build: `yarn build`
- Typecheck: `yarn typecheck` (astro check)
- Lint: `yarn lint` (eslint . && astro check)
- Format check: `yarn format:check`
- Tests: `yarn test` (Vitest — unit/schema, via `getViteConfig`). E2E not set up — manual QA via `playwright-cli` + browser; a11y/contrast per Phase 10.

## Stack

- **Astro 6** (output `static`; endpoints opt out via `export const prerender = false`).
- TypeScript (strict) · **Tailwind CSS v4** (`@theme {}` in `src/styles/global.css`).
- MDX content collections (`work`, `blog`) — config at `src/content.config.ts` (Astro 6 location).
- **No client framework** (React dropped 2026-07-17) · **Motion** vanilla (`motion`, not `framer-motion`) · native cross-document View Transitions (CSS `@view-transition`, no `<ClientRouter />`) · native scroll (Lenis dropped).
- Contact form → **Astro Actions** (`defineAction` + Zod, `accept: 'form'`), not a hand-rolled `/api/contact` endpoint. Brief pipeline → **scheduled GitHub Action**, not a Vercel cron.
- Fonts: `@fontsource-variable/geist` + Geist Mono (NOT the `geist` npm pkg — Next-only).
- Package manager: **Yarn 4** (Berry). Hosting: Vercel.

## Design — impeccable is the driver

- Source of truth: `PRODUCT.md` + `DESIGN.md` at repo root (mirror `global.css @theme`).
- Workflow: `/impeccable document` → `/impeccable craft <primitive>` → `/impeccable polish`. See root `CLAUDE.md` "Design workflow".
- Locked: dark-only, single accent **amber `#F59E0B`** (hover `#FBBF24`, active `#D97706`), Geist + Geist Mono.
- **Elevation bar (LOCKED 2026-07-20):** every new surface follows root `DESIGN.md` § "Design register & elevation bar" — bolder direction, signature moment per section, amber at every scroll depth, imagery on proof surfaces. AC-compliance alone ≠ done. Applies to all future phases (5/6/7+), and every UI ticket's AC must carry its design-ambition criterion.

## Sharp Edges

- **All-viewport UI rule (2026-07-19, from the KKD-23 hero rework):** every section is verified by SCREENSHOT at 375 / 768 / 1280 / 1440 / 1920 / 2560 before sign-off — a 1280-only check shipped a hero that collapsed at ≥1440 (4-line headline tower, thumbnail portrait, flat void). The full rule + failure catalog lives in root `DESIGN.md` § "All-viewport rule" — read it before building or reviewing any section. Prototype look-checks use the production font (Geist), not a fallback — wrap math measured in Inter regressed in Geist.

- **a11y target = 100** (not 95) — recruiters tab through; a11y bugs cost conversions. The old a11y PreToolUse enforce-hook + the `accessibility-agents` plugin are **gone** (removed in the `.claude` rebuild) — a11y review is now **manual** via `/impeccable audit`. Don't rely on a hook to gate UI edits.
- Phase 2 color-sweep refinements to apply when encoding tokens: `--text-muted #8C8C8C→#8E8E8E`; `--accent-subtle 0.10→0.13`; surface-aware focus ring (outline + offset, not a fixed-bg halo). OKLCH encoding recommended (Tailwind v4 native).
- Commit gate: Conventional Commits + scope whitelist (commitlint + lefthook + repo skill `commit-scope-validator`). The `astro-prerender-check` skill enforces `prerender=false` on endpoints.

## Conventions

- Trunk-based: feature branch → self-PR → squash-merge to `main`. CI + Claude code-review in `.github/workflows`.
- Per global: worktree + PR, never commit to `main`, never merge without explicit approval.
- **Merge gate (two layers):** merge only when every reviewer that _applies_ to the PR is clean on the current head. A reviewer applies when it's **configured** (`code-review.yml` for Claude, `AGENTS.md` § Code Review Rules for Codex — a bare `AGENTS.md` without that section doesn't count) **or** has already acted on the PR — so a repo with only one reviewer gates on that one, and a repo with neither is ungated. Clean = Claude's **latest** verdict on the head is `APPROVED` (waived only when the PR touches `code-review.yml` itself AND every changed file is under `.github/workflows/` — the action's workflow-validation guard self-skips PRs editing `code-review.yml`; other workflow-only PRs are reviewed normally); Codex has zero unresolved threads **and** a "didn't find any major issues" comment whose embedded SHA prefixes the head (its 👍 is a weak hint, not authoritative — no event re-fires for a reaction). Enforced by: (1) the `merge-gate` commit **status** (`.github/workflows/merge-gate.yml`) — red until every applicable leg passes; (2) the local `~/.claude/hooks/merge-gate.mjs` PreToolUse hook, which hard-blocks agent-run `gh pr merge` (and git-push-to-main / `gh api …/merge`) on the same rules. Branch protection on `main` (enabled 2026-07-24 at the public flip) requires the `merge-gate` + `check` statuses green and a linear-history PR merge, so the gate is **enforced**, not just visual; the local hook stays the belt-and-suspenders for agent-run merges. Never merge with `merge-gate` red or pending, and CI must be green.
