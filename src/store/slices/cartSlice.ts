import { ProductsMinimizedType } from '@/types/components/shop/product/products';
import { CartItem, CartState } from '@/types/store/reducers/сartSlice';
import { getCartItemsFromLocalStorage } from '@/utils/cartSlice/cartItemsFunctions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const cartInitialState: CartState = {
  cartItems: getCartItemsFromLocalStorage() || [],
  couponCodes: [],
  commentToOrder: '',
  productsData: [],
  needsProductDataUpdate: false,
};

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
    clearCart: (state) => {
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
        state.couponCodes.push(couponCode);
      }
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
    clearCart: state => {
      state.cartItems = [];
    },
  },
});

export const {
  updateCart,
  clearCart,
  addCoupon,
  removeCoupon,
  setCommentToOrder,
  clearCommentToOrder,
  initializeCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
