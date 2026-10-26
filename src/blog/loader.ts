import { readdir, readFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Loader } from 'astro/loaders';
import { articleId, parseArticle, visibleArticle } from './model.ts';

// Filter before rendering or registering images, not just when generating routes.
export function articleLoader(includeDrafts: boolean): Loader {
  return {
    name: 'vortiquest-articles',
    async load(context) {
      const root = fileURLToPath(context.config.root);
      const directory = resolve(root, 'src/content/blog');
      async function sync() {
        const files = (await readdir(directory)).filter(file => file.endsWith('.md')).sort();
        const entries = await Promise.all(files.map(async filename => {
          const absolute = resolve(directory, filename);
          const contents = await readFile(absolute, 'utf8');
          return { id: articleId(filename), absolute, contents, ...parseArticle(contents, filename) };
        }));
        context.store.clear();
        for (const entry of entries) {
          if (!visibleArticle(entry.data.status, includeDrafts)) continue;
          const data = await context.parseData({ id: entry.id, data: entry.data, filePath: entry.absolute });
          const rendered = await context.renderMarkdown(entry.body, { fileURL: pathToFileURL(entry.absolute) });
          context.store.set({ id: entry.id, data, body: entry.body, rendered,
            filePath: relative(root, entry.absolute).replaceAll('\\', '/'),
            digest: context.generateDigest(entry.contents), assetImports: rendered.metadata?.imagePaths });
        }
      }
      await sync();
      if (context.watcher) {
        context.watcher.add(directory);
        let pending = Promise.resolve();
        context.watcher.on('all', (_event, file) => {
          if (!resolve(file).startsWith(directory + '/') && !resolve(file).startsWith(directory + '\\')) return;
          if (!file.endsWith('.md')) return;
          pending = pending.then(sync).catch(error => { context.logger.error(String(error)); });
        });
      }
    },
  };
}
