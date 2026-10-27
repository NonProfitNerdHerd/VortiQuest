# VortiQuest

An Astro + TypeScript studio website, deployed as prerendered assets on Cloudflare Workers. Custom CSS, self-hosted fonts, no CMS, database, analytics, or server-side contact form.

Review deployment: https://vortiquest-preview.ike-j-rebout.workers.dev (a separate preview Worker; the production domain has not been changed).

## Local development

Use Node 24 LTS and npm. Run commands in this directory (the Git checkout is nested inside the outer VortiQuest workspace).

```sh
npm ci
npm run dev
```

```sh
npm run build
npm test
npm run deploy:check
npm run preview
```

The build runs Astro's strict type/template check, then generates static pages into `dist/`. Tests inspect that output, including all page routes, internal links/assets, metadata, and contact behavior. `deploy:check` packages a Cloudflare deployment without publishing.

## Content and assets

- `src/data/site.ts`: contact details, product content, repository links, and launch status. An empty repository URL renders a non-clickable **Add Link** label.
- `src/pages`: page copy and layouts. Product routes come from the typed product data.
- `src/styles/global.css`: design tokens and responsive components.
- `public`: logo icon, social artwork, and Cloudflare response headers.
- `src/assets/ATTRIBUTION.md`: photo sources and license notes. Local photographs are processed into responsive WebP images by Astro; no external image requests are required at runtime.

Business email: `support@vorti.quest`. The production origin defaults to `https://vorti.quest`, inferred from that supplied address, and **must be confirmed**. Set `SITE_URL` in the build environment to override it. Domain-dependent canonical URLs, sitemap, and social URLs derive from this origin.

Until `site.domainConfirmed` is true, pages are noindex and robots disallows indexing. `npm run deploy` also runs a content readiness check. This is intentional: preview builds work while production information is incomplete.

## Launch checklist

1. Confirm domain and update `site.domainConfirmed`; set the production `SITE_URL` in Cloudflare.
2. When products are ready for release, configure the GitHub account and repository URLs and enable release actions. Verify licenses and setup documentation independently for each product.
3. Review product copy and capabilities before release. VortiTask remains a placeholder with `verified: false`; do not invent a feature list.
4. Replace clearly labeled product identity illustrations with real application screenshots and useful alt text/captions. Use responsive images through Astro's image component, with fixed dimensions and lazy loading below the fold. The current illustrations are native CSS/SVG; they do not impersonate application screens.
5. Review the privacy notice.
6. Review the included 1200×630 `public/social.png` social preview; its editable source is `public/social.svg`.
7. Check homepage and one product page on desktop and mobile, then all routes. Check keyboard focus, menu, email/copy actions, product inquiry subjects, reduced motion, text zoom, contrast, and 404 behavior.
8. Run build, tests, dry-run, and `npm run launch:check` before production deployment.

## Cloudflare + GitHub deployment

`wrangler.jsonc` configures a static-only Worker; no Worker script, runtime bindings, or Node compatibility flag is needed. Assets are served directly by Cloudflare with explicit 404 handling and trailing-slash URLs. `_headers` declares security headers.

Connect the GitHub repository in Cloudflare Workers & Pages → create/import a Worker → Git repository. The repository root is **this checkout's root**, not the outer workspace folder.

- Build command: `npm run build && npm test`
- Deploy command: `npm run deploy`
- Non-production branch command: `npx wrangler versions upload`
- Enable non-production branch builds and version preview URLs. Check the preview URL before promoting a release.
- Configure `SITE_URL`, connect the confirmed custom domain, and verify Cloudflare's access and logging settings against the privacy notice.

The included GitHub Actions workflow runs build, content/link tests, and Wrangler dry-run on pull requests and main pushes. It does not need deployment secrets. Cloudflare's GitHub connection and custom domain need to be configured in the owner's account; no credentials are committed.

Manual authenticated deploy after completing the launch checklist:

```sh
npx wrangler login
npm run build
npm test
npm run deploy
```

## Design direction

Cloud & Ink: soft white `#F7F9FC`, mist blue `#E7EFF8`, navy `#23344D`, and blue `#4269B0`; DM Sans paired with Instrument Serif. Colors are consolidated in the CSS root tokens. Preserve the geometric V symbol and wordmark. The homepage combines editorial workspace photography with an illustrative collaboration section and a native service diagram. About presents principles, scoped support, and the working relationship. Product identity graphics remain illustrative until screenshots are supplied. Avoid decorative dashboards, fake performance claims, and repeated generic card sections.

The Cloud & Ink direction and photography approach were selected by the owner. The implementation remains reviewable in the preview Worker. Once the final visual treatment is approved, capture its rules and examples as a repository-specific skill.

## Content provenance

The business email and current product positioning were supplied directly by the owner. The owner confirmed VortiCause donor management, mobile workflows, national/regional/local permissions, and VortiPress/VortiTask integrations as implemented. The anonymous nonprofit case is the owner’s account, not a measured benchmark. Self-hosting will have no software license or per-contact fee at release; infrastructure and maintenance still cost money, and paid hosting/support are optional. Earlier CMS-focused VortiCause material is superseded. Do not publish competitor names or promise security guarantees.

## Advisory positioning

