import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import FeaturedWork from '@/components/sections/FeaturedWork.astro';
import Hero from '@/components/sections/Hero.astro';
import HowIWork from '@/components/sections/HowIWork.astro';
import TechStack from '@/components/sections/TechStack.astro';
import TrustStrip from '@/components/sections/TrustStrip.astro';
import WhatIDo from '@/components/sections/WhatIDo.astro';
import { selectFeaturedWork } from '@/lib/utils/featured-work';

let container: AstroContainer;
let html: string;
let trustStripHtml: string;
let featuredWorkHtml: string;
let emptyFeaturedWorkHtml: string;
let whatIDoHtml: string;
let techStackHtml: string;
let howIWorkHtml: string;

// Mirrors the stub MDX entries in src/content/work/ — getCollection() resolves
// empty under vitest, so the render tests inject entries via the test seam.
// Deliberately passed out of order to prove the component sorts by `order`.
const workEntries = [
  {
    id: 'vetster',
    data: {
      title: 'Vetster',
      summary: 'Pet telehealth at scale.',
      role: 'Full-stack developer',
      stack: ['Laravel', 'Vue', 'PostgreSQL'],
      year: 2025,
      outcome: 'Shipped across a 24/7 telehealth platform serving 100k+ app users',
      draft: false,
      featured: true,
      order: 3,
    },
  },
  {
    id: 'naitur',
    data: {
      title: 'Naitur',
      summary: 'First platform for licensed psilocybin-therapy clinics in the US.',
      role: 'Frontend developer',
      stack: ['React', 'Node.js', 'PostgreSQL'],
      year: 2024,
      outcome: '100+ facilitators and 15+ clinics onboarded in week one',
      draft: false,
      featured: true,
      order: 1,
    },
  },
  {
    id: 'biocirv',
    data: {
      title: 'BioCirV Data Portal',
      summary: 'Biomass discovery portal on the newest stack.',
      role: 'Frontend developer',
      stack: ['Next.js 16', 'React 19', 'Tailwind CSS 4'],
      year: 2026,
      outcome: 'Live public demo — interactive dashboards and maps for biomass discovery',
      draft: false,
      featured: true,
      order: 2,
    },
  },
];

beforeAll(async () => {
  container = await AstroContainer.create();
  html = await container.renderToString(Hero);
  trustStripHtml = await container.renderToString(TrustStrip);
  featuredWorkHtml = await container.renderToString(FeaturedWork, {
    props: { entries: workEntries },
  });
  emptyFeaturedWorkHtml = await container.renderToString(FeaturedWork, {
    props: { entries: [] },
  });
  whatIDoHtml = await container.renderToString(WhatIDo);
  techStackHtml = await container.renderToString(TechStack);
  howIWorkHtml = await container.renderToString(HowIWork);
});

