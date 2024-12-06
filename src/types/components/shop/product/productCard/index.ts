import { ProductSchema } from '@/types/pages/shop'
import { WishlistItemSchema } from '@/types/store/reducers/сartSlice'
import { z } from 'zod'

export const CommonTextPropsSchema = z.object({
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  mobFontSize: z.string().optional(),
  mobLineHeight: z.string().optional(),
  mobFontWeight: z.number().optional(),
})

export const ProductCardPropsTypeShema = z.object({
  product: ProductSchema,
  handleDisire: z.function().args(z.number(), z.number().optional()).returns(z.void()),
  wishlist: z.array(WishlistItemSchema),
  isLoading: z.boolean(),
})

export type CommonTextProps = z.infer<typeof CommonTextPropsSchema>
export type ProductCardPropsType = z.infer<typeof ProductCardPropsTypeShema>
