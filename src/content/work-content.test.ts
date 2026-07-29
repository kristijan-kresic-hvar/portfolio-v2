import { readdirSync, readFileSync } from 'node:fs';

import { getContainerRenderer } from '@astrojs/mdx';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { describe, expect, it } from 'vitest';

import Naitur from '@/content/work/naitur.mdx';

// Shared content guard over every case-study body. One file covers all five
// studies, so KKD-41..45 ship no per-study prose regexes — those would couple
// the suite to editorial wording.
const dir = new URL('./work/', import.meta.url);
const files = readdirSync(dir)
  .filter((name) => name.endsWith('.mdx'))
  .map((name) => [name, readFileSync(new URL(name, dir), 'utf-8')] as const);

// Each study ticket deletes its own slug when its real body lands. An empty
// array is the Phase 11 gate.
const STUBS_REMAINING = ['naitur', 'biocirv', 'vetster'];

describe('src/content/work/*.mdx', () => {
  it('finds the case-study bodies', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('never ships a placeholder image', () => {
    for (const [name, body] of files) {
      expect(body, `${name} carries a placehold.co URL`).not.toContain('placehold.co');
    }
  });

  it('uses the locked "AI-augmented" phrasing, never "AI-assisted"', () => {
    for (const [name, body] of files) {
      expect(body, `${name} says AI-assisted`).not.toContain('AI-assisted');
    }
  });

  it('carries no placeholder checkbox glyphs', () => {
    for (const [name, body] of files) {
      expect(body, `${name} carries a ⬜ glyph`).not.toContain('⬜');
    }
  });

  it('leaves the stub sentence only in the slugs still declared unwritten', () => {
    for (const [name, body] of files) {
      const slug = name.replace(/\.mdx$/, '');
      if (STUBS_REMAINING.includes(slug)) continue;
      expect(body, `${slug} is still a stub — add it to STUBS_REMAINING or write it`).not.toContain(
        'Case study in progress',
      );
    }
  });
});

// The one seam for MDX-body assertions: the route test mocks astro:content
// (render included), so a body routed through it renders empty and every
// assertion passes vacuously. Import the .mdx directly instead — Vite resolves
// it and <Picture> works here. KKD-41..45 assert their bodies through this
// seam; they do not invent a second one.
describe('naitur.mdx rendered as a component', () => {
  it('renders its body through the container', async () => {
    // An .mdx module needs the MDX renderer registered on the container.
    const container = await AstroContainer.create({
      renderers: await loadRenderers([getContainerRenderer()]),
    });
    const html = await container.renderToString(Naitur);
    expect(html).toContain('Case study in progress');
  });
});
