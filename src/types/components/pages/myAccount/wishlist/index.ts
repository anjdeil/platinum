import { ProductsMinimizedSchema } from '@/types/components/shop/product/products'
import { WishlistItemSchema } from '@/types/store/reducers/сartSlice'
import { z } from 'zod'

export const WishListTableSchema = z.object({
  symbol: z.string(),
  wishlist: z.array(ProductsMinimizedSchema).optional(),
  wishlistMinElements: z.array(WishlistItemSchema),
  isLoading: z.boolean(),
  onDelete: z.function().args(WishlistItemSchema).returns(z.void()),
})

export type WishListTableProps = z.infer<typeof WishListTableSchema>
