import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, symlink, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Build fixtures in an isolated project: never publish them or alter real articles.
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(join(tmpdir(), 'vortiquest-blog-build-'));
const articleFolder = join(temporary, 'src/content/blog');
const read = path => readFile(join(temporary, 'dist', path), 'utf8');
const article = (status, title, date, cover) => `---\ntitle: "${title}"\ndescription: "A fixture for article rendering and publishing checks."\nstatus: ${status}\nauthor: VortiQuest\npublishedAt: ${date}\nupdatedAt: 2026-10-24\ntopics: [technology-decisions, integrations]\ncover:\n  src: ./images/${cover}.jpg\n  alt: A bright desk beside a window\n  credit: Test fixture image · Darina Belonogova / Pexels\n---\n\n## A useful question\n\nThis paragraph checks the rendered article body.\n\n- First consideration\n- Second consideration\n\n[Talk with us](/contact/)\n\n![An inline workspace photo](./images/${cover}-inline.jpg)\n\n\`\`\`js\nconst useful = true;\n\`\`\`\n`;
async function build(environment = {}) {
  const result = spawnSync(process.execPath, [join(repo, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', temporary], {
    cwd: temporary, encoding: 'utf8', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', ...environment }, timeout: 180000,
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
}
async function assertNoPrivateContent() {
  const files = await readdir(join(temporary, 'dist'), { recursive: true });
  assert.ok(!files.some(file => /private-cover|private-inline|private-article/.test(file)), 'Draft-only route or assets leaked');
  for (const file of files.filter(file => /\.(html|js|css|json|xml|txt)$/.test(file))) {
    assert.doesNotMatch(await read(file), /PRIVATE-DRAFT-SENTINEL|PRIVATE-BODY-SENTINEL|sample-draft/, file);
  }
}
try {
  for (const file of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json']) {
    await cp(join(repo, file), join(temporary, file), { recursive: true });
  }
  await symlink(join(repo, 'node_modules'), join(temporary, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
  await rm(articleFolder, { recursive: true, force: true });
  await mkdir(join(articleFolder, 'images'), { recursive: true });
  for (const name of ['published-cover', 'published-cover-inline', 'private-cover', 'private-cover-inline']) {
    await cp(join(repo, 'src/assets/workspace.jpg'), join(articleFolder, `images/${name}.jpg`));
  }
  const longTitle = 'A thoughtful technology decision starts with the people doing the work and the responsibilities that follow';
  await writeFile(join(articleFolder, 'published-article.md'), article('published', longTitle, '2026-10-23', 'published-cover'));
  await writeFile(join(articleFolder, 'older-article.md'), article('published', 'An older article', '2026-10-01', 'published-cover'));
  await writeFile(join(articleFolder, 'private-article.md'), article('draft', 'PRIVATE-DRAFT-SENTINEL', '2026-10-24', 'private-cover') + '\nPRIVATE-BODY-SENTINEL\n');
  await build();
  const page = await read('blog/published-article/index.html');
  assert.match(page, /A useful question/);
  assert.match(page, /property="og:type" content="article"/);
  assert.match(page, /article:published_time/);
  assert.match(page, /article:modified_time/);
  assert.match(page, /<img[^>]+width="/);
  assert.match(page, /srcset=/);
  const index = await read('blog/index.html');
  assert.ok(index.indexOf(longTitle) < index.indexOf('An older article'), 'Date ordering');
  for (const topic of ['technology-decisions', 'integrations']) {
    assert.match(await read(`blog/topics/${topic}/index.html`), /published-article/);
  }
  assert.match(await read('blog/topics/hosting-support/index.html'), /Articles coming soon/);
  assert.match(await read('sitemap-0.xml'), /blog\/published-article\//);
  await assertNoPrivateContent();
  console.log('Published article rendering, metadata, image processing, sorting, topic assignment, and draft isolation passed.');

  // Rebuild with a warm content cache after unpublishing, including its private assets.
  for (const file of ['published-article.md', 'older-article.md']) {
    const path = join(articleFolder, file);
    await writeFile(path, (await readFile(path, 'utf8')).replace('status: published', 'status: draft'));
  }
  await build({ NODE_ENV: 'development' });
  assert.match(await read('blog/index.html'), /Articles coming soon/);
  const files = await readdir(join(temporary, 'dist'), { recursive: true });
  assert.ok(!files.some(file => /published-article|older-article|published-cover/.test(file)), 'Unpublished route or image remained in build');
  assert.doesNotMatch(await read('sitemap-0.xml'), /published-article|older-article/);
  await assertNoPrivateContent();
  console.log('Unpublishing removes routes, text, sitemap entries, and exclusive assets with a warm cache.');
} finally {
  // Delete only the temporary project created by this script, using one filesystem API.
  const parent = resolve(tmpdir()) + sep;
  if (!resolve(temporary).startsWith(parent) || !temporary.includes('vortiquest-blog-build-')) throw new Error('Unexpected cleanup path');
  await rm(temporary, { recursive: true, force: true });
}
