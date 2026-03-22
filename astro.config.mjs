import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  redirects: {
    '/podcast': 'https://www.maderemarkable.com/blog',
  },
});
