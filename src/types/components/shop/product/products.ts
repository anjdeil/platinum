import { z } from "zod";

// Схеми продуктів
export const ProductCategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  count: z.number(),
});


export const ThumbnailSchema = z.object({
  id: z.number(),
  name: z.string(),
  src: z.string(),
});

export const ProductImageSchema = z.object({
  id: z.number(),
  name: z.string(),
  src: z.string(),
});

export const ProductAttrOptionSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const ProductAttributesSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  options: z.array(ProductAttrOptionSchema),
});

export const ProductDefaultAttributesSchema = z.object({
  id: z.number(),
  slug: z.string(),
  option: z.string(),
});

export const ProductPriceSchema = z.object({
  min_price: z.number(),
  max_price: z.number(),
  regular_price: z.number().optional(),
  sale_price: z.number().optional(),
  sale_dates_from: z.string().optional(),
  sale_dates_to: z.string().optional(),
});

export const VariationPriceSchema = z.object({
  regular_price: z.number(),
  sale_price: z.number().optional(),
  sale_dates_from: z.string().optional(),
  sale_dates_to: z.string().optional(),
});

export const ProductVariationSchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  sku: z.string().nullable(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  created: z.string(),
  modified: z.string(),
  stock_quantity: z.number().optional(),
  price: VariationPriceSchema.nullable(),
  total_sales: z.number(),
  image: z.string().nullable(),
  attributes: z.array(ProductDefaultAttributesSchema),
});

export const ProductsMinimizedSchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  sku: z.string().nullable(),
  slug: z.string(),
  parent_slug: z.string(),
  parent_name: z.string(),
  name: z.string(),
  language_code: z.string().optional(),
  stock_quantity: z.number().optional(),
  average_rating: z.number(),
  price: z.union([ProductPriceSchema, VariationPriceSchema]),
  weight: z.number(),
  total_sales: z.number(),
  image: z.object({
    id: z.number(),
    name: z.string(),
    src: z.string(),
  }),
  attributes: z.array(ProductDefaultAttributesSchema),
});

export const ProductsWithCartDataSchema = ProductsMinimizedSchema.extend({
  quantity: z.number().optional(),
  variation: z.number().optional(),
});

export const ProductSchema = z.object({
  id: z.number(),
  sku: z.string().nullable(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.string(),
  created: z.string(),
  modified: z.string(),
  language_code: z.string(),
  stock_quantity: z.number().nullable(),
  price: ProductPriceSchema.nullable(),
  total_sales: z.number(),
  average_rating: z.number(),
  categories: z.array(ProductCategorySchema),
  thumbnail: ThumbnailSchema.nullable(),
  images: z.array(ProductImageSchema),
  attributes: z.array(ProductAttributesSchema),
  default_attributes: z.array(ProductDefaultAttributesSchema),
  variations: z.array(ProductVariationSchema),
});

export const ProductDataResponseSchema = z.object({
  products_count: z.number(),
  products: z.array(ProductSchema).optional(),
});

export const LineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_name: z.string().nullable(),
  product_id: z.number(),
  variation_id: z.number(),
  quantity: z.number(),
  tax_class: z.string(),
  subtotal: z.string(),
  subtotal_tax: z.string(),
  total: z.string(),
  total_tax: z.string(),
  taxes: z.array(z.any()),
  meta_data: z.array(z.any()),
  image: z.object({
    id: z.number(),
    src: z.string(),
  }),
  sku: z.string(),
  price: z.number(),
});

// Типи
export type ProductType = z.infer<typeof ProductSchema>;
export type ProductPriceType = z.infer<typeof ProductPriceSchema>;
export type VariationPriceType = z.infer<typeof VariationPriceSchema>;
export type ProductVariation = z.infer<typeof ProductVariationSchema>;
export type ProductDataResponseType = z.infer<typeof ProductDataResponseSchema>;
export type defaultAttributesType = z.infer<typeof ProductDefaultAttributesSchema>;
export type ProductImageType = z.infer<typeof ProductImageSchema>;
export type ProductVariationType = z.infer<typeof ProductVariationSchema>;
export type ProductsMinimizedType = z.infer<typeof ProductsMinimizedSchema>;
export type LineItemType = z.infer<typeof LineItemSchema>;
export type ProductsWithCartDataType = z.infer<typeof ProductsWithCartDataSchema>;
