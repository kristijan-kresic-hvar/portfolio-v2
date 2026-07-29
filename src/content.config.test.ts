import { describe, expect, it } from 'vitest';

import { blogSchema, workSchema } from '@/content.config';

describe('workSchema', () => {
  it('parses valid frontmatter and applies defaults', () => {
    const parsed = workSchema.parse({
      title: 'Acme redesign',
      summary: 'Rebuilt the marketing site.',
      role: 'Lead engineer',
      stack: ['Astro', 'Tailwind'],
      year: 2026,
    });

    expect(parsed.draft).toBe(false);
    expect(parsed.featured).toBe(false);
    expect(parsed.links).toEqual({});
  });

  it('parses live and repo links and rejects non-url values', () => {
    const parsed = workSchema.parse({
      title: 'Acme redesign',
      summary: 'Rebuilt the marketing site.',
      role: 'Lead engineer',
      stack: ['Astro'],
      year: 2026,
      links: { live: 'https://example.com', repo: 'https://github.com/acme/site' },
    });

    expect(parsed.links.live).toBe('https://example.com');

    expect(() =>
      workSchema.parse({
        title: 'x',
        summary: 'x',
        role: 'x',
        stack: [],
        year: 2026,
        links: { live: 'not-a-url' },
      }),
    ).toThrow();
  });

  it('parses the cover composition fields', () => {
    const parsed = workSchema.parse({
      title: 'Acme redesign',
      summary: 'Rebuilt the marketing site.',
      role: 'Lead engineer',
      stack: ['Astro'],
      year: 2026,
      cover: 'acme-dashboard.webp',
      coverPeek: 'acme-detail.webp',
      coverAlt: 'Acme dashboard overview',
    });

    expect(parsed.cover).toBe('acme-dashboard.webp');
    expect(parsed.coverPeek).toBe('acme-detail.webp');
    expect(parsed.coverAlt).toBe('Acme dashboard overview');
  });

  it('parses the case-study template fields and leaves them optional', () => {
    const base = {
      title: 'Acme redesign',
      summary: 'Rebuilt the marketing site.',
      role: 'Lead engineer',
      stack: ['Astro'],
      year: 2026,
    };

    const parsed = workSchema.parse({
      ...base,
      constraint: 'No CMS · 6-week window',
      retrospective: 'I would cut the second nav tier sooner.',
      cta: 'Need similar work?',
    });

    expect(parsed.constraint).toBe('No CMS · 6-week window');
    expect(parsed.retrospective).toBe('I would cut the second nav tier sooner.');
    expect(parsed.cta).toBe('Need similar work?');

    const bare = workSchema.parse(base);
    expect(bare.constraint).toBeUndefined();
    expect(bare.retrospective).toBeUndefined();
    expect(bare.cta).toBeUndefined();
  });

  it('rejects frontmatter missing a required title', () => {
    expect(() =>
      workSchema.parse({
        summary: 'x',
        role: 'x',
        stack: [],
        year: 2026,
      }),
    ).toThrow();
  });
});

describe('blogSchema', () => {
  it('coerces date strings and defaults tags', () => {
    const parsed = blogSchema.parse({
      type: 'brief',
      title: 'Issue 1',
      summary: 'first brief',
      date: '2026-01-01',
    });

    expect(parsed.date).toBeInstanceOf(Date);
    expect(parsed.tags).toEqual([]);
  });

  it('rejects a type outside the enum', () => {
    expect(() =>
      blogSchema.parse({
        type: 'newsletter',
        title: 'x',
        summary: 'x',
        date: '2026-01-01',
      }),
    ).toThrow();
  });
});
