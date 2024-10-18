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

export const ListWrapperPropsSchema = z.object({
    isVisible: z.boolean().optional(),
    isSubcategories: z.boolean().optional(),
});

export type Category = z.infer<typeof CategoriesMenuSchema>;
export type Subcategory = z.infer<typeof SubcategorySchema>;
export type ListWrapperProps = z.infer<typeof ListWrapperPropsSchema>;