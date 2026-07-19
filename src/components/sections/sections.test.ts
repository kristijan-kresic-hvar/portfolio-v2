import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import Hero from '@/components/sections/Hero.astro';
import TrustStrip from '@/components/sections/TrustStrip.astro';

let container: AstroContainer;
let html: string;
let trustStripHtml: string;

beforeAll(async () => {
  container = await AstroContainer.create();
  html = await container.renderToString(Hero);
  trustStripHtml = await container.renderToString(TrustStrip);
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
