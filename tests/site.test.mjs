import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const root = resolve('dist');
const requiredPages = ['index.html','services/index.html','products/index.html','products/vortiquest/index.html','products/vortiblog/index.html','products/vorticause/index.html','about/index.html','contact/index.html','privacy/index.html','404.html','blog/index.html',...['technology-decisions','custom-development','integrations','ai-automation','hosting-support'].map(id => `blog/topics/${id}/index.html`)];

const pages = [...new Set([...requiredPages, ...readdirSync(root, { recursive: true }).filter(file => file.endsWith('.html'))])];

test('executable scripts are external to comply with the deployed security policy', () => {
  for (const page of pages) {
    const html = readFileSync(join(root, page), 'utf8');
    for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      assert.match(script[1], /\bsrc=/, `${page}: inline script blocked by CSP`);
    }
    assert.match(html, /<script[^>]+src=/, `${page}: navigation script missing`);
  }
});
test('all public pages have a title, description, canonical, one h1, and skip target', () => {
  for (const page of pages) {
    const html = readFileSync(join(root, page), 'utf8');
    assert.match(html, /<title>[^<]+<\/title>/, page);
    assert.match(html, /name="description"/, page);
    assert.match(html, /rel="canonical"/, page);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page);
    assert.match(html, /id="main"/, page);
    assert.match(html, /lang="en"/, page);
  }
});
test('every internal link and asset resolves to a built file', () => {
  for (const page of pages) {
    const html = readFileSync(join(root, page), 'utf8');
    for (const [, value] of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      if (!value.startsWith('/') || value.startsWith('//')) continue;
      const pathname = value.split(/[?#]/)[0];
      const file = join(root, pathname);
      assert.ok(existsSync(file) || existsSync(join(file, 'index.html')), `${page}: ${value}`);
    }
  }
});
test('contact route uses the supplied business email and has no pretend form', () => {
  const html = readFileSync(join(root,'contact/index.html'), 'utf8');
  assert.match(html, /mailto:support@vorti\.quest/);
  assert.doesNotMatch(html, /<form\b/);
  assert.match(html, /role="status"/);
});
test('product links are honest placeholders until configured', () => {
  for (const slug of ['vorticause','vortiblog','vortiquest']) {
    const html = readFileSync(join(root, `products/${slug}/index.html`), 'utf8');
    assert.match(html, /Add Link/);
    assert.match(html, /Illustrative photograph/);
    assert.match(html, /contact\/\?product=/);
    assert.doesNotMatch(html, /href="#"/);
  }
});
test('sitemap, robots and security headers are built', () => {
  assert.ok(existsSync(join(root,'sitemap-index.xml')));
  assert.match(readFileSync(join(root,'robots.txt'),'utf8'), /User-agent:/);
  assert.match(readFileSync(join(root,'_headers'),'utf8'), /Content-Security-Policy:/);
});

test('renamed product has a canonical route and permanent legacy redirects', () => {
  const redirects = readFileSync(join(root, '_redirects'), 'utf8');
  assert.match(redirects, /^\/products\/vorti-youtube-feeder\/ \/products\/vortiquest\/ 301$/m);
  assert.match(redirects, /^\/products\/vorti-youtube-feeder \/products\/vortiquest\/ 301$/m);
  const html = readFileSync(join(root, 'products/vortiquest/index.html'), 'utf8');
  assert.match(html, /href="https:\/\/app\.vorti\.quest\/"/);
  const sitemap = readFileSync(join(root, 'sitemap-0.xml'), 'utf8');
  assert.match(sitemap, /\/products\/vortiquest\//);
  assert.doesNotMatch(sitemap, /vorti-youtube-feeder/);
});

test('the deployed blog supports an empty state and excludes the sample draft', () => {
 const html=readFileSync(join(root,'blog/index.html'),'utf8');
 if (!/class="article-row"/.test(html)) assert.match(html,/Articles coming soon/);
 assert.doesNotMatch(html,/This is a sample draft for local editorial review/);
 assert.equal(existsSync(join(root,'blog/sample-draft/index.html')),false);
 assert.doesNotMatch(readFileSync(join(root,'sitemap-0.xml'),'utf8'),/sample-draft/);
});
