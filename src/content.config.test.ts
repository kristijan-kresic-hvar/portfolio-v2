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
