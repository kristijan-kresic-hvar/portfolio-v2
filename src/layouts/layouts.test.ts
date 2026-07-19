import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import BlogLayout from '@/layouts/BlogLayout.astro';
import WorkLayout from '@/layouts/WorkLayout.astro';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

// canonical passed explicitly: the container API drops astroConfig.site,
// so RootLayout's Astro.site-derived branch cannot run in tests
const workProps = {
  title: 'Case Study',
  description: 'What was built and why.',
  canonical: 'https://example.com/work/case-study/',
};

const renderWork = (slots: Record<string, string> = { default: 'case body' }) =>
  container.renderToString(WorkLayout, {
    props: workProps,
    request: new Request('https://example.com/work/case-study/'),
    slots,
  });

const blogProps = {
  title: 'Post Title',
  description: 'Post summary.',
  date: new Date('2026-07-19'),
  readingTime: '4 min read',
  canonical: 'https://example.com/blog/post/',
};

const renderBlog = (props: Record<string, unknown> = blogProps) =>
  container.renderToString(BlogLayout, {
    props,
    request: new Request('https://example.com/blog/post/'),
    slots: { default: 'post body' },
  });

describe('WorkLayout', () => {
  it('renders the frontmatter title as the single page h1, into head via RootLayout', async () => {
    const html = await renderWork();
    expect(html).toContain('<title>Case Study</title>');
    expect(html).toMatch(/<h1[^>]*>Case Study<\/h1>/);
    expect(html.match(/<h1/g)).toHaveLength(1);
  });

  it('renders an article with a header and the prose body in the reading column', async () => {
    const html = await renderWork();
    expect(html).toContain('<article');
    expect(html).toContain('<header');
    expect(html).toMatch(/max-w-reading/);
    expect(html).toMatch(/class="[^"]*prose[^"]*"[^>]*>\s*case body/);
  });

  it('renders the meta slot in the header', async () => {
    const html = await renderWork({ default: 'case body', meta: '<p>Role · Stack · 2026</p>' });
    expect(html).toContain('Role · Stack · 2026');
    expect(html.indexOf('Role · Stack')).toBeLessThan(html.indexOf('case body'));
  });

  it('renders the wide-breakout slot in a wide container only when provided', async () => {
    const withWide = await renderWork({ default: 'case body', wide: '<div>wide shot</div>' });
    expect(withWide).toMatch(/max-w-wide/);
    const withoutWide = await renderWork();
    // Nav/Footer chrome uses max-w-wide too, so count containers instead
    expect(withWide.match(/max-w-wide/g)!.length).toBeGreaterThan(
      withoutWide.match(/max-w-wide/g)!.length,
    );
  });

  it('uses tokens only and ships zero JS', async () => {
    const html = await renderWork();
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(html).not.toContain('<script');
  });
});

describe('BlogLayout', () => {
  it('renders the frontmatter title as the single page h1, into head via RootLayout', async () => {
    const html = await renderBlog();
    expect(html).toContain('<title>Post Title</title>');
    expect(html).toMatch(/<h1[^>]*>Post Title<\/h1>/);
    expect(html.match(/<h1/g)).toHaveLength(1);
  });

  it('renders the date as a machine-readable time element', async () => {
    const html = await renderBlog();
    expect(html).toMatch(/<time[^>]*datetime="2026-07-19"/);
    expect(html).toContain('July 19, 2026');
  });

  it('renders reading time when provided and omits it when absent', async () => {
    const withRt = await renderBlog();
    expect(withRt).toContain('4 min read');
    const { readingTime: _readingTime, ...rest } = blogProps;
    const withoutRt = await renderBlog(rest);
    expect(withoutRt).not.toContain('min read');
  });

  it('renders the prose body in the reading column', async () => {
    const html = await renderBlog();
    expect(html).toMatch(/max-w-reading/);
    expect(html).toMatch(/class="[^"]*prose[^"]*"[^>]*>\s*post body/);
  });

  it('uses tokens only and ships zero JS', async () => {
    const html = await renderBlog();
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(html).not.toContain('<script');
  });
});
