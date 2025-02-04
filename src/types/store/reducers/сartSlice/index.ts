import { ProductsMinimizedSchema } from '@/types/components/shop/product/products';
import { z } from 'zod';

export const CartItemSchema = z.object({
  product_id: z.number(),
  variation_id: z.number().optional(),
  quantity: z.number(),
});

export const CartStateSchema = z.object({
  cartItems: z.array(CartItemSchema),
  couponCodes: z.array(z.string()),
  commentToOrder: z.string(),
  productsData: z.array(ProductsMinimizedSchema),
  needsProductDataUpdate: z.boolean(),
});

export const ProductMinReqSchema = z.object({
  product_id: z.number(),
  quantity: z.number().optional(),
  variation_id: z.number().optional(),
});

export const lineOrderItemsSchema = z.object({
  id: z.number(),
  name: z.string(),
  parent_name: z.string().optional(),
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
  image: z
    .object({
      id: z.number(),
      src: z.string(),
    })
    .optional(),
  sku: z.string(),
  price: z.number(),
});

export type lineOrderItems = z.infer<typeof lineOrderItemsSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type CartState = z.infer<typeof CartStateSchema>;
export type ProductMinReq = z.infer<typeof ProductMinReqSchema>;
