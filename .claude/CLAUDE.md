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
- React islands · Motion (Framer) · Lenis · Astro View Transitions (`<ClientRouter />`).
- Fonts: `@fontsource-variable/geist` + Geist Mono (NOT the `geist` npm pkg — Next-only).
- Package manager: **Yarn 4** (Berry). Hosting: Vercel.

## Design — impeccable is the driver

- Source of truth: `PRODUCT.md` + `DESIGN.md` at repo root (mirror `global.css @theme`).
- Workflow: `/impeccable document` → `/impeccable craft <primitive>` → `/impeccable polish`. See root `CLAUDE.md` "Design workflow".
- Locked: dark-only, single accent **amber `#F59E0B`** (hover `#FBBF24`, active `#D97706`), Geist + Geist Mono.

## Sharp Edges

- **a11y target = 100** (not 95) — recruiters tab through; a11y bugs cost conversions. The old a11y PreToolUse enforce-hook + the `accessibility-agents` plugin are **gone** (removed in the `.claude` rebuild) — a11y review is now **manual** via `/impeccable audit`. Don't rely on a hook to gate UI edits.
- Phase 2 color-sweep refinements to apply when encoding tokens: `--text-muted #8C8C8C→#8E8E8E`; `--accent-subtle 0.10→0.13`; surface-aware focus ring (outline + offset, not a fixed-bg halo). OKLCH encoding recommended (Tailwind v4 native).
- Commit gate: Conventional Commits + scope whitelist (commitlint + lefthook + repo skill `commit-scope-validator`). The `astro-prerender-check` skill enforces `prerender=false` on endpoints.

## Conventions

- Trunk-based: feature branch → self-PR → squash-merge to `main`. CI + Claude code-review in `.github/workflows`.
- Per global: worktree + PR, never commit to `main`, never merge without explicit approval.
- **Merge gate (two layers):** merge only when every reviewer that *applies* to the PR is clean on the current head. A reviewer applies when it's **configured** (`code-review.yml` for Claude, `AGENTS.md` § Code Review Rules for Codex — a bare `AGENTS.md` without that section doesn't count) **or** has already acted on the PR — so a repo with only one reviewer gates on that one, and a repo with neither is ungated. Clean = Claude's **latest** verdict on the head is `APPROVED` (waived only when *every* changed file is a workflow file, since the review action self-skips those); Codex has zero unresolved threads **and** a "didn't find any major issues" comment whose embedded SHA prefixes the head (its 👍 is a weak hint, not authoritative — no event re-fires for a reaction). Enforced by: (1) the `merge-gate` commit **status** (`.github/workflows/merge-gate.yml`) — red until every applicable leg passes; (2) the local `~/.claude/hooks/merge-gate.mjs` PreToolUse hook, which hard-blocks agent-run `gh pr merge` (and git-push-to-main / `gh api …/merge`) on the same rules. Branch protection is unavailable (private repo on Free → GitHub 403), so the status is **visual** for human merges — never merge with `merge-gate` red or pending, and CI must be green.
