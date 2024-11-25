import { CartItem } from "@/types/store/reducers/сartSlice";

export const saveCartItemsToLocalStorage = (cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
        const cartItemsJSON = JSON.stringify(cartItems);
        localStorage.setItem('cartItems', cartItemsJSON);
    }
}

export const getCartItemsFromLocalStorage = (): CartItem[] | undefined => {
    if (typeof window !== 'undefined') {
        const cartItemsJSON = localStorage.getItem('cartItems');

        if (!cartItemsJSON) return undefined;

        const cartItems = JSON.parse(cartItemsJSON);
        return cartItems;
    }

    return undefined;
}