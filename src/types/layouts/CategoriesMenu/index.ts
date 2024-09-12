import { z } from "zod";

export const SubcategorySchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    url: z.string(),
});

export const CategoriesMenuSchema = z.object({
    id: z.number(),
    categoryName: z.string(),
    url: z.string(),
    subcategories: z.array(SubcategorySchema),
});

export type Category = z.infer<typeof CategoriesMenuSchema>;
export type Subcategory = z.infer<typeof SubcategorySchema>;