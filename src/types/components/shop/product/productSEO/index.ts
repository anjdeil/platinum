import { z } from 'zod';

const SeoImageSchema = z.object({
  'image:loc': z.string(),
});

const SeoRobotsSchema = z.object({
  default: z.boolean(),
  noindex: z.boolean(),
  noarchive: z.boolean(),
  nosnippet: z.boolean(),
  nofollow: z.boolean(),
  noimageindex: z.boolean(),
  noodp: z.boolean(),
  notranslate: z.boolean(),
  max_snippet: z.number(),
  max_videopreview: z.number(),
  max_imagepreview: z.union([z.string(), z.number()]),
});

const SeoOgSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  image_width: z.number().nullable(),
  image_height: z.number().nullable(),
  video: z.string().nullable(),
  article_section: z.string().nullable(),
  article_tags: z.string().nullable(),
});

export const ProductSeoDataSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  images: z.array(SeoImageSchema).nullable(),
  image_scan_date: z.string().nullable(),
  robots: SeoRobotsSchema.nullable(),
  og: SeoOgSchema.nullable(),
});
