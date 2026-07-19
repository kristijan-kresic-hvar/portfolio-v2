---
name: astro-prerender-check
description: Auto-enforces `export const prerender = false;` on server-runtime Astro routes — API endpoints under `src/pages/api/**` and dynamic OG generators under `src/pages/og/**`. Use whenever creating or editing files in those paths, or when Claude is about to author a new server-runtime endpoint anywhere under `src/pages/`.
---

# astro-prerender-check

Enforce the per-file `prerender = false` invariant for server-runtime Astro routes in this repo.

## Why this exists

`astro.config.mjs` runs `output: 'static'` with the Vercel adapter. Astro 6 removed `output: 'hybrid'` — every route prerenders at build time **unless it explicitly opts out**. Forgetting the opt-out on a server endpoint produces silent build-time failures (no env vars, useless static response, or build error depending on what the endpoint does).

The Vercel adapter relies on `export const prerender = false;` to know which routes ship as serverless functions. Miss it and the route never runs at request time.

## When to trigger

Auto-invoke whenever:

1. Creating a new file under `src/pages/api/**` (any depth; none exist today — contact is an Astro Action and the Brief is a scheduled GitHub Action — but any future endpoint lands here)
2. Creating a new file under `src/pages/og/**` (dynamic OG image generators — e.g. `src/pages/og/[slug].png.ts`)
3. Editing any existing file in those paths
4. Authoring any new `src/pages/**` route that uses `Astro.request`, fetches secrets, sends emails, or otherwise needs request-time execution

## What the skill does

1. Read the target file.
2. Check whether `export const prerender = false;` (or equivalent — `export const prerender = false` without semicolon) exists at the top of the file, before all other code (except possibly a license comment).
3. If missing: insert it as the **first non-comment line** of the file, before any `import` statements. The export must come first.
4. If present but in the wrong position: flag it. Astro doesn't strictly require it to be first, but the project convention is "first non-comment line" for grep-ability.

## Reference template

The canonical pattern (per `CLAUDE.md` "API endpoints" section):

```ts
// src/pages/og/[slug].png.ts
export const prerender = false;

import type { APIRoute } from 'astro';
// ... rest of file
```

```ts
// src/pages/og/[slug].png.ts
export const prerender = false;

import type { APIRoute } from 'astro';
// ... rest of file
```

## What this skill does NOT do

- Does not add `prerender = false` to routes that legitimately prerender (e.g. `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/work/[...slug].astro`). Static rendering is the default and the correct choice for those.
- Does not modify `astro.config.mjs` — `output: 'static'` is locked.
- Does not change the Vercel adapter config.

## Verification

After insertion, the file should pass `yarn typecheck` and `yarn build` cleanly. The CI workflow at `.github/workflows/ci.yml` will catch any missed cases on PR.

## Related

- `CLAUDE.md` § "API endpoints — `prerender = false` required" — repo convention
- `dev-conventions.md` § 4 Tooling — explanation of why Astro 6 removed `hybrid`
- `verify-library-api` + `find-docs` skills — for broader Astro questions (the old `astro` skill is gone); this skill is the per-file invariant guard
