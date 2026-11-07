# portfolio-v2

Source of my personal site, kept public as a working sample of how I set up and run a frontend codebase.

**Kristijan Krešić** · Frontend Engineer (React / Next.js / TypeScript; Laravel on the backend) · Hvar, Croatia · [CV (frontend)](./public/cv/kristijan-kresic-cv-frontend.pdf) · [CV (software engineer, full-stack ads)](./public/cv/kristijan-kresic-cv-fullstack.pdf) · [LinkedIn](https://www.linkedin.com/in/kkwebdev/)

## What this repo shows

- **Project setup from scratch**: Astro 6, TypeScript strict with `noUncheckedIndexedAccess`, Tailwind CSS v4 design tokens in a single `@theme` block, MDX content collections with Zod schemas.
- **Quality gates that actually run**: Vitest unit tests, ESLint + Prettier on pre-commit (lefthook), Conventional Commits enforced by commitlint with a scope whitelist, CI on every PR (`typecheck` + `lint` + `test` + `build`).
- **Two-reviewer PR pipeline**: every PR gets an automated code review plus a merge gate that stays red until the review is clean on the current head. See `.github/workflows/`.
- **Documented decisions**: [`ARCHITECTURE.md`](./ARCHITECTURE.md) (routes, data flow, design system), [`DESIGN.md`](./DESIGN.md) (tokens, motion rules, accessibility target of 100), [`CLAUDE.md`](./CLAUDE.md) (conventions for AI coding agents working in the repo).
- **AI-augmented workflow, human-owned output**: I use Claude Code and Cursor for scaffolding and research drafts. Architecture, security decisions and every merged line are reviewed by me.

## Stack

Astro 6 · TypeScript · Tailwind CSS v4 · MDX · Motion (vanilla) · Geist + Geist Mono · Vitest · GitHub Actions · Vercel

## Run locally

```sh
yarn install
cp .env.example .env.local
yarn dev          # localhost:4321
```

| Command          | Action                       |
| :--------------- | :--------------------------- |
| `yarn dev`       | Dev server (HMR)             |
| `yarn build`     | Production build → `dist/`   |
| `yarn preview`   | Preview production build     |
| `yarn test`      | Vitest unit tests            |
| `yarn typecheck` | `astro check` (TS + .astro)  |
| `yarn lint`      | ESLint + Astro check         |
| `yarn format`    | Prettier write               |

## Status

The site itself is not live; the repo stays public for the engineering setup above. Production work I shipped for clients (BioCirV Data Portal, OnCallable, Suello, Vetster, Naitur, BuddyIns) is described in the CVs linked at the top.

## License

All rights reserved. The source is public to read; it is not licensed for reuse or redistribution.
