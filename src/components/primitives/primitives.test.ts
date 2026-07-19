import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';

import Button from '@/components/primitives/Button.astro';
import Card from '@/components/primitives/Card.astro';
import Chip from '@/components/primitives/Chip.astro';
import Container from '@/components/primitives/Container.astro';
import Link from '@/components/primitives/Link.astro';
import Section from '@/components/primitives/Section.astro';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Button', () => {
  it('renders a <button type="button"> by default', async () => {
    const html = await container.renderToString(Button, { slots: { default: 'Click' } });
    expect(html).toContain('<button');
    expect(html).toContain('type="button"');
    expect(html).toContain('Click');
  });

  it('renders an <a> when href is passed', async () => {
    const html = await container.renderToString(Button, {
      props: { href: '/contact' },
      slots: { default: 'Hire me' },
    });
    expect(html).toContain('<a');
    expect(html).toContain('href="/contact"');
    expect(html).not.toContain('<button');
  });

  it('applies the primary variant by default and secondary on request', async () => {
    const primary = await container.renderToString(Button, { slots: { default: 'x' } });
    const secondary = await container.renderToString(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'x' },
    });
    expect(primary).toContain('bg-accent');
    expect(secondary).not.toContain('bg-accent');
  });

  it('renders a visually muted disabled state', async () => {
    const html = await container.renderToString(Button, {
      props: { disabled: true },
      slots: { default: 'x' },
    });
    expect(html).toContain('disabled');
    expect(html).toContain('disabled:cursor-not-allowed');
    expect(html).toContain('disabled:bg-bg-elev-2');
  });

  it('passes through extra attributes and class', async () => {
    const html = await container.renderToString(Button, {
      props: { type: 'submit', 'aria-label': 'Send', class: 'mt-4' },
      slots: { default: 'Send' },
    });
    expect(html).toContain('type="submit"');
    expect(html).toContain('aria-label="Send"');
    expect(html).toContain('mt-4');
  });
});

describe('Link', () => {
  it('renders an accent-underlined <a>', async () => {
    const html = await container.renderToString(Link, {
      props: { href: '/blog' },
      slots: { default: 'Read' },
    });
    expect(html).toContain('<a');
    expect(html).toContain('href="/blog"');
    expect(html).toContain('underline');
  });
});

describe('Chip', () => {
  it('is neutral by default and accent-tinted on request', async () => {
    const neutral = await container.renderToString(Chip, { slots: { default: 'Astro' } });
    const accent = await container.renderToString(Chip, {
      props: { variant: 'accent' },
      slots: { default: 'Astro' },
    });
    expect(neutral).toContain('rounded-full');
    expect(neutral).not.toContain('bg-accent-subtle');
    expect(accent).toContain('bg-accent-subtle');
  });
});

describe('Card', () => {
  it('renders base surface by default and elevated on request', async () => {
    const base = await container.renderToString(Card, { slots: { default: 'body' } });
    const elevated = await container.renderToString(Card, {
      props: { elevated: true },
      slots: { default: 'body' },
    });
    expect(base).toContain('rounded-lg');
    expect(base).not.toContain('bg-bg-elev-1');
    expect(elevated).toContain('bg-bg-elev-1');
  });
});

describe('Section', () => {
  it('renders a <section> with responsive vertical padding', async () => {
    const html = await container.renderToString(Section, { slots: { default: 'content' } });
    expect(html).toContain('<section');
    expect(html).toContain('py-12');
  });
});

describe('Container', () => {
  it('defaults to the 1200px content width and supports reading/wide', async () => {
    const def = await container.renderToString(Container, { slots: { default: 'c' } });
    const reading = await container.renderToString(Container, {
      props: { width: 'reading' },
      slots: { default: 'c' },
    });
    expect(def).toContain('max-w-content');
    expect(reading).toContain('max-w-reading');
    expect(def).toContain('mx-auto');
  });
});
