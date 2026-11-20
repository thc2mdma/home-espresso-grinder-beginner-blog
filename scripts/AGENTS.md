<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-06-12 | Updated: 2026-06-12 -->

# scripts

## Purpose
Contains the PowerShell utility that syncs generated Markdown and MDX content from a BlogBlaster pipeline output directory into the Astro site's `src/content/blog/` collection directory, replacing any previously synced files.

## Key Files
| File | Description |
|------|-------------|
| `sync-content.ps1` | Accepts a mandatory `-Source` path and optional `-Destination` (defaults to `..\src\content\blog` relative to the script). Clears all existing `.md`/`.mdx` files from the destination, then copies all `.md` and `.mdx` files from the source. Creates the destination directory if absent. |

## For AI Agents

### Working In This Directory
- The script uses `Resolve-Path` on `-Source`, so the source path must exist when the script runs.
- The default destination resolves to `astro-blog/src/content/blog/` when the script is run from `astro-blog/scripts/`.
- Invoke example: `powershell -ExecutionPolicy Bypass -File .\scripts\sync-content.ps1 -Source "..\output\my-run\articles"`
- The script performs a full replace (delete then copy), not a merge — files removed from the source will be removed from the site on the next sync.
- No filtering by front matter validity occurs here; invalid files will cause `npm run build` to fail at schema validation.

### Testing Requirements
- Run `npm run build` in `astro-blog/` after syncing to confirm all copied files pass the Zod front-matter schema in `src/content.config.ts`.
- The script itself has no tests; validate by inspecting `src/content/blog/` contents after execution.

### Common Patterns
- `-ErrorAction SilentlyContinue` on the `Copy-Item` calls means the script does not error if a glob matches nothing (e.g., no `.mdx` files in the source).
- Script path is used as the anchor for the default destination (`$PSScriptRoot`), not the caller's working directory.

## Dependencies

### Internal
- Writes to `../src/content/blog/` (relative to script location), which is the Astro content collection source consumed by all blog pages

### External
- PowerShell 5.1+ (Windows) or PowerShell 7+ (cross-platform); no third-party modules required

## Child DOX Index

No child DOX docs.

<!-- MANUAL: Any manually added notes below this line are preserved on regeneration -->
