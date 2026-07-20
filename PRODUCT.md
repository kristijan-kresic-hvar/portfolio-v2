---
register: brand
---

# PRODUCT — portfolio-v2

Personal portfolio of **Kristijan Krešić** — full-stack developer based in Hvar, Croatia (CET). The site itself is a marketing surface in the **brand** register: design IS the product. Every visual choice serves the primary KPI of converting visitors into project inquiries or hiring conversations.

## Users

Three audiences, ranked by conversion value:

1. **Recruiters / hiring managers** — scanning for "full-stack", years of experience, recognizable companies, modern stack signals. They want to close or disqualify in 60 seconds. Mobile + desktop, often Linkedin → site link.
2. **Prospective project clients** — founders, agencies, internal hiring leads. Want concrete outcomes ("200% inquiry boost", "TOP-3 farm-management software"), evidence of full-stack capability, and an obvious path to inquire.
3. **Peer developers** — landed via blog ("Web Dev Brief") or GitHub. Lower conversion value but high trust signal — a thoughtful blog and clean repo bring referrals.

All three read in English. CET timezone is surfaced on the Contact page (response time expectation).

## Brand

**Positioning:** Senior full-stack developer for modern web products. Builds with an AI-augmented workflow, hand-finishes everything before it ships. Operates at the forefront of modern web development without making the site feel "about AI".

**Hero copy (locked, Seed 1):**

- Headline: "Full-stack developer for modern web products."
- Sub: "I ship fast, polished work end-to-end — AI-augmented workflow, hand-finished by me."
- Tertiary (re-locked 2026-07-13; originally 2026-05-19 per [[research-actionable]] L-1): "Available from August 2026 · Hvar, Croatia (CET)." — recruiter-scan anchor: availability + location + timezone in <8 words. Availability went explicit (notice given at Agilno 2026-07-09, employed until first week of August 2026); company history lives in the About timeline. Re-verify this line against reality at launch (pre-launch copy sweep ticket).
- Stack line (added 2026-07-17): small muted mono row under the tertiary — `React · Next.js · TypeScript · Node.js · Astro` (≤5 recruiter-search terms). High-volume recruiters keyword-match their must-have stack during the first-screen scan, before deciding to scroll; the full chip grid lives too far down to serve that pass. Visual weight stays minimal — this is metadata, not a headline.

**Experience framing (locked):** "4 years professional · Building for the web since 2016" — split framing reads honest, gives recruiters the professional number while showing depth of exposure. Title is "Full-stack developer" — not "Senior" — earned by case studies, not asserted.

**Brand mark:** wordmark-only ("Kristijan Krešić" set in display font) as the primary mark. Refreshed old SVG logo as secondary (favicon, OG accents). Wordmark sits above logo.

**Accent (locked):** amber `#F59E0B` — single accent through the entire site. Hover `#FBBF24`, active `#D97706`, glow `rgba(245, 158, 11, 0.20)`. Chosen over molten orange (`#FF6B2B`) through a B2B-hiring lens: high-saturation orange triggers "discount/sales" subconscious read; amber keeps warmth + differentiation but reads premium/craft. Accent caps at ~5% of viewport area — reserved for CTAs, focus rings, link hover, focal hero moments. **Never** decorative backgrounds.

**Theme:** dark only, no toggle, one strong accent. `#FFFFFF` is forbidden — primary text is `#F5F5F5` (slightly warm).

## Tone

- **Terse.** Short sentences. Fragments OK when they read clean.
- **Confident, not boastful.** Outcomes over adjectives. "200% inquiry boost" beats "I built an amazing site". "Built for the web since 2016" beats "passionate about web development".
- **Craft-aware.** Specific names + versions. "React 19", "Astro 6", "Tailwind v4" — not "modern stack" or "the latest frameworks".
- **AI-augmented, not AI-product.** Workflow is honest about AI tooling (Claude, Cursor, Codex) but the product is a _human-finished web product_. Transparency footer on every blog post: "Researched with Claude. Edited and published by me."
- **Name the AI boundary explicitly.** Per 2026 freelance positioning research: "AI-augmented" alone is now generic noise. Differentiator = naming _where_ AI helps and _where it doesn't_. Locked boundary line for About + How-I-work + FAQ band: **"AI for codegen scaffolds and research drafts. Not for architecture decisions, security review, or anything that ships under my name."** Calms the "did you actually do this?" objection funded buyers now carry.
- **No hedging.** Cut "in my opinion", "I think", "perhaps", "might".
- **No em-dashes overuse.** The model loves them; the brand doesn't.
- **No closing-paragraph filler.** Skip "in conclusion", "I hope this helps", any "I'm excited to..."
- **First-person where appropriate** — about page, blog posts, voicy CTAs. Third-person for case study outcomes.

