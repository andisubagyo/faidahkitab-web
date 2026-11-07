import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Ganti dengan alamat situs yang sebenarnya setelah online
// (misalnya https://faidahkitab.pages.dev atau domain sendiri).
export const SITE_URL = 'https://faidahkitab.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    // Catatan kaki [^1] didukung bawaan (GFM).
    gfm: true,
  },
});
