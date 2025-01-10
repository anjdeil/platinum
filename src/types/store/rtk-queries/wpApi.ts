import {
  ProductDefaultAttributesSchema,
  ProductImageSchema,
} from '@/types/pages/shop';
import { z } from 'zod';

export const userLoyalityStatusSchema = z.enum(['silver', 'gold', 'platinum']);
export type UserLoyalityStatusType = z.infer<typeof userLoyalityStatusSchema>;

export const discountMapping: Record<UserLoyalityStatusType, string> = {
  silver: '-5%',
  gold: '-10%',
  platinum: '-15%',
};

export const WishlistItemSchema = z.object({
  product_id: z.number(),
  variation_id: z.number().optional(),
});

const MergedWishlistItemSchema = WishlistItemSchema.extend({
  id: z.number(),
  parent_id: z.number(),
  sku: z.string().nullable(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  created: z.string(),
  modified: z.string(),
  stock_quantity: z.number().optional(),
  price: z.number().optional(),
  image: ProductImageSchema,
  attributes: z.array(ProductDefaultAttributesSchema),
  language_code: z.string().optional(),
  average_rating: z.number(),
});

const MetaSchema = z.object({
  loyalty: userLoyalityStatusSchema,
  wishlist: z.array(WishlistItemSchema),
});

const WpUserSchema = z.object({
  avatar_urls: z.object({}),
  description: z.string(),
  id: z.number(),
  is_super_admin: z.boolean(),
  link: z.string().url(),
  meta: MetaSchema,

  name: z.string(),
  slug: z.string(),
  url: z.string().url(),
});

export type WpUserType = z.infer<typeof WpUserSchema>;
export type WishlistItem = z.infer<typeof WishlistItemSchema>;
export type MergedWishlistItem = z.infer<typeof MergedWishlistItemSchema>;