## Anti-references

Avoid the look + feel of:

- **Trydo / Bootstrap / "freelancer template" portfolios** — the old kristijankresic.com was built on a purchased Trydo React template. Don't echo it: red-on-navy aesthetic, generic dev hero with circle photo + gradient blob, "Hire a freelancer" framing, social-icons row in hero, "What I offer" service tiles. All burn list.
- **"Freelancer / small businesses & start-ups" positioning.** Reads down-market for the rate + roles we want.
- **Generic dev-portfolio gradients** — purple→pink hero washes, glowing blob behind a centered name, "Hi, I'm X" greeting hero. Done to death.
- **Dark sites that feel like SaaS dashboards** — pure black bg, electric blue accent, lots of borders. Different register.
- **AI-portfolio template feel** — anything that screams "this was generated by ChatGPT": stock illustrations, "AI-powered" buzzwords on every section, sparkle/lightning iconography, fluorescent gradients.
- **Loud / template-y motion** — bouncing arrows, "scroll to discover", fade-in-up on literally every element, sticky animated typewriter taglines.
- **The A4 CV sheet** (named 2026-07-20 after the first Phase-4 build read exactly like one) — centered text columns stacked like a document, uniform rhythm, no imagery, no compositional variety. A CV already exists as a PDF; the site must read as a designed, modern product — if a section could be printed onto A4 without losing anything, it fails.

Look at instead: rauno.me · paco.me · brittanychiang.com · leerob.io · emilkowal.ski · linear.app · framer.com — restrained, opinionated, dense type, single strong accent, motion serving content (not decorating it).

## Strategic principles

1. **Primary KPI = conversion to hiring or project contact.** Every page, every section, earns its place by moving the visitor closer to Contact, or by being a load-bearing trust signal for one that does. Pages that don't pull weight get cut.
2. **Funnel framing:** Land → 5-second hook (hero + CTA) → Trust (logos, years, real work, social proof) → Proof (3 case studies with concrete outcomes) → Conviction (workflow narrative, AI-augmented with craftsman review) → Convert (split-path Contact: hire-for-role vs project inquiry).
3. **Pretty AND strategic — never either/or (north star, KK 2026-07-20).** The site locks the visitor's attention with modern, elegant, distinctive design AND guides that attention to Contact. Visual craft is a conversion asset, not decoration: a boring page loses the visitor before the funnel can work, and decoration that doesn't aim at the funnel is noise. Execution rules live in `DESIGN.md` § "Design register & elevation bar".
4. **Trust strip before featured work.** Hierarchy: company logos + experience line directly under the hero, _before_ the work cards. Proof > narrative.
5. **Contact is first-class.** Sticky-nav accent button is always visible. Contact form is a real form (not a `mailto:` link). Two intent paths (hire / project) drive the email subject line for triage.
6. **Real headshot, intentionally treated.** HeadshotPro portrait integrated on hero — small/medium, treated (duotone / cutout / scroll-reveal — final treatment decided after photo arrives). Differentiator: across 16 reference portfolios, real-headshot-on-hero is genuinely rare.
7. **The repo is part of the case study.** Commit history + code structure + this very file are visible artifacts of craft. Private repo, but Phase 5 ships a meta case study (`/work/portfolio-v2`) that describes the build openly.
8. **Lean MVP fast.** Phases 1-7 minimal in ~2 weeks; polish (Phases 8-11) over the following weeks. Don't perfect a section before the next is sketched.
9. **A/B-test critical headlines and CTAs.** Not v1, but the architecture supports it via the `ab-testing` skill once traffic justifies.

## Product Purpose

This site exists to convert visitors into either (a) a hiring conversation for a senior full-stack role, or (b) a scoped project inquiry. Every section is engineered for that conversion. The brand is "experienced full-stack developer who works at the forefront of modern web development with AI-augmented workflows, but ships hand-finished work end-to-end." The blog ("Web Dev Brief", monthly, AI-research + human-polish) compounds trust over time via SEO and topical authority — secondary to direct conversion in v1, primary in v2.
