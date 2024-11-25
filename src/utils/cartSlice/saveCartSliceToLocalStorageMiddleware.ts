import { Middleware } from "@reduxjs/toolkit";
import { saveCartItemsToLocalStorage } from "./cartItemsFunctions";

const saveCartSliceToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const { cartItems } = store.getState().cartSlice;
    saveCartItemsToLocalStorage(cartItems);
    return result;
};

export default saveCartSliceToLocalStorageMiddleware;