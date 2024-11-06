import { z } from "zod";

export const BlogItemSchema = z.object({
    id: z.number(),
    slug: z.string(),
    status: z.string(),
    type: z.string(),
    title: z.string(),
    content: z.string(),
    excerpt: z.string(),
    created: z.string(),
    modified: z.string(),
    thumbnail: z.string().url(),
});

export const BlogItemPropsSchema = z.object({
    post: BlogItemSchema,
});

export const BlogListBlockPropsSchema = z.object({
    posts: z.array(BlogItemSchema),
});

export type BlogItemType = z.infer<typeof BlogItemSchema>;
export type BlogItemProps = z.infer<typeof BlogItemPropsSchema>;
export type BlogListBlockProps = z.infer<typeof BlogListBlockPropsSchema>;