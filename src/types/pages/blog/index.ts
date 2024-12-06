import { isError } from 'lodash';
import { z } from 'zod';

export const ThumbnailSchema = z.object({
  id: z.number(),
  name: z.string(),
  src: z.string(),
});

export const BlogItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  thumbnail: z.union([
    z.object({
      id: z.number(),
      name: z.string(),
      src: z.string(),
    }),
    z.null(),
  ]),
  type: z.string(),
  created: z.string(),
  modified: z.string(),
  status: z.string(),
  language_code: z.string(),
  menu_order: z.number(),
  categories: z.array(
    z.object({
      id: z.number(),
      parent_id: z.number(),
      name: z.string(),
      slug: z.string(),
      description: z.string(),
      count: z.number(),
    })
  ),
});

export const BlogItemPropsSchema = z.object({
  post: BlogItemSchema,
});

export const BlogListBlockPropsSchema = z.object({
  posts: z.array(BlogItemSchema),
  isError: z.boolean(),
  isLoading: z.boolean(),
});

export const BlogListSkeletonPropsSchema = z.object({
  length: z.number(),
});

export type BlogItemType = z.infer<typeof BlogItemSchema>;
export type BlogItemTypeProps = z.infer<typeof BlogItemPropsSchema>;
export type BlogListBlockProps = z.infer<typeof BlogListBlockPropsSchema>;
export type BlogListSkeletonProps = z.infer<typeof BlogListSkeletonPropsSchema>;
