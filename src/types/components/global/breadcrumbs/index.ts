import { z } from "zod";

export const BreadcrumbSchema = z.object({
    name: z.string(),
    url: z.string()
});

export const BreadcrumbsSchema = z.object({
  links: z.array(BreadcrumbSchema),
  locale: z.string().optional(),
  fullUrl: z.string().optional(),
  currentName: z.string().optional(),
});

export type BreadcrumbType = z.infer<typeof BreadcrumbSchema>;
export type BreadcrumbsProps = z.infer<typeof BreadcrumbsSchema>;
