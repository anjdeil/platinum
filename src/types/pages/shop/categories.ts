import { CategoriesBarSchema } from '@/types/components/sections';
import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  count: z.number(),
  language_code: z.string(),
  image: z.string().optional(),
  menu_order: z.number().optional(),
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
