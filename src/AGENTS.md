<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# src

## Purpose
Contains all Astro source code for the blog site: the content collection schema, site-wide metadata constants, ambient type reference, plus the `components/`, `layouts/`, and `pages/` subdirectories that together define every rendered route.

## Key Files
| File | Description |
|------|-------------|
| `content.config.ts` | Defines the `blog` content collection with a Zod schema enforcing `title`, `description` (default `""`), `pubDate` (coerced date), optional `updatedDate`, `draft` (default `false`), `tags` (default `[]`), optional `canonicalUrl` (URL), and optional `heroImage` |
| `site.ts` | Exports `siteMeta` object with `title`, `description`, and `ogImage` used as defaults across all layouts and pages |
| `env.d.ts` | Single-line Astro client type reference (`/// <reference types="astro/client" />`) |

## Subdirectories
| Directory | Purpose |
|-----------|---------|
| `components/` | Reusable Astro components (see `components/AGENTS.md`) |
| `layouts/` | Page shell layout with global styles and SEO head (see `layouts/AGENTS.md`) |
| `pages/` | File-based routes: home, blog archive, post detail, 404, robots.txt (see `pages/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `content.config.ts` is the single source of truth for what front matter fields are valid; add new fields here with a Zod type before using them in pages or components.
- `site.ts` provides the fallback `description` and `ogImage` used by `BaseLayout.astro` — update it to change site-wide SEO defaults.
- Blog post files must be placed in `src/content/blog/` (not tracked in this repo; populated at build time by the sync script or pipeline).
- The `env.d.ts` triple-slash reference must not be removed — it provides Astro client type augmentations used throughout.

### Testing Requirements
- `npm run check` from `astro-blog/` validates TypeScript types including content collection schema usage.
- `npm run build` validates that every file in `src/content/blog/` satisfies the Zod schema in `content.config.ts`.

### Common Patterns
- All pages call `getCollection("blog", ({ data }) => !data.draft)` to filter drafts — the `draft` field defaults to `false` so omitting it in front matter publishes the post.
- `pubDate` uses `z.coerce.date()`, so ISO date strings like `2024-01-15` in front matter are accepted.

## Dependencies

### Internal
- `src/content/blog/` — Markdown/MDX post files dropped by the BlogBlaster pipeline (not committed; created at sync time)

### External
- `astro:content` — Astro's built-in content collection API (`getCollection`, `render`, `defineCollection`)
- `zod ^3.24.2` — schema validation for front matter fields

## Child DOX Index

Direct child docs:
- `components/AGENTS.md` — Reusable Astro display components, currently the blog post card.
- `layouts/AGENTS.md` — Base HTML shell, SEO/Open Graph head, header, fonts, and global stylesheet.
- `pages/AGENTS.md` — Astro file-based routes for the homepage, 404, robots.txt, and blog subroutes.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
