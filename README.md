# Astro Blog Starter

This folder is a separate Astro site intended to be the static publishing target for generated Markdown or MDX content.

## What it does

- Reads posts from `src/content/blog`
- Validates front matter with Astro content collections
- Builds as a static site
- Fits Cloudflare Pages or any other static host/CDN

## Commands

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages deployment

There are **two mutually exclusive ways** to get this repo deploying to Cloudflare Pages. Pick
one — running both means every push triggers two separate builds/deploys of the same site.

### Option A — Git-connected Pages project (recommended)

Connect this repo directly to a Cloudflare Pages project (Cloudflare Dashboard → Pages →
Create → Connect to Git). Cloudflare then builds and deploys on every push itself:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `PUBLIC_SITE_URL=https://your-domain.example`

Because Cloudflare owns the build here, each deployment carries `deployment_trigger.metadata
.commit_hash`, so backend verification (`CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` +
`cloudflare_project_name`) can match the exact commit the pipeline pushed. No deploy hook is
needed or configured — the pipeline logs deploy-hook "skipped" for this option (expected) and
still polls for and verifies the resulting deployment.

### Option B — CI-driven direct upload (`.github/workflows/deploy-cloudflare.yml`)

This repo also ships a GitHub Actions workflow that builds the site in CI and deploys `dist/`
to Cloudflare Pages via `cloudflare/wrangler-action@v3` (direct upload) on every push to `main`.

Required GitHub configuration:

- **Secrets**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- **Variables**: `CLOUDFLARE_PROJECT_NAME`

If either secret is missing, the workflow logs a notice and skips the deploy step instead of
failing — so a freshly cloned template still passes CI before Cloudflare is configured.

**Caveat:** direct-upload deployments created this way do **not** carry a git `commit_hash` in
`deployment_trigger.metadata` (there's no git-integration on the Cloudflare side to attach one).
Backend verification for this option can only match a deployment by its `created_on` timestamp
falling at/after the moment verification started (with a small clock-skew allowance) — it
cannot confirm which specific commit a deployment corresponds to.

### Backend verification (either option)

When a site's `deploy_provider` is set to `cloudflare_pages`, the pipeline can trigger a
Cloudflare Pages deploy hook after pushing generated content (`cloudflare_deploy_hook_env_var`
names the env var holding the hook URL — leave unset for Option A) and verify the deployment
went live, either via the Cloudflare API (commit-hash or created-on match, as above) or, if no
API credentials/project are configured, by polling `deploy_url` for HTTP 200. That HTTP-200
fallback only proves the URL is reachable — it does **not** prove the new content is what's
being served, since a 200 response can come from a previous deployment that's still live.

## Content sync

To import generated files from another folder into this site:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-content.ps1 -Source "..\output\my-run\articles"
```

If your pipeline writes somewhere else, pass that folder instead.

## Generator contract

Generated posts should include this front matter:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `draft`
- `tags`
- `canonicalUrl`
- optional `heroImage`
