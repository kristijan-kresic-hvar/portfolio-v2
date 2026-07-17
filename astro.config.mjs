// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kristijankresic.com',
  output: 'static',
  adapter: vercel(),
  redirects: {
    // speakable CV URL — the PDF is rendered by cv/render.sh into public/cv/
    '/cv': '/cv/kristijan-kresic-cv.pdf',
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
