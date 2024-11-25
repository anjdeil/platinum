import { WpMenuResponseSchema } from "@/types/menus/WpMenus";
import { menuItemsSchema } from "./menus";
import { ThemeOptionsItemSchema } from "./themeOptions";
import { AttributeSchema } from "./attributes";
import { z } from "zod";
import { CategorySchema, ProductSchema } from "../../pages/shop";
import { ProductsMinimizedSchema } from "@/types/components/shop/product/products";

const LangParamSchema = z.enum(['en', 'pl', 'de', 'ru', 'uk']).optional();

const QueryParamsSchema = z.object({
    LangParamSchema,
    include: z.array(z.number()).optional(),
    slug: z.string().optional(),
    ids: z.array(z.number()).optional(),
    search: z.string().optional(),
    lang: z.string().optional()
}).partial();

export const CustomDataSchema = z.object({
    statistic: z.object({
        products_count: z.number().optional()
    }).optional(),
});

export const CustomDataMenuResponseSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: z.array(WpMenuResponseSchema),
    })
})

export const CustomDataProductsStatisticSchema = z.object({
    products_count: z.number(),
    min_price: z.number(),
    max_price: z.number(),
    attributes: z.array(AttributeSchema)
})

export const CustomDataProductsSchema = z.object({
    success: z.boolean(),
    data: z.object({
        statistic: CustomDataProductsStatisticSchema,
        items: z.array(ProductSchema),
    })
})

export const CustomDataProductSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        item: ProductSchema,
    })
})

export const CustomDataCategoriesSchema = z.object({
    success: z.boolean(),
    data: CustomDataSchema.extend({
        items: z.array(CategorySchema),
    })
});

export const CustomDataMenusSchema = z.object({
    success: z.boolean(),
    data: z.object({
        items: z.array(menuItemsSchema)
    }).optional(),
});

export const CustomDataThemeOptionsSchema = z.object({
    success: z.boolean(),
    data: z.object({
        item: ThemeOptionsItemSchema
    })
})
export const CustomDataProductsMinimizedResponseSchema  = z.object({
    success: z.boolean(),
    data: z.object({
        items: z.array(ProductsMinimizedSchema)
    })
})


export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;
export type CustomDataCategoriesType = z.infer<typeof CustomDataCategoriesSchema>;
export type CustomDataProductsType = z.infer<typeof CustomDataProductsSchema>;
export type CustomDataProductType = z.infer<typeof CustomDataProductSchema>;
export type CustomDataMenuResponseType = z.infer<typeof CustomDataMenuResponseSchema>;
export type CustomDataMenusType = z.infer<typeof CustomDataMenusSchema>;
export type CustomDataThemeOptionsType = z.infer<typeof CustomDataThemeOptionsSchema>;

export type CustomDataProductsMinimizedResponseType = z.infer<typeof CustomDataProductsMinimizedResponseSchema>;