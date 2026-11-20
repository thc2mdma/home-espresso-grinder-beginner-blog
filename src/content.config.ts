import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Astro 6 removed implicit src/content/ discovery — without an explicit
  // loader the collection silently matches zero files.
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    canonicalUrl: z.string().url().optional(),
    heroImage: z.string().optional()
  })
});

export const collections = { blog };
