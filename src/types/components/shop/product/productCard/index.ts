import { WishlistItemSchema } from '@/types/store/rtk-queries/wpApi';
import { z } from 'zod';
import { ProductSchema } from '../products';

export const CurrencySchema = z.object({
  name: z.string(),
  code: z.string(),
  rate: z.number().optional(),
});

export const CommonTextPropsSchema = z.object({
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  mobFontSize: z.string().optional(),
  mobLineHeight: z.string().optional(),
  mobFontWeight: z.number().optional(),
});

export const ProductCardPropsTypeShema = z.object({
  product: ProductSchema,
  handleDisire: z
    .function()
    .args(z.number(), z.number().optional())
    .returns(z.void()),
  wishlist: z.array(WishlistItemSchema),
  isLoading: z.boolean(),
  currency: CurrencySchema,
});

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>;
export type ProductCardPropsType = z.infer<typeof ProductCardPropsTypeShema>;
export type CurrencyType = z.infer<typeof CurrencySchema>;