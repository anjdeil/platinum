import { CategoriesBarSchema } from '@/types/components/sections';
import { z } from 'zod';

export const CategorySeoOgSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  image_width: z.number().nullable(),
  image_height: z.number().nullable(),
  video: z.string().nullable(),
  article_section: z.string().nullable(),
  article_tags: z.string().nullable(),
});

export const CategorySeoDataSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  og: CategorySeoOgSchema.nullable(),
});

export const CategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  count: z.number(),
  custom_h1: z.string().nullable().optional(),
  custom_description: z.string().nullable().optional(),
  language_code: z.string(),
  image: z.string().optional(),
  menu_order: z.number().optional(),
  is_hidden: z.boolean(),
  seo_data: CategorySeoDataSchema.nullable().optional(),
});

export const CategoryItemContainerPropsSchema = z.object({
  double: z.boolean(),
});

export const CategoriesBlockPropsSchema = z.object({
  categories: z.array(CategoriesBarSchema),
});

export const CategoryItemPropsSchema = z.object({
  imageURL: z.string().url(),
  name: z.string(),
  slug: z.string(),
  double: z.boolean(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
export type CategoryItemContainerProps = z.infer<
  typeof CategoryItemContainerPropsSchema
>;
export type CategoriesBlockProps = z.infer<typeof CategoriesBlockPropsSchema>;
export type CategoryItemProps = z.infer<typeof CategoryItemPropsSchema>;
