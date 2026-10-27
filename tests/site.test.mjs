import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const root = resolve('dist');
const requiredPages = ['index.html','services/index.html','products/index.html','products/vortiquest/index.html','products/vortipress/index.html','products/vorticause/index.html','products/vortitask/index.html','about/index.html','contact/index.html','privacy/index.html','404.html','blog/index.html',...['technology-decisions','custom-development','integrations','ai-automation','hosting-support'].map(id => `blog/topics/${id}/index.html`)];

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
test('unfinished products retain business cases without release links', () => {
  for (const slug of ['vortipress','vorticause','vortitask','vortiquest']) {
    const html = readFileSync(join(root, `products/${slug}/index.html`), 'utf8');
    assert.doesNotMatch(html, /in development|product-development|product-status/i);
    assert.match(html, /<article class="business-article"/);
    assert.match(html, /<hr/);
    const article = html.match(/<article class="business-article"[\s\S]*?<\/article>/)?.[0];
    assert.ok(article);
    assert.doesNotMatch(article, /<img|product-visual|case-main|case-preparing/);
    assert.doesNotMatch(html, /Product website|GitHub repository|View on GitHub|href="https:\/\/app\.vorti\.quest/);
    assert.match(html, /What’s on|What&#39;s on/);
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
  assert.doesNotMatch(html, /href="https:\/\/app\.vorti\.quest\/"/);
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

test('product listings follow the agreed order and retain internal case links', () => {
 const slugs = ['vortipress', 'vorticause', 'vortitask', 'vortiquest'];
 const home = readFileSync(join(root, 'index.html'), 'utf8');
 const collection = readFileSync(join(root, 'products/index.html'), 'utf8');
 for (const html of [home, collection]) {
   const positions = slugs.map(slug => html.indexOf('href="/products/' + slug + '/"'));
   assert.ok(positions.every(position => position >= 0));
   assert.ok(positions.every((position, i) => i === 0 || positions[i - 1] < position));
 }
 const anchors = slugs.map(slug => collection.indexOf('href="#' + slug + '"'));
 assert.ok(anchors.every((position, i) => position >= 0 && (i === 0 || anchors[i - 1] < position)));
 for (const page of pages) {
   assert.doesNotMatch(readFileSync(join(root, page), 'utf8'), /href="https:\/\/app\.vorti\.quest/);
 }
});

test('VortiPress replaces VortiBlog while preserving legacy routes and anchors', () => {
 const redirects=readFileSync(join(root,'_redirects'),'utf8');
 assert.match(redirects,/^\/products\/vortiblog\/ \/products\/vortipress\/ 301$/m);
 assert.match(redirects,/^\/products\/vortiblog \/products\/vortipress\/ 301$/m);
 const detail=readFileSync(join(root,'products/vortipress/index.html'),'utf8');
 const collection=readFileSync(join(root,'products/index.html'),'utf8');
 assert.match(detail,/rel="canonical" href="https:\/\/vorti.quest\/products\/vortipress\/"/);
 assert.match(detail,/They needed to publish. They inherited a maintenance job./);
 assert.doesNotMatch(collection,/They needed to publish. They inherited a maintenance job./);
 assert.match(collection,/id="vortiblog"/);
 assert.match(detail,/Publish blog posts, news, and frequently updated website content./);
 assert.doesNotMatch(detail,/PRODUCT DETAILS BEING PREPARED/);
 const sitemap=readFileSync(join(root,'sitemap-0.xml'),'utf8');
 assert.match(sitemap,/\/products\/vortipress\//);
 assert.doesNotMatch(sitemap,/vortiblog/);
 for(const page of pages) assert.doesNotMatch(readFileSync(join(root,page),'utf8'),/VortiBlog|href="\/products\/vortiblog/);
});


test('VortiTask has a discoverable placeholder and contact inquiry support', () => {
 const html = readFileSync(join(root, 'products/vortitask/index.html'), 'utf8');
 assert.match(html, /Product details are being prepared/);
 assert.match(html, /contact\/\?product=VortiTask/);

 assert.match(readFileSync(join(root, 'sitemap-0.xml'), 'utf8'), /\/products\/vortitask\//);
 const contact = readFileSync(join(root, 'contact/index.html'), 'utf8');
 const scripts = [...contact.matchAll(/<script[^>]+src="([^"]+)"/g)].map(([,src]) => readFileSync(join(root, src), 'utf8')).join('');
 assert.match(scripts, /VortiTask/);
});

test('VortiCause presents donor operations and an anonymous detail-only case', () => {
 const html = readFileSync(join(root, 'products/vorticause/index.html'), 'utf8');
 assert.match(html, /manage donor relationships/);
 assert.match(html, /no software license or per-contact fee/);
 assert.match(html, /national, regional, and local/);
 assert.match(html, /When keeping relationships becomes a budget decision/);
 assert.doesNotMatch(html, /Kindful|CiviCRM|A headless content management and collaboration platform/i);
 assert.doesNotMatch(readFileSync(join(root, 'products/index.html'), 'utf8'), /When keeping relationships becomes a budget decision/);
});


test('collection retains development notices and prominent business-case buttons', () => {
 const html = readFileSync(join(root, 'products/index.html'), 'utf8');
 assert.match(html, /In development/);
 for (const slug of ['vortipress', 'vorticause', 'vortitask', 'vortiquest']) {
   assert.ok(html.includes('class="button" href="/products/' + slug + '/">Read the business case'));
 }
});

test('VortiCause article includes engagement, volunteer, and participation workflows', () => {
 const html = readFileSync(join(root, 'products/vorticause/index.html'), 'utf8');
 for (const text of ['Volunteer work that stays connected', 'Thank-yous and engagement', 'Events, memberships', 'Knowledge that leads to action', 'Prepare an acknowledgment', 'Assign follow-up']) assert.ok(html.includes(text), text);
 assert.match(html, /<ul>/);
});
