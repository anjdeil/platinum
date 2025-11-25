import { updateCart } from '@/store/slices/cartSlice';
import { ProductsWithCartDataTypeWithFinalPrice } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/cartSlice';
import { trackRemoveFromCart } from './trackRemoveFromCart';

export const handleQuantityChange = (
  cartItems: CartItem[],
  dispatch: (action: any) => void,
  product_id: number,
  action: 'inc' | 'dec' | 'value',
  productsWithCartData: ProductsWithCartDataTypeWithFinalPrice[],
  variation_id?: number,
  newQuantity?: number | boolean,
) => {
  const updatedItem = cartItems.find(
    (item: CartItem) =>
      item.product_id === product_id &&
      (!variation_id || item.variation_id === variation_id)
  );

  if (!updatedItem) return;

  let quantityToUpdate = updatedItem.quantity;

  switch (action) {
    case 'inc':
      quantityToUpdate += 1;
      break;
    case 'dec':
      if (quantityToUpdate <= 1) return;
      quantityToUpdate -= 1;
      break;
    case 'value':
      if (typeof newQuantity === 'number' && !isNaN(newQuantity)) {
        quantityToUpdate = newQuantity;
      }
      break;
    default:
      return;
  }

  if (quantityToUpdate < 1) {
    trackRemoveFromCart(updatedItem.product_id, updatedItem.variation_id, cartItems, productsWithCartData);

    return dispatch(
      updateCart({
        product_id,
        variation_id,
        quantity: 0,
      })
    );
  }

  dispatch(
    updateCart({
      product_id,
      variation_id,
      quantity: quantityToUpdate,
    })
  );
};
