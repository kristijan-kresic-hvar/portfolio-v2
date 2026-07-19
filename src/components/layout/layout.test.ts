import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import BrandMark from '@/components/layout/BrandMark.astro';
import PageHeader from '@/components/layout/PageHeader.astro';
import Footer from '@/components/layout/Footer.astro';
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
    expect(html).toContain('href="/about"');
    expect(html).toContain('Kristijan Krešić');
  });

  it('does not link Blog at launch (launch cut 2026-07-17; delete when Brief 001 ships)', async () => {
    const html = await renderNavAt('/');
    expect(html).not.toContain('href="/blog"');
  });

  it('renders the amber wordmark dot outside the accessible name', async () => {
    const html = await renderNavAt('/');
    expect(html).toMatch(/<span[^>]*class="text-accent"[^>]*aria-hidden="true"[^>]*>\.<\/span>/);
  });

  it('labels the brand link for the mobile mark', async () => {
    const html = await renderNavAt('/');
    expect(html).toMatch(
      /href="\/"[^>]*aria-label="Kristijan Krešić — home"|aria-label="Kristijan Krešić — home"[^>]*href="\/"/,
    );
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
    const html = await renderNavAt('/about');
    const active = html.match(/aria-current="page"/g) ?? [];
    expect(active).toHaveLength(1);
    expect(html).toMatch(/href="\/about"[^>]*aria-current="page"/);
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

describe('BrandMark', () => {
  it('renders a decorative token-filled svg', async () => {
    const html = await container.renderToString(BrandMark);
    expect(html).toContain('<svg');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('focusable="false"');
    expect(html).toContain('var(--color-accent)');
    expect(html).toContain('var(--color-text-primary)');
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('Footer', () => {
  const renderFooter = () => container.renderToString(Footer);

  it('renders a footer landmark with the copyright and build-time year', async () => {
    const html = await renderFooter();
    expect(html).toContain('<footer');
    expect(html).toContain(`© ${new Date().getFullYear()} Kristijan Krešić`);
  });

  it('echoes exactly the Nav route set plus Contact — no dead hrefs', async () => {
    const html = await renderFooter();
    expect(html).toContain('href="/work"');
    expect(html).toContain('href="/about"');
    expect(html).toContain('href="/contact"');
    expect(html).not.toContain('href="/blog"');
  });

  it('links GitHub and LinkedIn', async () => {
    const html = await renderFooter();
    expect(html).toContain('href="https://github.com/kristijan-kresic-hvar"');
    expect(html).toContain(
      'href="https://www.linkedin.com/in/kristijan-kre%C5%A1i%C4%87-2b1176154"',
    );
  });

  it('shows the email as plain text, never a mailto link (form is the primary contact path)', async () => {
    const html = await renderFooter();
    expect(html).toContain('hello@kristijankresic.com');
    expect(html).not.toContain('mailto:');
  });

  it('uses tokens only and ships zero JS', async () => {
    const html = await renderFooter();
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
    expect(html).not.toContain('<script');
  });

  it('renders the build-time freshness receipt in the meta line', async () => {
    const html = await renderFooter();
    // Loose on purpose: the date is build-time, only the label is stable.
    expect(html).toMatch(/Last deployed/);
  });
});

describe('PageHeader', () => {
  it('renders the title as the page h1 with an optional lead', async () => {
    const html = await container.renderToString(PageHeader, {
      props: { title: 'Work', description: 'Selected projects.' },
    });
    expect(html).toMatch(/<h1[^>]*>\s*Work\s*<\/h1>/);
    expect(html).toContain('Selected projects.');
    expect(html).toContain('<header');
  });

  it('renders a mono eyebrow above the title when provided', async () => {
    const html = await container.renderToString(PageHeader, {
      props: { title: 'Work', eyebrow: 'Case studies' },
    });
    expect(html).toContain('Case studies');
    expect(html.indexOf('Case studies')).toBeLessThan(html.indexOf('<h1'));
    expect(html).toContain('font-mono');
  });

  it('uses tokens only', async () => {
    const html = await container.renderToString(PageHeader, { props: { title: 'Work' } });
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});

describe('RootLayout', () => {
  const renderLayout = () =>
    container.renderToString(RootLayout, {
      // canonical passed explicitly: the container API drops astroConfig.site,
      // so the Astro.site-derived branch cannot run in tests
      props: { title: 't', canonical: 'https://example.com/' },
      request: new Request('https://example.com/'),
      slots: { default: 'page content' },
    });

  it('renders the Nav on every page', async () => {
    const html = await renderLayout();
    expect(html).toContain('<nav');
    expect(html).toContain('page content');
  });

  it('renders the Footer below the page content in a min-height shell', async () => {
    const html = await renderLayout();
    expect(html).toContain('<footer');
    expect(html.indexOf('page content')).toBeLessThan(html.indexOf('<footer'));
    expect(html).toMatch(/<body[^>]*class="[^"]*min-h-dvh[^"]*"/);
  });

  it('wraps page content in the single main landmark', async () => {
    const html = await renderLayout();
    expect(html).toMatch(/<main id="main"[^>]*class="[^"]*flex-1[^"]*"[^>]*>\s*page content/);
    expect(html.match(/<main/g)).toHaveLength(1);
    // programmatically focusable so the skip link lands reliably across browser/AT combos
    expect(html).toMatch(/<main[^>]*tabindex="-1"/);
  });

  it('renders a skip link to #main before the Nav', async () => {
    const html = await renderLayout();
    expect(html).toContain('href="#main"');
    expect(html.indexOf('href="#main"')).toBeLessThan(html.indexOf('<nav'));
  });
});
