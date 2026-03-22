import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [tailwind(), icon()],
  redirects: {
    '/podcast': 'https://www.maderemarkable.com/blog',
  },
});
