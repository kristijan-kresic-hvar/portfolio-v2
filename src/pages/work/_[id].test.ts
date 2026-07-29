import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { createComponent, renderSlot, renderTemplate } from 'astro/runtime/server/index.js';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// getCollection() resolves empty under vitest (the content layer isn't hydrated
// in test mode), so a getStaticPaths-driven route can't be tested against real
// content. The mock replaces render() too, which means this seam sees NO MDX
// body — body assertions belong on a direct `import … from '*.mdx'` instead.
type MockEntry = { id: string; data: Record<string, unknown> };

const { getCollectionMock } = vi.hoisted(() => ({ getCollectionMock: vi.fn() }));

vi.mock('astro:content', () => ({
  getCollection: getCollectionMock,
  render: async () => ({
    Content: createComponent(() => renderTemplate`<p>mdx body</p>`),
  }),
}));

// RootLayout derives a canonical URL from Astro.site, which the container API
// never populates — stub it to a slot passthrough (same idiom as _pages.test.ts).
vi.mock('@/layouts/RootLayout.astro', () => ({
  default: createComponent(
    (result, _props, slots) => renderTemplate`${renderSlot(result, slots?.default)}`,
  ),
}));

import WorkDetail, { getStaticPaths } from '@/pages/work/[id].astro';

const entry = (id: string, data: Record<string, unknown> = {}): MockEntry => ({
  id,
  data: {
    title: id,
    summary: `${id} summary.`,
    role: 'Full-stack developer',
    stack: ['Astro', 'Tailwind'],
    year: 2026,
    draft: false,
    links: {},
    ...data,
  },
});

const seed = (entries: MockEntry[]) =>
  getCollectionMock.mockImplementation(
    async (_collection: string, filter?: (e: MockEntry) => unknown) =>
      filter ? entries.filter(filter) : entries,
  );

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

beforeEach(() => {
  getCollectionMock.mockReset();
});

const renderPath = (props: unknown) =>
  container.renderToString(WorkDetail, {
    props: props as Record<string, unknown>,
    request: new Request('https://example.com/work/naitur'),
  });

describe('getStaticPaths', () => {
  it('yields one path per non-draft entry and zero for draft entries', async () => {
    seed([
      entry('naitur', { order: 1 }),
      entry('hidden', { order: 2, draft: true }),
      entry('vetster', { order: 3 }),
    ]);
    const paths = await getStaticPaths();
    expect(paths.map((path) => path.params.id)).toEqual(['naitur', 'vetster']);
  });

  it('orders paths by ascending `order`, unordered entries last', async () => {
    seed([entry('third'), entry('first', { order: 1 }), entry('second', { order: 2 })]);
    const paths = await getStaticPaths();
    expect(paths.map((path) => path.params.id)).toEqual(['first', 'second', 'third']);
  });

  it('walks prev/next without wrap-around', async () => {
    seed([entry('a', { order: 1 }), entry('b', { order: 2 }), entry('c', { order: 3 })]);
    const [first, middle, last] = await getStaticPaths();
    expect(first!.props.prev).toBeUndefined();
    expect(first!.props.next?.id).toBe('b');
    expect(middle!.props.prev?.id).toBe('a');
    expect(middle!.props.next?.id).toBe('c');
    expect(last!.props.next).toBeUndefined();
  });

  it('includes non-featured entries', async () => {
    seed([entry('quiet', { order: 1, featured: false })]);
    const paths = await getStaticPaths();
    expect(paths).toHaveLength(1);
  });
});

describe('work/[id].astro', () => {
  const seedSlate = () =>
    seed([
      entry('naitur', {
        title: 'Naitur',
        order: 1,
        outcome: '100+ facilitators and 15+ clinics onboarded in week one',
        cover: 'naitur-forms.webp',
        coverPeek: 'naitur-peek.webp',
        coverAlt: 'Naitur forms catalog',
        links: { live: 'https://naitur.com', repo: 'https://github.com/acme/naitur' },
      }),
      entry('biocirv', { title: 'BioCirV', order: 2, cover: 'biocirv-discover.webp' }),
      entry('vetster', { title: 'Vetster', order: 3, cta: 'Need a telehealth build?' }),
    ]);

  const at = async (index: number) => {
    seedSlate();
    const paths = await getStaticPaths();
    return renderPath(paths[index]!.props);
  };

  it('renders the title as the page h1, exactly once', async () => {
    const html = await at(0);
    expect(html).toMatch(/<h1[^>]*>Naitur<\/h1>/);
    expect(html.match(/<h1/g)).toHaveLength(1);
  });

  it('renders the meta strip as a real dl, never a joined dot-row', async () => {
    const html = await at(0);
    expect(html).toContain('<dl');
    expect(html).toContain('<dt');
    expect(html).toContain('Role');
    expect(html).toContain('Stack');
    expect(html).toContain('Year');
    expect(html).toContain('Full-stack developer');
    expect(html).toContain('2026');
  });

  it('renders the outcome line and drops the row when the field is absent', async () => {
    expect(await at(0)).toContain('100+ facilitators and 15+ clinics onboarded in week one');
    expect(await at(1)).not.toContain('Outcome');
  });

  it('renders the live and repo links only when the fields exist', async () => {
    const withLinks = await at(0);
    expect(withLinks).toContain('href="https://naitur.com"');
    expect(withLinks).toContain('rel="noopener noreferrer"');
    expect(withLinks).toContain('Live site');
    expect(withLinks).toContain('Code');
    expect(await at(1)).not.toContain('Live site');
  });

  it('renders the hero figure from the cover fields', async () => {
    const html = await at(0);
    expect(html).toContain('<figure');
    expect(html).toContain('Naitur forms catalog');
    expect(html).toContain('fetchpriority="high"');
    expect(html.match(/fetchpriority="high"/g)).toHaveLength(1);
  });

  it('falls back to a placeholder hero when the entry has no cover', async () => {
    const html = await at(2);
    expect(html).toContain('placehold.co');
  });

  it('renders the mdx body inside the layout', async () => {
    expect(await at(0)).toContain('<p>mdx body</p>');
  });

  it('renders the mini-CTA from frontmatter, falling back to the route default', async () => {
    expect(await at(0)).toContain('Need similar work?');
    expect(await at(2)).toContain('Need a telehealth build?');
  });

  it('routes the CTA intent from the literal map, defaulting to project', async () => {
    expect(await at(0)).toContain('href="/contact?intent=hire"');
    seed([entry('unmapped', { order: 1 })]);
    const paths = await getStaticPaths();
    expect(await renderPath(paths[0]!.props)).toContain('href="/contact?intent=project"');
  });

  it('renders prev/next links with no wrap-around', async () => {
    const first = await at(0);
    expect(first).not.toContain('href="/work/vetster"');
    expect(first).toContain('href="/work/biocirv"');

    const last = await at(2);
    expect(last).toContain('href="/work/biocirv"');
    expect(last).not.toContain('href="/work/naitur"');
  });

  it('does not import CtaBand — the mini-CTA is composed inline', async () => {
    const html = await at(0);
    expect(html).not.toContain('Hiring a senior developer?');
    expect(html).not.toContain('Have a project that needs shipping?');
  });

  it('ships zero client JS', async () => {
    // KKD-47 carries the sanctioned-script authorization for this surface
    // (progress bar, view-transition morph) — rewrite this when it lands.
    expect(await at(0)).not.toContain('<script');
  });
});
