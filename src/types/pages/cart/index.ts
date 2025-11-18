import {
  ProductsMinimizedSchema,
  ProductsWithCartDataSchema,
  ProductsWithCartDataSchemaWithFinalPrice,
} from '@/types/components/shop/product/products';
import { UserTotalsSchema } from '@/types/services/userTotals';
import { OrderTypeSchema, QuoteResponseSchema, SummaryRespShema } from '@/types/services/wooCustomApi/customer';
import {
  lineOrderItemsSchema,
} from '@/types/store/reducers/cartSlice';
import { z } from 'zod';

export const CartProductWarningSchema = z.object({
  onUpdate: z.function().returns(z.void()),
  resolveCount: z.number().optional(),
  isProductError: z.boolean().optional(),
});
export const QuantityComponentSchema = z.object({
  disabled: z.boolean().optional(),
  resolveCount: z.number().optional(),
  item: lineOrderItemsSchema || ProductsWithCartDataSchema || ProductsWithCartDataSchemaWithFinalPrice,
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
  userLoyaltyStatus: z.string().optional(),
  auth: z.boolean(),
  couponError: z.boolean().optional(),
  setCouponError: z
    .function()
    .args(z.boolean())
    .returns(z.void()),
  couponSuccess: z.boolean().optional(),
  isLoading: z.boolean(),
});
export const CartSummaryBlockSchema = z.object({
  symbol: z.string().optional(),
  quote: QuoteResponseSchema.optional(),
  isLoading: z.boolean().optional(),
  cartItems: z.array(ProductsWithCartDataSchemaWithFinalPrice),
  auth: z.boolean(),
  userTotal: UserTotalsSchema.optional(),
  handleGetQuote: z.function().returns(z.promise(QuoteResponseSchema.optional())),
  quoteData: QuoteResponseSchema.optional(),
});
export const CartTableSchema = z.object({
  symbol: z.string().optional(),
  order: OrderTypeSchema.optional(),
  filteredOutItems: z.array(lineOrderItemsSchema).optional(),
  loading: z.boolean().optional(),
  isLoadingOrder: z.boolean().optional(),
  firstLoad: z.boolean().optional(),
  innercartItems: z.array(z.any()).optional(),
  productsSpecs: z.array(ProductsMinimizedSchema).optional(),
  cartItems: z.array(z.any()).optional(),
  roundedPrice: z.function().args(z.number()).returns(z.number()).optional(),
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
  handleDeleteItem: z
    .function()
    .args(z.number(), z.number()) // productId, variationId
    .returns(z.void()),
  loadingItems: z.array(z.number()).optional(),
  productsWithCartData: z.array(ProductsWithCartDataSchemaWithFinalPrice),
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

export const QuoteSummarySchema = z.object({
  quoteData: SummaryRespShema,
  symbol: z.string(),
  isLoading: z.boolean().optional(),
});


export const PreOrderSummarySchema = z.object({
  summary: SummaryRespShema.optional(),
  cartItems: z.array(ProductsWithCartDataSchemaWithFinalPrice),
  isLoading: z.boolean().optional(),
  userTotal: UserTotalsSchema.optional()
});

export type OrderSummaryProps = z.infer<typeof OrderSummarySchema>;

export type QuoteSummaryProps = z.infer<typeof QuoteSummarySchema>;

export type PreOrderSummaryProps = z.infer<typeof PreOrderSummarySchema>;

export type OrderBarProps = z.infer<typeof OrderBarSchema>;

export type CartTableProps = z.infer<typeof CartTableSchema>;

export type CartSummaryBlockProps = z.infer<typeof CartSummaryBlockSchema>;

export type CartCouponBlockProps = z.infer<typeof CartCouponBlockSchema>;

export type BannerCartProps = z.infer<typeof BannerCartSchema>;

export type QuantityComponentProps = z.infer<typeof QuantityComponentSchema>;

export type CartProductWarningProps = z.infer<typeof CartProductWarningSchema>;
