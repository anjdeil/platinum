import { ProductsMinimizedType } from '@/types/components/shop/product/products'
import { CartItem } from '@/types/store/reducers/сartSlice';

export default function checkProductAvailability(
  item: CartItem,
  productsSpecs: ProductsMinimizedType[]
) {
  if (!item || !item.product_id || !item.quantity) {
    throw new Error('Invalid item object')
  }

  if (!productsSpecs) {
    console.warn(`Products specs not found`)
    return { resolveCount: undefined }
  }

  let productSpecs: ProductsMinimizedType | undefined

  if (!item.variation_id) {
    productSpecs = productsSpecs.find((spec) => spec.id === item.product_id)
  } else if (!Number.isNaN(item.variation_id)) {
    productSpecs = productsSpecs.find((spec) => spec.id === item.variation_id)
  }

  if (!productSpecs) {
    console.warn(`Product with ID ${item.product_id} not found`)
    return { resolveCount: undefined }
  }

  const stockQuantity = productSpecs.stock_quantity ?? 0
  const resolveCount = stockQuantity
  const isAvailable = stockQuantity < item.quantity || stockQuantity === 0 ? false : true

  return { resolveCount, isAvailable }
}
