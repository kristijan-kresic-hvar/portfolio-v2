# portfolio-v2

Personal portfolio of **Kristijan Krešić** — full-stack developer based in Hvar, Croatia.

**Live:** [kristijankresic.com](https://kristijankresic.com) _(coming soon)_

## Stack

- **Astro 6** (static-first, zero JS by default — no client framework)
- **TypeScript** (strict + `noUncheckedIndexedAccess`)
- **Tailwind CSS v4** (`@theme` tokens, dark only)
- **MDX** via Astro Content Collections (`work` + `blog`)
- **Motion** (vanilla) + native cross-document View Transitions (CSS `@view-transition`)
- **Geist** + **Geist Mono** (self-hosted variable fonts)
- **Resend** for contact form + Brief failure alerts
- **Anthropic API** for the monthly "Web Dev Brief" (scheduled GitHub Action)
- **Vercel** (hosting + adapter)

## Run locally

```sh
yarn install
cp .env.example .env.local
yarn dev          # localhost:4321
```

## Scripts

| Command          | Action                      |
| :--------------- | :-------------------------- |
| `yarn dev`       | Dev server (HMR)            |
| `yarn build`     | Production build → `dist/`  |
| `yarn preview`   | Preview production build    |
| `yarn typecheck` | `astro check` (TS + .astro) |
| `yarn lint`      | ESLint + Astro check        |
| `yarn format`    | Prettier write              |

## More

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system overview, route map, Brief pipeline diagram, design system, key decisions
- [`CLAUDE.md`](./CLAUDE.md) — engineering conventions for AI coding agents (Claude Code, Codex, Cursor)

## License

No license — **all rights reserved**. The source is public to read and to see how it's built; it is **not** licensed for reuse or redistribution.

<!-- ci smoke test -->

<!-- review smoke -->

<!-- confirm review -->
