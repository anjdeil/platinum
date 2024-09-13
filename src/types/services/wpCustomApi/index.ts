import { z } from "zod";
import { ProductSchema } from "../../shop";

const CustomDataStatisticSchema = z.object({
    products_count: z.number(),
});

const CustomDataSingleSchema = z.object({
    CustomDataStatisticSchema,
    products: z.array(ProductSchema).optional(),
});

const CustomItemSchema = z.object({
    id: z.number(),
    items: z.array(z.object({
        fa_icon_code: z.string(),
        is_button: z.boolean(),
        menu_order: z.number(),
        parent_id: z.number(),
        title: z.string(),
        type: z.string(),
        url: z.string()
    })),
    language_code: z.string(),
});

const LangParamSchema = z.enum(['en', 'pl', 'de', 'ru', 'uk']).optional();

const QueryParamsSchema = z.object({
    LangParamSchema,
    include: z.array(z.number()).optional(),
}).partial();

const CustomDataBodySchema = z.union([
    CustomDataSingleSchema,
    CustomItemSchema
]);

const CustomDataSchema = z.object({
    success: z.boolean(),
    data: CustomDataBodySchema,
});

export type CustomDataType = z.infer<typeof CustomDataSchema>;
export type QueryParamsType = z.infer<typeof QueryParamsSchema>;
export type LangParamType = z.infer<typeof LangParamSchema>;