import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeArticleHeadings from "./plugins/rehype-article-headings.mjs";

export default defineConfig({
  // The fallback below is rewritten with the blog's real URL at provision time
  // (and can be overridden per build with PUBLIC_SITE_URL). It feeds canonical
  // tags, the sitemap and robots.txt: a stale value here silently points search
  // engines at a domain the blog does not live on.
  site: process.env.PUBLIC_SITE_URL || "https://home-espresso-grinder-beginner-blog.301.ovh",
  integrations: [mdx(), sitemap()],
  // Self-hosted and preloaded, with metric-matched fallbacks: no third-party
  // request on render and no layout shift when the webfont swaps in.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--font-display",
      weights: [500, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"]
    },
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--font-body",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"]
    }
  ],
  markdown: {
    rehypePlugins: [rehypeArticleHeadings],
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
