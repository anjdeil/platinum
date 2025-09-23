import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/cartSlice';
import { getProductPrice } from '../price/getProductPrice';

type CartTotal = {
  totalCost: number;
  totalWeight: number;
};
export default function getCartTotals(
  productsMinimized: ProductsMinimizedType[],
  cartItems: CartItem[],
  convertCurrency: (value: number) => number
): CartTotal {

  return cartItems.reduce(

    (totals, cartItem) => {
      const matchedProduct = productsMinimized.find(({ id, parent_id }) => {
        if (cartItem?.variation_id) {
          if (cartItem.variation_id === id && cartItem.product_id === parent_id)
            return true;
        } else {
          if (cartItem.product_id === id) return true;
        }
      });

      if (matchedProduct) {
        if (matchedProduct.price) {
          const { finalPrice } = getProductPrice(matchedProduct.price);
          const convertedPrice = convertCurrency(finalPrice || 0);
          totals.totalCost += convertedPrice * cartItem.quantity;
        }

        if (matchedProduct.weight !== null) {
          totals.totalWeight += matchedProduct.weight * cartItem.quantity;
        }
      }

      return totals;
    },
    { totalCost: 0, totalWeight: 0 }
  );
}
