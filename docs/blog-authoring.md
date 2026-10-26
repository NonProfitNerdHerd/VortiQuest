# Writing and publishing with Codex

Articles are Markdown files in `src/content/blog/`. The website builds static pages; there is no admin login or database.

## Create an article

Ask Codex: “Create a draft article about [topic], using the blog authoring guide. Keep it in draft until I ask to publish.” Copy `docs/article-template.md` into `src/content/blog/your-stable-slug.md`. The filename becomes `/blog/your-stable-slug/`. Use lowercase letters, numbers, and hyphens. Keep articles directly in this folder, not nested folders. `topics` is reserved.

Required metadata: title, description, author, and at least one valid topic ID. `status` defaults to `draft`; write it explicitly for clarity. Published articles also require `publishedAt: YYYY-MM-DD`. Optional `updatedAt` must not precede the publication date. Dates are displayed in UTC. A future date does not schedule publication: `published` means it is included on the next deployment.

Use `##` headings for main sections and `###` for subsections. The template supplies the only `h1`. Use ordinary Markdown for paragraphs, links, lists, tables, and code blocks. Review factual claims, permissions, links, and accessibility before publishing. Do not include credentials or private client information in articles, even drafts stored in Git.

Write cohesive paragraphs around one idea, grouping related sentences and consecutive questions. Avoid blank lines after every sentence; reserve standalone lines for occasional emphasis or a closing punchline. The shared article styles handle line wrapping and paragraph spacing.

## Topics

Edit `src/data/topics.ts` to manage the shared registry. Starting IDs:

- `technology-decisions`
- `custom-development`
- `integrations`
- `ai-automation`
- `hosting-support`

An article can reference several IDs. Unknown IDs and duplicate topic assignments fail validation. Display names and descriptions can change without changing archive URLs. Keep IDs stable; if you remove an ID, update affected articles first. Changing an established topic ID requires a permanent redirect for the old archive URL. Archive counts use only published articles in builds; local development includes drafts.

## Images

Store article images inside `src/content/blog/images/`, never `public/`. Reference them with relative paths, such as `./images/planning.jpg`. For a cover, supply `src`, useful `alt` text, and a credit. Record the source URL, license, and permitted use in an `ATTRIBUTION.md` beside the images. Inline Markdown images also need useful alt text. Images are processed locally by Astro; do not use remote image URLs or import private draft images from shared components.

Drafts are filtered before rendering and image registration. Keeping their assets outside `public/` and outside shared imports is necessary for excluding draft-only assets. Assets shared with a published article can remain public.

## Review locally

Run `npm run dev` and open the localhost URL. `/blog/` and topic pages include drafts in this mode. Draft pages display **Draft · Local preview** and are marked noindex. The sample draft at `/blog/sample-draft/` demonstrates the article layout. Changes to Markdown reload the collection; restart the dev server after changing the topic registry or content configuration if needed.

`npm run preview` shows the production build, so drafts are absent there. The public Cloudflare preview Worker also excludes drafts. Draft visibility cannot be enabled through an environment variable in a deployed build.

## Publish or unpublish

1. Finish editorial review, verify the author, and check images and licenses.
2. Set `publishedAt`, assign valid topics, and explicitly change `status: draft` to `status: published`.
3. Run `npm run build`, `npm test`, `npm run test:blog-build`, and `npm run deploy:check`.
4. Deploy the existing preview Worker: `npx wrangler deploy --name vortiquest-preview`.
5. Review the published page and topic archives. Production deployment remains subject to the existing launch checklist; do not change the production domain as part of article publication.

To unpublish, change the status back to `draft`, rebuild, and deploy. Its route, listings, sitemap entry, and exclusive image assets disappear from the new build. Previously published copies may remain in browser caches, search results, external archives, or Git history; unpublishing is not a way to retract confidential information.

Treat the filename as permanent after publication. If a published filename must change, add a 301 redirect for both trailing-slash forms in `public/_redirects` and update internal links. Keep the publication date when revising an article; add or update `updatedAt` instead.

## First release

The public blog intentionally starts empty. Do not change the sample draft to published as a shortcut. Replace it with reviewed content or remove it once you are comfortable with the workflow. No search, comments, RSS, subscriptions, or browser editor are included.
