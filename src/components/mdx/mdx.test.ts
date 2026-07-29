import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import Callout from '@/components/mdx/Callout.astro';
import ConstraintLedger from '@/components/mdx/ConstraintLedger.astro';
import PullQuote from '@/components/mdx/PullQuote.astro';
import RejectedPath from '@/components/mdx/RejectedPath.astro';
import Screenshot from '@/components/mdx/Screenshot.astro';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

const render = (Component: Parameters<AstroContainer['renderToString']>[0], options = {}) =>
  container.renderToString(Component, options);

describe('Screenshot', () => {
  it('renders a figure with its caption', async () => {
    const html = await render(Screenshot, {
      props: {
        src: 'naitur-forms.webp',
        alt: 'Naitur forms catalog',
        caption: 'The forms catalog, filtered by assessment scale.',
      },
    });
    expect(html).toContain('<figure');
    expect(html).toContain('<figcaption');
    expect(html).toContain('The forms catalog, filtered by assessment scale.');
  });

  it('refuses to build with an empty alt on its primary image', async () => {
    await expect(
      render(Screenshot, {
        props: { src: 'naitur-forms.webp', alt: '   ', caption: 'A screen.' },
      }),
    ).rejects.toThrow(/non-empty alt/);
  });

  it('renders the decorative peek as alt="" + aria-hidden without throwing', async () => {
    const html = await render(Screenshot, {
      props: {
        src: 'naitur-forms.webp',
        alt: 'Naitur forms catalog',
        caption: 'A screen.',
        variant: 'hero',
        peek: 'naitur-peek.webp',
      },
    });
    expect(html).toContain('aria-hidden="true"');
    // Astro serializes an empty alt as a bare `alt` attribute, so count the
    // ones carrying text: only the primary image may describe anything.
    expect(html.match(/alt="[^"]+"/g)).toHaveLength(1);
  });

  it('marks the hero variant as the LCP element', async () => {
    const html = await render(Screenshot, {
      props: {
        src: 'naitur-forms.webp',
        alt: 'Naitur forms catalog',
        caption: 'A screen.',
        variant: 'hero',
      },
    });
    expect(html).toContain('fetchpriority="high"');
    expect(html).not.toContain('loading="lazy"');
    expect(html).toMatch(/width="\d+"/);
  });

  it('lazy-loads the body variant and still emits an explicit width', async () => {
    const html = await render(Screenshot, {
      props: { src: 'naitur-forms.webp', alt: 'Naitur forms catalog', caption: 'A screen.' },
    });
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain('fetchpriority');
    expect(html).toMatch(/width="\d+"/);
  });

  it('renders the FIG index as plain text when fig is set', async () => {
    const html = await render(Screenshot, {
      props: {
        src: 'naitur-forms.webp',
        alt: 'Naitur forms catalog',
        caption: 'A screen.',
        fig: 3,
      },
    });
    expect(html).toContain('FIG 03 —');
  });

  it('renders an https:// src as a plain img with explicit width and height', async () => {
    const html = await render(Screenshot, {
      props: {
        src: 'https://placehold.co/2400x1500/141416/f59e0b?text=Naitur',
        alt: 'Naitur placeholder',
        caption: 'Placeholder until the harvest asset lands.',
      },
    });
    expect(html).toContain('<img');
    expect(html).not.toContain('<source');
    expect(html).toContain('width="960"');
    expect(html).toContain('height="600"');
  });

  it('sets data-breakout only when asked', async () => {
    const props = { src: 'naitur-forms.webp', alt: 'Naitur forms catalog', caption: 'A screen.' };
    expect(await render(Screenshot, { props: { ...props, breakout: true } })).toContain(
      'data-breakout',
    );
    expect(await render(Screenshot, { props })).not.toContain('data-breakout');
  });
});

describe('RejectedPath', () => {
  it('renders all three of considered, chose and because', async () => {
    const html = await render(RejectedPath, {
      props: {
        considered: 'A queue-backed worker',
        chose: 'A synchronous write path',
        because: 'the audit trail had to be readable in one place',
      },
    });
    expect(html).toContain('A queue-backed worker');
    expect(html).toContain('A synchronous write path');
    expect(html).toContain('the audit trail had to be readable in one place');
  });
});

describe('ConstraintLedger', () => {
  it("splits Naitur's locked one-string constraint into an ol of three li", async () => {
    const html = await render(ConstraintLedger, {
      props: {
        summary:
          'HIPAA + state-level compliance · no existing playbook · 6-month initial delivery window',
      },
    });
    expect(html).toContain('<ol');
    expect(html.match(/<li/g)).toHaveLength(3);
    expect(html).toContain('HIPAA + state-level compliance');
    expect(html).toContain('no existing playbook');
    expect(html).toContain('6-month initial delivery window');
  });

  it('renders an items array one row per item', async () => {
    const html = await render(ConstraintLedger, {
      props: { items: ['Legacy Laravel monolith', 'Zero downtime window'] },
    });
    expect(html.match(/<li/g)).toHaveLength(2);
  });

  it('passes slotted li children through unchanged', async () => {
    const html = await render(ConstraintLedger, {
      slots: { default: '<li>Hand-authored row</li>' },
    });
    expect(html).toContain('<ol');
    expect(html).toContain('<li>Hand-authored row</li>');
  });

  it('renders nothing when the frontmatter field is absent', async () => {
    expect((await render(ConstraintLedger, { props: { summary: undefined } })).trim()).toBe('');
  });
});

describe('Callout', () => {
  it('renders its text', async () => {
    const html = await render(Callout, { props: { text: 'What I would do differently.' } });
    expect(html).toContain('What I would do differently.');
  });

  it('renders nothing when the frontmatter field is absent', async () => {
    expect((await render(Callout, { props: { text: undefined } })).trim()).toBe('');
  });
});

describe('PullQuote', () => {
  it('emits a blockquote plus a figcaption carrying the attribution', async () => {
    const html = await render(PullQuote, {
      props: { attribution: 'Frane Žunić, Full Stack Developer' },
      slots: { default: 'Great to build with.' },
    });
    expect(html).toContain('<blockquote');
    expect(html).toContain('Great to build with.');
    expect(html).toMatch(/<figcaption[^>]*>Frane Žunić, Full Stack Developer<\/figcaption>/);
  });
});

describe('the mdx component set', () => {
  it('ships zero client JS and no raw hex', async () => {
    const rendered = await Promise.all([
      render(Screenshot, {
        props: { src: 'naitur-forms.webp', alt: 'Naitur forms catalog', caption: 'A screen.' },
      }),
      render(RejectedPath, { props: { considered: 'a', chose: 'b', because: 'c' } }),
      render(ConstraintLedger, { props: { summary: 'a · b' } }),
      render(Callout, { props: { text: 'a' } }),
      render(PullQuote, { props: { attribution: 'a' }, slots: { default: 'q' } }),
    ]);
    for (const html of rendered) {
      // KKD-47 carries the sanctioned-script authorization for this surface —
      // rewrite this expectation when the progress bar or the morph lands.
      expect(html).not.toContain('<script');
      expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
    }
  });
});
