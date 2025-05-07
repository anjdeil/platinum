import { z } from "zod";

export type OpenGraphSeoData = z.infer<typeof OpenGraphSeoSchema>;
export type ProductSeoData = z.infer<typeof ProductSeoDataSchema>;
export type CategorySeoData = z.infer<typeof CategorySeoDataSchema>;
export type PostSeoData = z.infer<typeof PostSeoDataSchema>;
export type PageSeoData = z.infer<typeof PageSeoDataSchema>;
export type PostCategorySeoData = z.infer<typeof PostCategorySeoDataSchema>;

export const OpenGraphSeoSchema = z.object({
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
  title: z.string(),
  description: z.string(),
  images: z.array(z.any()).nullable(),
  image_scan_date: z.string().datetime().nullable(),
  og: OpenGraphSeoSchema,
});

export const CategorySeoDataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const PostCategorySeoDataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const PostSeoDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.any()).nullable(),
  image_scan_date: z.string().datetime().nullable(),
  og: OpenGraphSeoSchema,
});

export const PageSeoDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.any()).nullable(),
  image_scan_date: z.string().datetime().nullable(),
  og: OpenGraphSeoSchema,
});
