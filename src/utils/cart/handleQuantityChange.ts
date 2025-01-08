import { updateCart } from '@/store/slices/cartSlice';
import { CartItem } from '@/types/store/reducers/сartSlice';

export const handleQuantityChange = (
  cartItems: CartItem[],
  dispatch: (action: any) => void,
  product_id: number,
  action: 'inc' | 'dec' | 'value',
  variation_id?: number,
  newQuantity?: number | boolean
) => {
  const updatedItem = cartItems.find(
    (item: CartItem) =>
      item.product_id === product_id &&
      (!variation_id || item.variation_id === variation_id)
  );

  if (updatedItem) {
    let quantityToUpdate = updatedItem.quantity;

    switch (action) {
      case 'inc':
        quantityToUpdate += 1;
        break;
      case 'dec':
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

    if (quantityToUpdate >= 0) {
      dispatch(
        updateCart({
          product_id,
          variation_id,
          quantity: quantityToUpdate,
        })
      );
      console.log('disp');
    }
  }
};
