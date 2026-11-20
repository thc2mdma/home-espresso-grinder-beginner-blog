<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# blog

## Purpose
Contains the two routes that handle blog content: a full archive listing at `/blog/` and a dynamic catch-all route that generates one static page per post at `/blog/<post-id>/`.

## Key Files
| File | Description |
|------|-------------|
| `index.astro` | Archive page (`/blog/`). Fetches all non-draft posts sorted by `pubDate` descending and renders them as a vertical list of `.archive-item` anchor elements — each showing date, dot-separated tags, title, and description. Does not use `PostCard`; renders inline markup instead. |
| `[...slug].astro` | Dynamic post route. `getStaticPaths` maps each non-draft post to `params: { slug: post.id.split("/") }` and passes the post as a prop. Renders the post body via Astro's `render()` API inside a `<article>` element with a structured header (date, optional updated date, title, description, tags). Uses `post.data.canonicalUrl` when present, otherwise falls back to `Astro.url.href`. |

## For AI Agents

### Working In This Directory
- The catch-all `[...slug]` pattern supports nested post IDs (e.g. `category/post-name`) by splitting `post.id` on `/` — this means subdirectory structure inside `src/content/blog/` is reflected in URLs.
- `getStaticPaths` is required and must remain — Astro's static output mode cannot use server-side rendering for this route.
- `updatedDate` display is conditional: the "Updated …" span only renders when the field is present in front matter.
- `tags` on the post detail page render all tags (no 4-tag cap), unlike `PostCard` which caps at 4.
- The archive page (`index.astro`) intentionally avoids `PostCard` — it uses a denser `.archive-item` layout defined globally in `BaseLayout.astro`.

### Testing Requirements
- `npm run build` — confirms `getStaticPaths` generates a page for every post in `src/content/blog/` and that all front matter satisfies the schema.
- `npm run dev` — visit `/blog/` and a post URL to verify archive list and article rendering.
- Add a post with a nested path (e.g. `src/content/blog/category/post.md`) to verify the `[...slug]` split produces the correct URL.

### Common Patterns
- Both files use identical draft filtering: `getCollection("blog", ({ data }) => !data.draft)`.
- Date formatting is inlined with `toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })` — no shared date utility.
- `render(post)` returns `{ Content }` which is used as an Astro component (`<Content />`), supporting both `.md` and `.mdx` source files.

## Dependencies

### Internal
- `src/layouts/BaseLayout.astro` — page shell for both routes
- `src/content/blog/` — Markdown/MDX source files; `[...slug].astro` generates one route per file
- Global CSS classes `.archive-item`, `.article-header`, `.post-meta`, `.article-title`, `.tag-list`, `.tag` defined in `BaseLayout.astro`

### External
- `astro:content` — `getCollection` and `render` APIs

## Child DOX Index

No child DOX docs.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
