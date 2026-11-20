<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# pages

## Purpose
Contains Astro's file-based route definitions for the site. Each file maps directly to a URL path: the homepage, a 404 error page, and a dynamically generated `robots.txt`. The `blog/` subdirectory handles the archive listing and individual post routes.

## Key Files
| File | Description |
|------|-------------|
| `index.astro` | Homepage (`/`). Fetches all non-draft posts sorted by `pubDate` descending, splits into `featuredPost` (most recent) and `recentPosts` (the rest), renders a hero section, a full-width `PostCard` for the featured post, and a 12-column grid of `PostCard` components for remaining posts. |
| `404.astro` | Custom 404 page. Renders inside `BaseLayout` with a centred panel containing an eyebrow badge, heading, explanatory text, and links back to `/` and `/blog/`. |
| `robots.txt.ts` | Endpoint that generates `/robots.txt` at build time. Outputs `Allow: /` for all user-agents and appends a `Sitemap:` line pointing to `/sitemap-index.xml` using the `site` value from Astro config (falls back to `https://example.com`). |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `blog/` | Blog archive listing and dynamic per-post routes (see `blog/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `index.astro` uses `getCollection("blog", ...)` directly — adding a new content collection requires updating this page and `src/content.config.ts` together.
- The `featuredPost` split is positional (first element after sort), not driven by a `featured` front matter field — whichever post has the most recent `pubDate` becomes featured automatically.
- `robots.txt.ts` uses Astro's endpoint API (`export function GET`); it must export a `GET` function and return a `Response`. Do not convert it to an `.astro` file.
- `404.astro` uses the `.eyebrow` and `.not-found` CSS classes defined globally in `BaseLayout.astro`.

### Testing Requirements
- `npm run build` — verifies static generation of all routes including `robots.txt`.
- `npm run dev` — confirms homepage renders correctly with and without posts in `src/content/blog/`.
- Manually visit `/robots.txt` in the dev server to confirm sitemap URL is correct when `PUBLIC_SITE_URL` is set.

### Common Patterns
- All content-fetching pages filter drafts with the same inline callback: `({ data }) => !data.draft`.
- Posts are sorted with `b.data.pubDate.valueOf() - a.data.pubDate.valueOf()` (descending).
- `canonicalUrl={Astro.url.href}` is passed explicitly to `BaseLayout` on every page.

## Dependencies

### Internal
- `src/layouts/BaseLayout.astro` — used by `index.astro` and `404.astro`
- `src/components/PostCard.astro` — used by `index.astro`
- `src/site.ts` — `siteMeta` used in `index.astro` for title and description props
- `src/content/blog/` — post files consumed via `getCollection("blog")`

### External
- `astro:content` — `getCollection` API
- `@astrojs/sitemap` — generates `/sitemap-index.xml` referenced by `robots.txt.ts`

## Child DOX Index

Direct child docs:
- `blog/AGENTS.md` — Blog archive listing and dynamic per-post route generation.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
