import { getViteConfig } from 'astro/config';

// getViteConfig wires Astro's resolved Vite pipeline (astro:* virtual modules,
// tsconfig @/ aliases, Tailwind v4 + React plugins) so component and content
// tests run against the same setup as the build.
export default getViteConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
