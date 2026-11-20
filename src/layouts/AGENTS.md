<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# layouts

## Purpose
Contains the single base layout that wraps every page in the site. It provides the full HTML document shell, all SEO and Open Graph meta tags, Google Fonts loading, the site header with navigation, and the complete global stylesheet used by all pages and components.

## Key Files
| File | Description |
|------|-------------|
| `BaseLayout.astro` | Full-page shell layout. Props: `title` (required), `description?` (falls back to `siteMeta.description`), `canonicalUrl?` (falls back to `Astro.url.href`), `heroImage?` (falls back to `siteMeta.ogImage`). Renders Open Graph and Twitter Card meta tags, loads Fraunces (serif headings) and Manrope (body) from Google Fonts, and outputs a `<slot />` inside `<main>`. Contains the entire global `<style is:global>` block covering all layout classes used across components and pages. |

## For AI Agents

### Working In This Directory
- All shared CSS lives in the `<style is:global>` block in `BaseLayout.astro` — there are no separate CSS files or CSS modules. When adding new visual patterns, add them here.
- CSS custom properties defined in `:root`: `--bg`, `--panel`, `--panel-strong`, `--border`, `--text`, `--muted`, `--accent`, `--accent-soft`, `--shadow`, `--content-width` (72rem). Use these variables rather than hard-coded colour values.
- Typography: headings use `font-family: "Fraunces", serif` (applied via `.hero h1`, `.section-title`, `.article-title`, `article h1/h2/h3`); body uses `"Manrope", sans-serif` set on `html`.
- The responsive breakpoint is `@media (max-width: 900px)`: hero switches to single-column, post cards go full-width, article padding reduces.
- The `<header>` renders `siteMeta.title` as the brand link to `/` and a single nav link to `/blog/` (Archive).

### Testing Requirements
- `npm run dev` — verify header, fonts, and global styles render correctly across pages.
- `npm run build` — confirms no Astro/TypeScript errors in the layout.
- Check both ≥900px and <900px viewport widths when modifying layout styles.

### Common Patterns
- `is:global` on the `<style>` tag is intentional — Astro would otherwise scope styles, breaking class-based styling in child components and pages.
- Fallback values for `description`, `canonicalUrl`, and `heroImage` are resolved in the frontmatter destructure, not in the template.
- `siteMeta` is imported from `../site` (i.e., `src/site.ts`).

## Dependencies

### Internal
- `src/site.ts` — provides `siteMeta.title`, `siteMeta.description`, and `siteMeta.ogImage` defaults
- All pages and the `PostCard` component depend on the global styles defined here

### External
- Google Fonts CDN — Fraunces (opsz 9–144, weights 500/700) and Manrope (weights 400–700)

## Child DOX Index

No child DOX docs.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
