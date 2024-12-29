import { z } from "zod";
import { CategorySchema } from "../categories";

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

export const CategoriesWrapperSchema = z.object({
    shop: z.boolean(),
    active: z.boolean().optional(),
    backgroundColor:z.string().optional(),
    top:  z.string().optional(),
});

export const ListWrapperPropsSchema = z.object({
    shop: z.boolean(),
    isVisible: z.boolean().optional(),
    isSubcategories: z.boolean().optional(),
});

export const LinkWrapperPropsSchema = z.object({
    isactive: z.string().optional(),
    isactivehover: z.string().optional(),
});

export const CategoriesMenuPropsSchema = z.object({
    isMenuVisible: z.boolean(),
    shop: z.boolean(),
    selectedCategories: z.array(CategorySchema).optional(),
    switchCategory: z.function().args(z.string(), z.string().optional()).returns(z.void()).optional(),
});

export type Category = z.infer<typeof CategoriesMenuSchema>;
export type Subcategory = z.infer<typeof SubcategorySchema>;
export type ListWrapperProps = z.infer<typeof ListWrapperPropsSchema>;
export type CategoriesWrapperProps = z.infer<typeof CategoriesWrapperSchema>;
export type LinkWrapperProps = z.infer<typeof LinkWrapperPropsSchema>;
export type CategoriesMenuPropsType = z.infer<typeof CategoriesMenuPropsSchema>;