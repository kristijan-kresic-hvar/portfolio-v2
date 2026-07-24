import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { createComponent, renderSlot, renderTemplate } from 'astro/runtime/server/index.js';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// The listing pages call getCollection() at render time, so empty vs populated
// can't be driven by real content files — mock the collection instead. The mock
// applies whatever filter predicate the page passes so the draft-exclusion tests
// exercise the page's own `!data.draft` filter rather than passing vacuously.
type MockEntry = { id: string; data: Record<string, unknown> };

const { getCollectionMock } = vi.hoisted(() => ({ getCollectionMock: vi.fn() }));

vi.mock('astro:content', () => ({ getCollection: getCollectionMock }));

// RootLayout computes a canonical URL from Astro.site, which the container API
// never populates (createManifest omits `site`) — so a full page render through
// the real layout throws "Invalid URL". Stub it to a slot passthrough; the
// listing body under test is what the page itself renders, and RootLayout/Nav/
// Footer have their own suites.
vi.mock('@/layouts/RootLayout.astro', () => ({
  default: createComponent(
    (result, _props, slots) => renderTemplate`${renderSlot(result, slots?.default)}`,
  ),
}));

import BlogIndex from '@/pages/blog/index.astro';
import WorkIndex from '@/pages/work/index.astro';

const seed = (entries: MockEntry[]) =>
  getCollectionMock.mockImplementation(
    async (_collection: string, filter?: (entry: MockEntry) => unknown) =>
      filter ? entries.filter(filter) : entries,
  );

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

beforeEach(() => {
  getCollectionMock.mockReset();
});

const renderWork = () =>
  container.renderToString(WorkIndex, { request: new Request('https://example.com/work') });

const renderBlog = () =>
  container.renderToString(BlogIndex, { request: new Request('https://example.com/blog') });

const UNLINKED_WORK =
  'Work entries must stay unlinked until KKD-22 AC#1 ships /work/[id]. An href="/work/<slug>" here means the detail route landed — link the entries in work/index.astro and delete this guard.';
const UNLINKED_BLOG =
  'Blog entries must stay unlinked until KKD-22 AC#1 ships /blog/[id]. An href="/blog/<slug>" here means the detail route landed — link the entries in blog/index.astro and delete this guard.';

describe('work/index.astro', () => {
  it('renders the empty-state copy and no list when the collection is empty', async () => {
    seed([]);
    const html = await renderWork();
    expect(html).toContain('Case studies are being written. Check back soon.');
    expect(html).not.toContain('<ul');
  });

  it('renders one item per non-draft entry with title and summary', async () => {
    seed([
      { id: 'beta', data: { title: 'Beta', summary: 'Second study.', order: 2, draft: false } },
      { id: 'alpha', data: { title: 'Alpha', summary: 'First study.', order: 1, draft: false } },
      { id: 'gamma', data: { title: 'Gamma', summary: 'Third study.', order: 3, draft: false } },
    ]);
    const html = await renderWork();
    expect(html).toContain('<ul');
    expect(html.match(/<li/g)).toHaveLength(3);
    expect(html).toContain('Alpha');
    expect(html).toContain('First study.');
    expect(html).toContain('Gamma');
    expect(html).toContain('Third study.');
  });

  it('excludes draft entries', async () => {
    seed([
      { id: 'live', data: { title: 'Live Study', summary: 'Shown.', order: 2, draft: false } },
      { id: 'draft', data: { title: 'Draft Study', summary: 'Hidden.', order: 1, draft: true } },
    ]);
    const html = await renderWork();
    expect(html).toContain('Live Study');
    expect(html).not.toContain('Draft Study');
    expect(html.match(/<li/g)).toHaveLength(1);
  });

  it('orders entries by ascending `order`', async () => {
    seed([
      { id: 'gamma', data: { title: 'Gamma', summary: 'g', order: 3, draft: false } },
      { id: 'alpha', data: { title: 'Alpha', summary: 'a', order: 1, draft: false } },
      { id: 'beta', data: { title: 'Beta', summary: 'b', order: 2, draft: false } },
    ]);
    const html = await renderWork();
    expect(html.indexOf('Alpha')).toBeLessThan(html.indexOf('Beta'));
    expect(html.indexOf('Beta')).toBeLessThan(html.indexOf('Gamma'));
  });

  it('renders entries unlinked — tripwire for KKD-22 AC#1', async () => {
    seed([{ id: 'alpha', data: { title: 'Alpha', summary: 'a', order: 1, draft: false } }]);
    const html = await renderWork();
    expect(html, UNLINKED_WORK).not.toContain('href="/work/');
  });
});

describe('blog/index.astro', () => {
  it('renders the empty-state copy and no list when the collection is empty', async () => {
    seed([]);
    const html = await renderBlog();
    expect(html).toContain('The first issue is on the way.');
    expect(html).not.toContain('<ul');
  });

  it('renders one item per non-draft post with title and summary', async () => {
    seed([
      {
        id: 'newer',
        data: {
          type: 'brief',
          title: 'Newer Post',
          summary: 'Recent.',
          date: new Date('2026-06-01'),
          draft: false,
        },
      },
      {
        id: 'older',
        data: {
          type: 'brief',
          title: 'Older Post',
          summary: 'Earlier.',
          date: new Date('2026-01-01'),
          draft: false,
        },
      },
    ]);
    const html = await renderBlog();
    expect(html).toContain('<ul');
    expect(html.match(/<li/g)).toHaveLength(2);
    expect(html).toContain('Newer Post');
    expect(html).toContain('Recent.');
    expect(html).toContain('<time datetime="2026-06-01"');
  });

  it('excludes draft posts', async () => {
    seed([
      {
        id: 'live',
        data: {
          type: 'brief',
          title: 'Live Post',
          summary: 'Shown.',
          date: new Date('2026-06-01'),
          draft: false,
        },
      },
      {
        id: 'draft',
        data: {
          type: 'brief',
          title: 'Draft Post',
          summary: 'Hidden.',
          date: new Date('2026-12-01'),
          draft: true,
        },
      },
    ]);
    const html = await renderBlog();
    expect(html).toContain('Live Post');
    expect(html).not.toContain('Draft Post');
    expect(html.match(/<li/g)).toHaveLength(1);
  });

  it('orders posts by descending date', async () => {
    seed([
      {
        id: 'older',
        data: {
          type: 'brief',
          title: 'Older Post',
          summary: 'o',
          date: new Date('2026-01-01'),
          draft: false,
        },
      },
      {
        id: 'newer',
        data: {
          type: 'brief',
          title: 'Newer Post',
          summary: 'n',
          date: new Date('2026-06-01'),
          draft: false,
        },
      },
    ]);
    const html = await renderBlog();
    expect(html.indexOf('Newer Post')).toBeLessThan(html.indexOf('Older Post'));
  });

  it('renders posts unlinked — tripwire for KKD-22 AC#1', async () => {
    seed([
      {
        id: 'live',
        data: {
          type: 'brief',
          title: 'Live Post',
          summary: 'n',
          date: new Date('2026-06-01'),
          draft: false,
        },
      },
    ]);
    const html = await renderBlog();
    expect(html, UNLINKED_BLOG).not.toContain('href="/blog/');
  });
});