describe('Hero', () => {
  it('renders the locked headline, sub, tertiary and stack line verbatim', () => {
    expect(html).toContain('Full-stack developer for modern web products.');
    expect(html).toContain(
      'I ship fast, polished work end-to-end — AI-augmented workflow, hand-finished by me.',
    );
    expect(html).toContain('Available from August 2026 · Hvar, Croatia (CET).');
    expect(html).toContain('React · Next.js · TypeScript · Node.js · Astro');
  });

  it('renders primary and secondary CTAs with the locked hrefs', () => {
    expect(html).toContain('href="/contact?intent=project"');
    expect(html).toContain('Start a project');
    expect(html).toContain('href="/work"');
    expect(html).toContain('View work');
  });

  it('renders the headshot as the LCP element (eager, high fetchpriority)', () => {
    expect(html).toContain('<img');
    expect(html).toContain('fetchpriority="high"');
    expect(html).toContain('loading="eager"');
  });

  it('ships zero client JS and no raw hex', () => {
    expect(html).not.toContain('<script');
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('TrustStrip', () => {
  it('renders the locked experience line verbatim', () => {
    expect(trustStripHtml).toContain('4 years professional');
    expect(trustStripHtml).toContain('Building for the web since 2016');
  });

  it('renders the three company names as text wordmarks', () => {
    expect(trustStripHtml).toContain('Agilno');
    expect(trustStripHtml).toContain('amondi GmbH');
    expect(trustStripHtml).toContain('Reroot');
  });

  it('renders the locked pull-quote with attribution and no photo', () => {
    expect(trustStripHtml).toContain(
      'Great to build with, sharp, and always on top of the details.',
    );
    expect(trustStripHtml).toContain('Frane Žunić');
    expect(trustStripHtml).toContain('Full Stack Developer');
    expect(trustStripHtml).not.toContain('<img');
  });

  it('ships zero client JS and no raw hex', () => {
    expect(trustStripHtml).not.toContain('<script');
    expect(trustStripHtml).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('selectFeaturedWork', () => {
  const entry = (
    id: string,
    data: Partial<Parameters<typeof selectFeaturedWork>[0][number]['data']>,
  ) => ({
    id,
    data: { draft: false, featured: true, order: undefined, ...data },
  });

  it('returns at most 3 featured entries sorted by order', () => {
    const picked = selectFeaturedWork([
      entry('c', { order: 3 }),
      entry('a', { order: 1 }),
      entry('d', { order: 4 }),
      entry('b', { order: 2 }),
    ]);
    expect(picked.map((e) => e.id)).toEqual(['a', 'b', 'c']);
  });

  it('excludes draft and non-featured entries', () => {
    const picked = selectFeaturedWork([
      entry('draft', { draft: true, order: 1 }),
      entry('unfeatured', { featured: false, order: 2 }),
      entry('kept', { order: 3 }),
    ]);
    expect(picked.map((e) => e.id)).toEqual(['kept']);
  });

  it('returns an empty array for an empty collection', () => {
    expect(selectFeaturedWork([])).toEqual([]);
  });

  it('sorts entries without an order after ordered ones', () => {
    const picked = selectFeaturedWork([entry('unordered', {}), entry('first', { order: 1 })]);
    expect(picked.map((e) => e.id)).toEqual(['first', 'unordered']);
  });
});

describe('FeaturedWork', () => {
  it('renders the three featured stubs in launch-slate order', () => {
    const naitur = featuredWorkHtml.indexOf('Naitur');
    const biocirv = featuredWorkHtml.indexOf('BioCirV');
    const vetster = featuredWorkHtml.indexOf('Vetster');
    expect(naitur).toBeGreaterThan(-1);
    expect(biocirv).toBeGreaterThan(naitur);
    expect(vetster).toBeGreaterThan(biocirv);
  });

  it('surfaces an outcome line on every card', () => {
    expect(featuredWorkHtml).toContain('100+ facilitators and 15+ clinics onboarded in week one');
    expect(featuredWorkHtml).toContain('Live public demo');
    expect(featuredWorkHtml).toContain('100k+ app users');
  });

  it('surfaces role, stack and year meta on the cards', () => {
    expect(featuredWorkHtml).toContain('Frontend developer');
    expect(featuredWorkHtml).toContain('Full-stack developer');
    expect(featuredWorkHtml).toContain('2024');
    expect(featuredWorkHtml).toContain('2025');
    expect(featuredWorkHtml).toContain('2026');
  });

  it('links only to the work index, never to detail routes', () => {
    expect(featuredWorkHtml).toContain('href="/work"');
    expect(featuredWorkHtml).not.toMatch(/href="\/work\/./);
  });

  it('ships zero client JS and no raw hex', () => {
    expect(featuredWorkHtml).not.toContain('<script');
    expect(featuredWorkHtml).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('renders nothing for an empty collection without throwing', () => {
    expect(emptyFeaturedWorkHtml.trim()).toBe('');
  });
});

describe('WhatIDo', () => {
  it('renders the four capability card titles', () => {
    expect(whatIDoHtml).toContain('Full-stack web');
    expect(whatIDoHtml).toContain('Product engineering');
    expect(whatIDoHtml).toContain('AI-augmented workflow');
    expect(whatIDoHtml).toContain('Performance &amp; UX polish');
  });

  it('renders a supporting line per card, including the locked AI boundary', () => {
    expect(whatIDoHtml).toContain('AI for codegen scaffolds and research drafts.');
    expect(whatIDoHtml).toContain('anything that ships under my name');
    // One representative line per remaining card proves each card carries support copy.
    expect(whatIDoHtml).toContain('end-to-end');
  });

  it('ships zero client JS and no raw hex', () => {
    expect(whatIDoHtml).not.toContain('<script');
    expect(whatIDoHtml).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('HowIWork', () => {
  it('renders the locked AI-boundary line verbatim', () => {
    expect(howIWorkHtml).toContain('AI for codegen scaffolds and research drafts.');
    expect(howIWorkHtml).toContain(
      'Not for architecture decisions, security review, or anything that ships under my name.',
    );
  });

  it('renders the three reliability steps with their labels', () => {
    const discovery = howIWorkHtml.indexOf('Discovery');
    const build = howIWorkHtml.indexOf('Build');
    const support = howIWorkHtml.indexOf('Support');
    expect(discovery).toBeGreaterThan(-1);
    expect(build).toBeGreaterThan(discovery);
    expect(support).toBeGreaterThan(build);
  });

  it('keeps every reliability step line at 12 words or fewer', () => {
    // Hard rule from research L-4, enforced at render time via the data attribute.
    const lines = [...howIWorkHtml.matchAll(/data-step-line[^>]*>([^<]+)</g)].map((m) => m[1]);
    expect(lines).toHaveLength(3);
    for (const line of lines) {
      expect((line ?? '').trim().split(/\s+/).length).toBeLessThanOrEqual(12);
    }
  });

  it('names Linear and links both public kit repos', () => {
    expect(howIWorkHtml).toContain('Linear');
    expect(howIWorkHtml).toContain(
      'href="https://github.com/kristijan-kresic-hvar/linear-pipeline-kit"',
    );
    expect(howIWorkHtml).toContain('href="https://github.com/kristijan-kresic-hvar/ai-review-kit"');
  });

  it('ships zero client JS and no raw hex', () => {
    expect(howIWorkHtml).not.toContain('<script');
    expect(howIWorkHtml).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('TechStack', () => {
  it('renders all four group labels', () => {
    expect(techStackHtml).toContain('Frontend');
    expect(techStackHtml).toContain('Backend');
    expect(techStackHtml).toContain('Tools');
    expect(techStackHtml).toContain('AI-augmented workflow');
  });

  it('renders every locked recruiter-search chip term verbatim', () => {
    const frontend = [
      'Next.js',
      'React.js',
      'Vue.js',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Tailwind CSS',
      'Sass',
      'HTML5',
      'CSS3',
    ];
    const backend = ['Node.js', 'PHP', 'REST APIs', 'OOP', 'PostgreSQL'];
    const tools = ['GitHub', 'CLI/Terminal', 'Vercel'];
    const ai = ['Claude', 'GPT', 'Codex', 'Cursor', 'Agentic coding'];
    for (const term of [...frontend, ...backend, ...tools, ...ai]) {
      expect(techStackHtml).toContain(term);
    }
    // "Git" as its own chip — substring check would pass via "GitHub" alone.
    expect(techStackHtml).toMatch(/>\s*Git\s*</);
  });

  it('renders chip terms inside rounded-full Chip pills', () => {
    expect(techStackHtml).toContain('rounded-full');
  });

  it('ships zero client JS and no raw hex', () => {
    expect(techStackHtml).not.toContain('<script');
    expect(techStackHtml).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});
