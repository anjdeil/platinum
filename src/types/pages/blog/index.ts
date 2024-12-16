import { z } from 'zod';

export const ThumbnailSchema = z.object({
  id: z.number(),
  name: z.string(),
  src: z.string(),
});

export const BaseBlogItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  thumbnail: z.union([
    z.object({
      id: z.number(),
      name: z.string(),
      src: z.string(),
    }),
    z.null(),
  ]),
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

export const BlogItemSchema = BaseBlogItemSchema.extend({
  content: z.string(),
});

const BlogParsedItemSchema = BaseBlogItemSchema.extend({
  parsedContent: z.string(),
});

export const BlogItemUnionSchema = z.union([
  BlogItemSchema,
  BlogParsedItemSchema,
]);

export const BlogPageDataFullSchema = z.object({
  success: z.boolean(),
  data: z.object({
    statistic: z
      .object({
        posts_count: z.number().optional(),
      })
      .optional(),
    items: z.array(BlogItemSchema),
  }),
});

export const BlogListBlockPropsSchema = z.object({
  posts: z.array(BlogItemSchema),
  isError: z.boolean().optional(),
  isLoading: z.boolean().optional(),
});

export const BlogListSkeletonPropsSchema = z.object({
  length: z.number(),
});

export type BlogItemType = z.infer<typeof BlogItemSchema>;
export type BlogListBlockProps = z.infer<typeof BlogListBlockPropsSchema>;
export type BlogListSkeletonProps = z.infer<typeof BlogListSkeletonPropsSchema>;
export type BlogParsedItemType = z.infer<typeof BlogParsedItemSchema>;
export type BlogItemUnionType = z.infer<typeof BlogItemUnionSchema>;
