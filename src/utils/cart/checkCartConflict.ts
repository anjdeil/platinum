import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/cartSlice';
import { MAX_QUANTITY } from '../consts';

export default function checkCartConflict(
  cartItems: CartItem[],
  productsSpecs: ProductsMinimizedType[]
) {
  return cartItems.some(
    ({
      product_id: cartProductId,
      variation_id: cartVariationId,
      quantity: cartQuantity,
    }) => {
      if (cartQuantity > MAX_QUANTITY) return true;

      const productSpecs = productsSpecs.find(
        ({ parent_id: specsParentProductId, id: specsVariationId }) => {
          if (cartVariationId)
            return (
              cartProductId === specsParentProductId &&
              cartVariationId === specsVariationId
            );
          return cartProductId === specsVariationId;
        }
      );

      if (!productSpecs) return true;
      const { stock_quantity: specsQuantity } = productSpecs;

      const actualQuantity = specsQuantity ? specsQuantity : 0;
      return actualQuantity < cartQuantity;
    }
  );
}
