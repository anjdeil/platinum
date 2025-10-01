import { useAppSelector } from "@/store";
import { ProductsWithCartDataTypeWithFinalPrice } from "@/types/components/shop/product/products";
import { CartItem } from "@/types/store/reducers/cartSlice";
import { getProductPrice } from "@/utils/price/getProductPrice";
import { useMemo } from "react";
import { useCurrencyConverter } from "./useCurrencyConverter";

export const useCartData = () => {
    const { cartItems, productsData } = useAppSelector(state => state.cartSlice);
    const { convertCurrency } = useCurrencyConverter();

    const productsWithCartData: ProductsWithCartDataTypeWithFinalPrice[] = useMemo(() => {
        if (!productsData || !cartItems) {
            return [];
        }

        const cartItemsMap = new Map<string, CartItem>();

        cartItems.forEach(cartItem => {
            const key = cartItem.variation_id
                ? `v-${cartItem.product_id}-${cartItem.variation_id}`
                : `p-${cartItem.product_id}`;
            cartItemsMap.set(key, cartItem);
        });

        return productsData
            .map(product => {
                const isVariation = product.parent_id !== 0;
                const key = isVariation
                    ? `v-${product.parent_id}-${product.id}`
                    : `p-${product.id}`;

                const cartItem = cartItemsMap.get(key);
                if (!cartItem) return undefined;

                const quantity = cartItem.quantity || 0;
                const { finalPrice } = getProductPrice(product.price);

                const convertedFinalPrice = convertCurrency(finalPrice || 0);
                const convertedTotalPrice = convertedFinalPrice * quantity;

                const totalPrice = finalPrice ? finalPrice * quantity : 0;

                const stockQuantity = product.stock_quantity ?? 0;
                const resolveCount = stockQuantity;
                const isAvailable = stockQuantity >= quantity && stockQuantity > 0;

                return {
                    ...product,
                    finalPrice,
                    convertedFinalPrice,
                    quantity,
                    variation_id: cartItem?.variation_id || 0,
                    product_id: cartItem?.product_id || product.id,
                    totalPrice,
                    convertedTotalPrice,
                    resolveCount,
                    isAvailable
                };
            })
            .filter((item): item is NonNullable<typeof item> => !!item);
    }, [cartItems, productsData, convertCurrency]);

    const totalCartPrice = useMemo(
        () => productsWithCartData.reduce((sum, i) => sum + i.convertedTotalPrice, 0),
        [productsWithCartData]
    );

    return { productsWithCartData, totalCartPrice };
}
