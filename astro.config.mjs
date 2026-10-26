import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: process.env.SITE_URL || 'https://vorti.quest',
  output: 'static', trailingSlash: 'always',
  // Keep browser scripts external so they work with script-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    { name: 'local-draft-policy', hooks: {
      'astro:config:setup': ({ command, updateConfig }) => {
        updateConfig({ vite: { define: { __BLOG_LOCAL_DRAFTS__: JSON.stringify(command === 'dev') } } });
      },
    } },
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
});
