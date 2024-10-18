import { z } from "zod";
import { CategorySchema, ProductDataResponseSchema } from "../../pages/shop";
import { WpMenuResponseSchema } from "@/types/menus/wpMenus";

const LangParamSchema = z.enum(['en', 'pl', 'de', 'ru', 'uk']).optional();

const QueryParamsSchema = z.object({
    LangParamSchema,
    include: z.array(z.number()).optional(),
    slug: z.string().optional(),
}).partial();

export const CustomDataSchema = z.object({
    statistic: z.object({
        products_count: z.number().optional(),
    }).optional(),
});

export const CustomDataMenuResponseSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: z.array(WpMenuResponseSchema),
    })
})

export const CustomDataProductsSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: z.array(ProductDataResponseSchema),
    })
})

export const CustomDataProductSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: ProductDataResponseSchema,
    })
})

export const CustomDataCategoriesSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: z.array(CategorySchema),
    })
});

export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;
export type CustomDataCategoriesType = z.infer<typeof CustomDataCategoriesSchema>;
export type CustomDataProductsType = z.infer<typeof CustomDataProductsSchema>;
export type CustomDataProductType = z.infer<typeof CustomDataProductSchema>;
export type CustomDataMenuResponseType = z.infer<typeof CustomDataMenuResponseSchema>;