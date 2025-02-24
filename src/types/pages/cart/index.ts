import {
  ProductsMinimizedSchema,
  ProductsWithCartDataSchema,
} from '@/types/components/shop/product/products';
import { OrderTypeSchema } from '@/types/services/wooCustomApi/customer';
import {
  CartItemSchema,
  lineOrderItemsSchema,
} from '@/types/store/reducers/сartSlice';
import { z } from 'zod';

export const CartProductWarningSchema = z.object({
  onUpdate: z.function().returns(z.void()),
  resolveCount: z.number(),
});
export const QuantityComponentSchema = z.object({
  resolveCount: z.number().optional(),
  item: lineOrderItemsSchema || ProductsWithCartDataSchema,
  inputWidth: z.string().optional(),
  inputHeight: z.string().optional(),
  handleChangeQuantity: z
    .function()
    .args(
      z.number(), // product_id
      z.enum(['inc', 'dec', 'value']), // action
      z.number().optional(), // variation_id
      z.union([z.number(), z.boolean()]).optional() // newQuantity
    )
    .returns(z.void()),
});
export const BannerCartSchema = z.object({
  slug: z.string(),
  image: z.string(),
  mobileImage: z.string(),
});
export const CartCouponBlockSchema = z.object({
  symbol: z.string(),
  userLoyalityStatus: z.string().optional(),
  auth: z.boolean(),
});
export const CartSummaryBlockSchema = z.object({
  symbol: z.string(),
  order: OrderTypeSchema.optional(),
  isLoading: z.boolean().optional(),
  cartItems: z.array(CartItemSchema),
  auth: z.boolean(),
});
export const CartTableSchema = z.object({
  symbol: z.string(),
  order: OrderTypeSchema.optional(),
  isLoadingOrder: z.boolean(),
  firstLoad: z.boolean(),
  /*  isLoadingProductsMin: z.boolean(), */
  productsSpecs: z.array(ProductsMinimizedSchema),
  cartItems: z.array(z.any()),
  roundedPrice: z.function().args(z.number()).returns(z.number()),
  hasConflict: z.boolean(),
  handleChangeQuantity: z
    .function()
    .args(
      z.number(), // product_id
      z.enum(['inc', 'dec', 'value']), // action
      z.number().optional(), // variation_id
      z.union([z.number(), z.boolean()]).optional() // newQuantity
    )
    .returns(z.void()),
  loadingItems: z.array(z.number()).optional(),
});
export const OrderBarSchema = z.object({
  subtotal: z.number().optional(),
  totalDisc: z.number().optional(),
  symbol: z.string(),
  isLoadingOrder: z.boolean().optional(),
  productsData: z.array(ProductsMinimizedSchema).optional(),
  miniCart: z.boolean().optional(),
});
export const OrderSummarySchema = z.object({
  order: OrderTypeSchema.nullable().optional(),
  symbol: z.string(),
  isLoading: z.boolean().optional(),
  noPaymentMethod: z.boolean().optional(),
});

export type OrderSummaryProps = z.infer<typeof OrderSummarySchema>;

export type OrderBarProps = z.infer<typeof OrderBarSchema>;

export type CartTableProps = z.infer<typeof CartTableSchema>;

export type CartSummaryBlockProps = z.infer<typeof CartSummaryBlockSchema>;

export type CartCouponBlockProps = z.infer<typeof CartCouponBlockSchema>;

export type BannerCartProps = z.infer<typeof BannerCartSchema>;

export type QuantityComponentProps = z.infer<typeof QuantityComponentSchema>;

export type CartProductWarningProps = z.infer<typeof CartProductWarningSchema>;
