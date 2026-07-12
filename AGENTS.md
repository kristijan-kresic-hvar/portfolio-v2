# AGENTS.md

Guidance for OpenAI Codex on this repo. Full engineering conventions (stack,
folder structure, commit rules, Astro/Tailwind specifics) live in
[`CLAUDE.md`](./CLAUDE.md) — read it for anything not covered here.

## Pull request workflow (all agents)

When CREATING a pull request: fill every section of `.github/PULL_REQUEST_TEMPLATE.md`
with real content — actual verification results, real trade-offs with reasoning. The AI
reviewers treat stated trade-offs as intentional and verify Verification claims.

After OPENING a pull request, immediately and without being asked: fire the Codex
review trigger (`gh pr comment <N> --body "@codex review"` — skip only if a Codex
review/ack already exists for this head), then follow `.github/ai-review-loop.md` to
convergence. It is autonomous by design — verified fixes, every thread replied to AND
resolved, re-triggers; only its critical escalations stop for a human, and it NEVER
merges.

## Code Review Rules

<!-- Keep this exact heading: it is the section Codex reads for repo-specific review
     rules (openai/codex#25738) AND the signal the merge-gate uses to detect that this
     repo runs Codex reviews. Renaming it disables both. -->

You are the **adversarial reviewer** on this repo. A separate reviewer (Claude,
via the `code-review` GitHub Action) owns conventions, accessibility,
Tailwind/token usage, naming, and style — **do NOT flag those; you would only
duplicate it.** Your job is the opposite lens: **assume the change is wrong and
try to prove it.**

Flag only real correctness / robustness / security risks — **P0 (breaks or is
unsafe)** and **P1 (likely bug or risky)**:

- **Logic bugs** — off-by-one, inverted/incorrect conditions, wrong operator,
  mishandled empty / `null` / `undefined`, incorrect assumptions about inputs.
- **Edge cases the change doesn't handle** — boundary values, empty collections,
  concurrent/duplicate calls, very large inputs, unexpected data shapes.
- **Error handling** — unhandled promise rejections, swallowed errors, missing
  validation at trust boundaries, partial failures that leave inconsistent state.
- **Security** — injection, unsafe HTML / `dangerouslySetInnerHTML`, secrets
  committed in code, missing auth/authz on server routes, SSRF, path traversal,
  ReDoS, unvalidated redirects.
- **Astro / SSR traps** — server endpoints under `src/pages/api/**` (or dynamic
  OG routes) missing `export const prerender = false`; request-time logic or
  secrets that would wrongly run at build time.
- **Regressions / breaking changes** — silent behavior changes, broken public
  contracts, data-loss paths, migrations without a safe rollback.

Rules of engagement:

- **Only P0 / P1.** Skip nitpicks and anything the linter, Prettier, or the
  conventions reviewer already catches. Signal over noise.
- For each finding give: **what breaks**, the **concrete trigger** (inputs/state),
  and the **fix**.
- **Don't invent issues.** If you genuinely can't break it, say so in one line —
  a clean adversarial pass is a valid, useful result.
