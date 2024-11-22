import { CartItem, CartState } from "@/types/store/reducers/сartSlice";
import { getCartItemsFromLocalStorage } from "@/utils/cartSlice/cartItemsFunctions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const cartInitialState: CartState = {
  cartItems: getCartItemsFromLocalStorage() || [],
  couponCodes: [],
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState: cartInitialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id, variation_id, quantity } = action.payload;

      if (quantity > 0) {
        const foundItem = state.cartItems.find(
          (item) =>
            item.product_id === product_id &&
            (!variation_id || item.variation_id === variation_id) // Fixed the logic here
        );

        if (foundItem) {
          foundItem.quantity = quantity;
        } else {
          state.cartItems.push({
            product_id,
            quantity,
            ...(variation_id && { variation_id }),
          });
        }
      } else {
        state.cartItems = state.cartItems.filter(
          (item) =>
            item.product_id !== product_id ||
            (variation_id && item.variation_id !== variation_id)
        );
      }
    },
    addCoupon: (state, action: PayloadAction<{ couponCode: string }>) => {
      const { couponCode } = action.payload;
      if (!state.couponCodes.includes(couponCode)) {
        state.couponCodes.push(couponCode);
      }
    },
    removeCoupon: (state, action: PayloadAction<{ couponCode: string }>) => {
      const { couponCode } = action.payload;
      state.couponCodes = state.couponCodes.filter(
        (code) => code !== couponCode
      );
    },
  },
});

export const { updateCart, addCoupon, removeCoupon } = cartSlice.actions;

export default cartSlice.reducer;