Client interests lead the recommendations: buying SaaS, connecting existing tools, building custom software, or keeping what already works. Home and Services share the central advisory statement from `src/data/site.ts`. Copy considers business fit, people, accessibility, privacy, security, ethical data/AI use, ownership, maintainability, and ongoing costs. Our own products and paid hosting are options evaluated against customer needs. Use warm, plain-language invitations; do not invent formal fiduciary duties, certifications, guarantees, commission policies, or vendor-independence claims. Services photography is illustrative and credited in `src/assets/ATTRIBUTION.md`.

## Product business cases and navigation

The header stays visible while scrolling, with a solid background, anchor offsets, and an Escape-to-close mobile menu. Product case content and photos live in the typed product data. The Products collection uses concise ProductIntro sections: category, name, tagline, introductory paragraphs, filled business-case button, secondary contact link, and compact development notice. Copy and actions sit left of the existing illustration/photo on desktop; at 800px and below, the photo follows the copy. Images are lazy-loaded with consistent 4:3 crops and retain credits. Problems, rationale, capabilities, platform details, and audiences belong in the individual articles. Individual business cases use the same responsive content container as the site header, horizontal rules, headings, paragraphs, and bullet lists, without product photographs or development sections. Expanded narratives replace repetitive overview explanations; the shared contact band remains. VortiQuest is the media inbox project; the company shares its name. Homepage and collection notices describe the four projects as in development. Detail articles omit these notices and keep application and repository links absent. Collection order is VortiPress, VortiCause, VortiTask, then VortiQuest. Homepage cards use two columns on desktop/tablet and one on mobile. VortiTask uses placeholder copy; its checklist illustration and licensed team-planning photography remain on the collection, while its detail article uses the owner-supplied task coordination narrative. VortiPress and VortiCause capabilities were confirmed by the owner; their expanded business cases appear only on detail pages. The product remains unreleased. Editorial images illustrate use contexts and are not application screenshots.

The old `/products/vorti-youtube-feeder/` route redirects permanently to `/products/vortiquest/` using Cloudflare `_redirects`, with and without a trailing slash. The legacy product inquiry name is normalized to VortiQuest. Astro preview does not emulate Cloudflare redirects; validate status and Location through Wrangler or the deployed preview.

## Full-width hero bands

Home, Products, and About use `HeroBand.astro`: a mist-blue full-width section with a constrained copy slot, an edge-reaching photograph, and a credit slot. Desktop text stays on solid color, with a soft blend at the image edge. At tablet and phone widths, the photo follows the copy in normal flow. Home retains its original workspace photo; Products uses a whiteboard planning photograph, and About uses a separate collaborative-planning photograph. Services retains its existing layout. Credits and licenses are recorded with the local assets.

## Calmer sections and compact navigation

The fixed header reserves its expanded height (110px desktop, 85px at 800px and below). Above 64px scroll it compacts to 76px / 68px, restoring below 16px. Hysteresis prevents flicker; anchors and the mobile menu use the active height. Motion respects reduced-motion preferences. Escape closes the menu and restores focus.

`EverydayStory.astro` follows the advisory statement, using three existing licensed photographs to describe everyday friction. The clarity section forms one full-width mist-blue band. Section introductions sit below headings; named service sequences retain ordered-list semantics without decorative numbering or unrelated glyphs. Photography credits remain in `src/assets/ATTRIBUTION.md`.

## Blog

The Blog menu opens `/blog/`. Topics are managed in `src/data/topics.ts`, and Markdown articles live in `src/content/blog/`. Read [the authoring guide](docs/blog-authoring.md) and copy [the article template](docs/article-template.md) to start a draft. `npm run dev` includes drafts locally; builds and the public preview Worker exclude them before rendering and asset registration. The initial public archive is intentionally empty.

Run `npm run test:blog-build` for isolated publication/unpublication and draft-asset checks, alongside the normal build/tests. It creates a temporary project and never publishes fixture articles. The CI workflow includes this check.

## Services and contact bands

The Services capabilities introduction uses a mist-blue edge-to-edge band with workspace photography. The three service groups below it use the normal light page background. The partnership note follows with compact spacing. The shared contact section uses a navy band and collaboration photography on every page where it appears. Photos blend into the solid copy background on the left; at 800px and below, they stack beneath the copy with a top-edge gradient. Existing opening heroes remain independent.

VortiCause’s expanded article covers owner-confirmed donor and volunteer management, fundraising, acknowledgments, engagement workflows, events, memberships, reporting, and organizational permissions. Examples illustrate workflows rather than measured customer outcomes. Competitors are not named.

The VortiPress business-case article is maintained in `src/data/business-cases/vortipress.md`, replacing its former shared-data narrative and appended capability/audience sections. Its owner-supplied editorial copy preserves emphasis and bullets; the October 2026 PHP security reference links to the official advisory. Collection introductions remain in `src/data/site.ts`.

The VortiCause business-case replacement is maintained in `src/data/business-cases/vorticause.md`. VortiPress and VortiCause share the editorial renderer and header-aligned width; each supplied article replaces the old narrative and appended sections in full. Their closing contact links retain the appropriate product inquiry.

VortiTask’s replacement article is in `src/data/business-cases/vortitask.md` and uses the shared editorial renderer. The supplied draft’s “VortiTasks” references are normalized to the established VortiTask name. Its feature list and closing contact link replace the former detail-page placeholder; collection copy remains unchanged.
