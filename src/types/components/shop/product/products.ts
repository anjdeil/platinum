import { z } from "zod";
import { ProductSeoDataSchema } from "./productSEO";

export const ProductCategorySchema = z.object({
  id: z.number(),
  parent_id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  is_hidden: z.boolean().optional(),
  count: z.number(),
  menu_order: z.number().optional(),
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

export const ProductVideosSchema = z.object({
  _type: z.string(),
  type: z.string(),
  video_url: z.string(),
  youtube_url: z.string(),
});

export const ProductAttrOptionSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  color_hex: z.string().optional(),
});

export const ProductTagsSchema = z.object({
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
  option_name: z.string().optional(),
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
  stock_quantity: z.number().nullable(),
  price: VariationPriceSchema.nullable(),
  total_sales: z.number(),
  image: ThumbnailSchema.nullable(),
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
  shipping_methods_allowed: z.array(z.string()).optional(),
  weight: z.number().nullable(),
  total_sales: z.number(),
  image: z.object({
    id: z.number(),
    name: z.string(),
    src: z.string(),
  }),
  attributes: z.array(ProductDefaultAttributesSchema),
});

export const ProductsWithCartDataSchemaWithFinalPrice = ProductsMinimizedSchema.extend({
  finalPrice: z.number().nullable().optional(),
  convertedFinalPrice: z.number(),
  quantity: z.number(),
  variation_id: z.number(),
  product_id: z.number(),
  totalPrice: z.number(),
  convertedTotalPrice: z.number(),
  resolveCount: z.number(),
  isAvailable: z.boolean()
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
  tags: z.array(ProductTagsSchema),
  price: ProductPriceSchema.nullable(),
  total_sales: z.number(),
  average_rating: z.number(),
  categories: z.array(ProductCategorySchema),
  thumbnail: ThumbnailSchema.nullable(),
  images: z.array(ProductImageSchema),
  videos: z.array(ProductVideosSchema),
  attributes: z.array(ProductAttributesSchema),
  default_attributes: z.array(ProductDefaultAttributesSchema),
  variations: z.array(ProductVariationSchema),
  seo_data: ProductSeoDataSchema.nullable().optional(),
  upsell_product_ids: z.array(z.number()).optional(),
  crosssell_product_ids: z.array(z.number()).optional(),
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
export type ProductAttributesType = z.infer<typeof ProductAttributesSchema>;
export type ProductAttrOptionType = z.infer<typeof ProductAttrOptionSchema>;
export type ProductImageType = z.infer<typeof ProductImageSchema>;
export type ProductVariationType = z.infer<typeof ProductVariationSchema>;
export type ProductsMinimizedType = z.infer<typeof ProductsMinimizedSchema>;
export type LineItemType = z.infer<typeof LineItemSchema>;
export type ProductsWithCartDataType = z.infer<typeof ProductsWithCartDataSchema>;
export type ProductsWithCartDataTypeWithFinalPrice = z.infer<typeof ProductsWithCartDataSchemaWithFinalPrice>;
