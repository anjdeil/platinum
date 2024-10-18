import { z } from "zod";

export const ProductCategorySchema = z.object({
    id: z.number(),
    parent_id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    count: z.number()
})

export const ProductImageSchema = z.object({
    id: z.number(),
    name: z.string(),
    src: z.string(),
})

export const ProductAttributesSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    options: z.array(z.object({
        id: z.number(),
        slug: z.string(),
        name: z.string(),
    }))
})

export const ProductDefaultAttributesSchema = z.object({
    id: z.number(),
    slug: z.string(),
    option: z.string(),
})

export const ProductVariationSchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    sku: z.string().nullable(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    created: z.string(),
    modified: z.string(),
    stock_quantity: z.number().nullable(),
    price: z.number().nullable(),
    image: z.string().nullable(),
    attributes: z.array(ProductDefaultAttributesSchema),
})

export const ProductSchema = z.object({
    id: z.number(),
    sku: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    created: z.string(),
    modified: z.string(),
    language_code: z.string(),
    stock_quantity: z.number(),
    min_price: z.number(),
    max_price: z.number(),
    categories: z.array(ProductCategorySchema),
    images: z.array(ProductImageSchema),
    attributes: z.array(ProductAttributesSchema),
    default_attributes: z.array(ProductDefaultAttributesSchema),
    variations: z.array(ProductVariationSchema),
})

export const ProductDataResponseSchema = z.object({
    products_count: z.number(),
    products: z.array(ProductSchema).optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
export type ProductDataResponseType = z.infer<typeof ProductDataResponseSchema>;