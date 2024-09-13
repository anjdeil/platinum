import { z } from "zod";
import { CategorySchema, ProductDataResponseSchema } from "../../shop";
import { WpMenuResponseSchema } from "@/types/layouts/menus";

const LangParamSchema = z.enum(['en', 'pl', 'de', 'ru', 'uk']).optional();

const QueryParamsSchema = z.object({
    LangParamSchema,
    include: z.array(z.number()).optional(),
    slug: z.string().optional(),
}).partial();

export const CustomDataMenuResponseSchema = z.object({
    success: z.boolean(),
    data: WpMenuResponseSchema,
})

export const CustomDataProductsSchema = z.object({
    success: z.boolean(),
    data: ProductDataResponseSchema,
})

export const CustomDataCategoriesSchema = z.object({
    success: z.boolean(),
    data: z.array(CategorySchema),
});

export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;
export type CustomDataCategoriesType = z.infer<typeof CustomDataCategoriesSchema>;
export type CustomDataProductsType = z.infer<typeof CustomDataProductsSchema>;
export type CustomDataMenuResponseType = z.infer<typeof CustomDataMenuResponseSchema>;