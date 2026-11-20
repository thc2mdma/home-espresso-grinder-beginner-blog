<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# components

## Purpose
Contains reusable Astro components consumed by pages. Currently holds the single post card component used on the homepage and archive to render clickable blog post previews.

## Key Files
| File | Description |
|------|-------------|
| `PostCard.astro` | Renders a linked card for a blog post. Props: `href`, `title`, `description`, `pubDate` (Date), `tags?` (string[], capped at 4 displayed), `featured?` (boolean). Applies `class:list` to add the `featured` CSS class when `featured={true}`, which the global stylesheet in `BaseLayout.astro` maps to `grid-column: span 12` (vs `span 6` for normal cards). Formats `pubDate` with `toLocaleDateString("en-US", { year, month, day })`. |

## For AI Agents

### Working In This Directory
- `PostCard.astro` has no scoped `<style>` block — all visual styles are declared globally in `BaseLayout.astro`. Do not add scoped styles here without also updating the global sheet.
- The `featured` prop controls grid span only; content layout is identical for featured and non-featured cards.
- Tags beyond index 3 are silently dropped (`tags.slice(0, 4)`); this is intentional to keep cards compact.
- The card renders as an `<a>` element directly, so the entire card surface is the link — do not nest interactive elements inside it.

### Testing Requirements
- `npm run build` from `astro-blog/` to confirm no type errors on props.
- `npm run dev` to visually verify card layout at desktop (≥900px) and mobile (<900px) breakpoints.

### Common Patterns
- Props interface is declared inline in the frontmatter with TypeScript `interface Props`.
- Date formatting uses `en-US` locale directly — no date utility library.

## Dependencies

### Internal
- Styles defined globally in `src/layouts/BaseLayout.astro` (`.post-card`, `.post-card.featured`, `.post-meta`, `.article-title`, `.tag-list`, `.tag`)
- Used by `src/pages/index.astro` (homepage featured + recent grid) only; `src/pages/blog/index.astro` renders its own inline archive items without this component

### External
- None beyond Astro core

## Child DOX Index

No child DOX docs.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
