import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import Nav from '@/components/layout/Nav.astro';
import RootLayout from '@/layouts/RootLayout.astro';

let container: AstroContainer;

const renderNavAt = (pathname: string) =>
  container.renderToString(Nav, { request: new Request(`https://example.com${pathname}`) });

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Nav', () => {
  it('renders the wordmark home link and all top-level routes', async () => {
    const html = await renderNavAt('/');
    expect(html).toContain('<nav');
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/blog"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('Kristijan Krešić');
  });

  it('renders Contact as an accent Button link', async () => {
    const html = await renderNavAt('/');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('bg-accent');
  });

  it('is sticky with a blurred backdrop, tokens only', async () => {
    const html = await renderNavAt('/');
    expect(html).toContain('sticky');
    expect(html).toContain('backdrop-blur');
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });

  it('marks only the current route active via aria-current', async () => {
    const html = await renderNavAt('/blog');
    const active = html.match(/aria-current="page"/g) ?? [];
    expect(active).toHaveLength(1);
    expect(html).toMatch(/href="\/blog"[^>]*aria-current="page"/);
  });

  it('treats nested paths as active for their section', async () => {
    const html = await renderNavAt('/work/some-case-study');
    expect(html).toMatch(/href="\/work"[^>]*aria-current="page"/);
  });

  it('does not activate a section for sibling path prefixes', async () => {
    const html = await renderNavAt('/workshop');
    expect(html).not.toContain('aria-current');
  });

  it('marks no route active on the home page (wordmark is home)', async () => {
    const html = await renderNavAt('/');
    expect(html).not.toContain('aria-current');
  });

  it('ships zero JS — no entrance animation to gate on reduced motion', async () => {
    const html = await renderNavAt('/');
    expect(html).not.toContain('<script');
  });
});

describe('RootLayout', () => {
  it('renders the Nav on every page', async () => {
    const html = await container.renderToString(RootLayout, {
      // canonical passed explicitly: the container API drops astroConfig.site,
      // so the Astro.site-derived branch cannot run in tests
      props: { title: 't', canonical: 'https://example.com/' },
      request: new Request('https://example.com/'),
      slots: { default: 'page content' },
    });
    expect(html).toContain('<nav');
    expect(html).toContain('page content');
  });
});
