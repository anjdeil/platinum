import { z } from "zod";

export const userLoyalityStatusSchema = z.enum(["silver", "gold", "platinum"]);
export type UserLoyalityStatusType = z.infer<typeof userLoyalityStatusSchema>;

export const discountMapping: Record<UserLoyalityStatusType, string> = {
  silver: "-5%",
  gold: "-10%",
  platinum: "-15%",
};

export const WishlistItemSchema = z.object({
  product_id: z.number(),
  variation_id: z.number().optional(),
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
