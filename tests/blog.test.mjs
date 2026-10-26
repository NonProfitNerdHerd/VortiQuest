import { test } from 'node:test';
import assert from 'node:assert/strict';
import { articleId, parseArticle, rawArticleSchema, newestFirst, visibleArticle } from '../src/blog/model.ts';
import { articleLoader } from '../src/blog/loader.ts';
import { topics } from '../src/data/topics.ts';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const metadata = { title: 'A useful article', description: 'Something specific.', author: 'VortiQuest', topics: ['technology-decisions'] };
test('draft is the safe default; publication requires a valid date', () => {
  assert.equal(rawArticleSchema.parse(metadata).status, 'draft');
  assert.throws(() => rawArticleSchema.parse({ ...metadata, status: 'published' }));
  assert.throws(() => rawArticleSchema.parse({ ...metadata, status: 'published', publishedAt: 'not-a-date' }));
  assert.equal(rawArticleSchema.parse({ ...metadata, status: 'published', publishedAt: '2026-10-23' }).publishedAt.toISOString(), '2026-10-23T00:00:00.000Z');
});
test('topics must exist, may be multiple, and must not repeat', () => {
  assert.equal(rawArticleSchema.parse({ ...metadata, topics: topics.map(t => t.id) }).topics.length, 5);
  for (const assignments of [[], ['missing'], ['integrations', 'integrations']]) {
    assert.throws(() => rawArticleSchema.parse({ ...metadata, topics: assignments }));
  }
});
test('image descriptions and credits, chronology, filenames and frontmatter are validated', () => {
  assert.throws(() => rawArticleSchema.parse({ ...metadata, cover: { src: './images/a.png', alt: '', credit: '' } }));
  assert.throws(() => rawArticleSchema.parse({ ...metadata, cover: { src: 'https://example.com/a.png', alt: 'Photo', credit: 'Source' } }));
  assert.throws(() => rawArticleSchema.parse({ ...metadata, publishedAt: '2026-10-23', updatedAt: '2026-10-22' }));
  assert.equal(articleId('practical-choices.md'), 'practical-choices');
  assert.throws(() => articleId('topics.md'));
  assert.throws(() => articleId('Bad Name.md'));
  assert.throws(() => parseArticle('No metadata', 'test.md'));
});
test('articles sort newest first with a stable tie-breaker and undated drafts last', () => {
  const items = [{ id: 'draft', data: {} }, { id: 'older', data: { publishedAt: new Date('2026-10-01') } }, { id: 'latest', data: { publishedAt: new Date('2026-10-23') } }];
  assert.deepEqual(items.sort(newestFirst).map(a => a.id), ['latest', 'older', 'draft']);
  assert.equal(visibleArticle('draft', false), false);
  assert.equal(visibleArticle('draft', true), true);
  assert.equal(visibleArticle('published', false), true);
});
test('drafts are excluded before rendering/images, and returning to draft clears the store', async () => {
  const root = await mkdtemp(join(tmpdir(), 'vortiquest-loader-'));
  try {
    const dir = join(root, 'src/content/blog');
    await mkdir(dir, { recursive: true });
    const filename = join(dir, 'test-article.md');
    const content = status => `---\ntitle: Test\ndescription: Test description\nauthor: VortiQuest\ntopics: [integrations, custom-development]\nstatus: ${status}\npublishedAt: 2026-10-23\ncover:\n  src: ./images/private.png\n  alt: Test image\n  credit: Test fixture\n---\nDraft secret body`;
    const entries = new Map(); let parsed = 0; let rendered = 0;
    const context = { config: { root: pathToFileURL(root + '/') }, store: { clear: () => entries.clear(), set: entry => entries.set(entry.id, entry) }, parseData: async ({ data }) => { parsed++; return data; }, renderMarkdown: async () => { rendered++; return { html: '<p>Test</p>', metadata: { imagePaths: ['./images/private.png'] } }; }, generateDigest: text => text };
    await writeFile(filename, content('draft'));
    await articleLoader(false).load(context);
    assert.equal(parsed, 0); assert.equal(rendered, 0); assert.equal(entries.size, 0);
    await articleLoader(true).load(context);
    assert.equal(entries.size, 1);
    await writeFile(filename, content('published'));
    await articleLoader(false).load(context);
    assert.equal(entries.size, 1);
    assert.equal(entries.get('test-article').data.topics.length, 2);
    await writeFile(filename, content('draft'));
    await articleLoader(false).load(context);
    assert.equal(entries.size, 0);
  } finally { await rm(root, { recursive: true, force: true }); }
});
