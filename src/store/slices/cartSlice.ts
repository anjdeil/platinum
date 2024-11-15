import { CartItem, CartState } from "@/types/store/reducers/сartSlice";
import { getCartItemsFromLocalStorage } from "@/utils/cartSlice/cartItemsFunctions";
import { createSlice } from "@reduxjs/toolkit";

const cartInitialState: CartState = {
    cartItems: getCartItemsFromLocalStorage() || []
};

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: cartInitialState,
    reducers: {
        updateCart: ({ cartItems }, { payload }: { payload: CartItem }) => {
            const { product_id, variation_id, quantity } = payload;

            if (quantity > 0) {

                const foundItem = cartItems.find((item) =>
                    item.product_id === product_id && (!variation_id || item.variation_id === variation_id)
                );

                if (foundItem) {
                    foundItem.quantity = quantity;
                } else {
                    cartItems.push({
                        product_id,
                        quantity,
                        ...(variation_id && { variation_id }),
                    });
                }
            } else {
                cartItems = cartItems.filter((item) =>
                    item.product_id !== product_id || (variation_id && item.variation_id !== variation_id)
                );
            }
        }
    }
});

export const {
    updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;