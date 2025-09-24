import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem, CartState } from '@/types/store/reducers/cartSlice';
import { getCartItemsFromLocalStorage } from '@/utils/cartSlice/cartItemsFunctions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartInitialState: CartState = {
  cartItems: getCartItemsFromLocalStorage() || [],
  couponCodes: [],
  pendingCoupon: null,
  commentToOrder: '',
  productsData: [],
  needsProductDataUpdate: false,
};

interface ClearConflictedItemsPayload {
  product_id: number;
  variation_id?: number;
}

export const cartSlice = createSlice({
  name: 'Cart',
  initialState: cartInitialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id, variation_id, quantity } = action.payload;

      if (quantity > 0) {
        const foundItem = state.cartItems.find(
          item =>
            item.product_id === product_id &&
            (!variation_id || item.variation_id === variation_id)
        );

        if (foundItem) {
          foundItem.quantity = quantity;
          state.needsProductDataUpdate = false;
        } else {
          state.cartItems.push({
            product_id,
            quantity,
            ...(variation_id && { variation_id }),
          });
          state.needsProductDataUpdate = true;
        }
      } else {
        state.cartItems = state.cartItems.filter(
          item =>
            item.product_id !== product_id ||
            (variation_id && item.variation_id !== variation_id)
        );
        state.needsProductDataUpdate = true;
      }
    },
    clearCart: state => {
      state.cartItems = [];
    },
    setProductsData: (
      state,
      action: PayloadAction<ProductsMinimizedType[]>
    ) => {
      state.productsData = action.payload;
    },
    addCoupon: (state, action: PayloadAction<{ couponCode: string }>) => {
      const { couponCode } = action.payload;
      if (!state.couponCodes.includes(couponCode)) {
        state.couponCodes = [couponCode];
      }
    },
    setPendingCoupon(state, action: PayloadAction<string | null>) {
      state.pendingCoupon = action.payload;
    },
    clearPendingCoupon(state) {
      state.pendingCoupon = null;
    },
    clearCoupons: (state) => {
      state.couponCodes = [];
    },
    removeCoupon: (state, action: PayloadAction<{ couponCode: string }>) => {
      const { couponCode } = action.payload;
      state.couponCodes = state.couponCodes.filter(code => code !== couponCode);
    },
    setCommentToOrder: (state, action: PayloadAction<string>) => {
      state.commentToOrder = action.payload;
    },
    clearCommentToOrder: state => {
      state.commentToOrder = '';
    },
    initializeCart: state => {
      state.needsProductDataUpdate = true;
    },
    clearConflictedItems: (state, action: PayloadAction<ClearConflictedItemsPayload[]>) => {
      const conflictedItems = action.payload;

      state.cartItems = state.cartItems.filter(cartItem => {
        return !conflictedItems.some(
          conflicted =>
            conflicted.product_id === cartItem.product_id &&
            (conflicted.variation_id === undefined || conflicted.variation_id === cartItem.variation_id)
        );
      });

      state.needsProductDataUpdate = true;
    },
  },
});

export const {
  updateCart,
  addCoupon,
  setPendingCoupon,
  clearPendingCoupon,
  removeCoupon,
  clearCoupons,
  setCommentToOrder,
  clearCommentToOrder,
  initializeCart,
  clearCart,
  clearConflictedItems
} = cartSlice.actions;

export default cartSlice.reducer;
