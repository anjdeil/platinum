import { ProductsWithCartDataTypeWithFinalPrice } from '@/types/components/shop/product/products';
import { CartItem } from '@/types/store/reducers/cartSlice';

export const trackRemoveFromCart = (
    product_id: number,
    variation_id: number | undefined,
    cartItems: CartItem[],
    productsWithCartData: ProductsWithCartDataTypeWithFinalPrice[]
) => {
    const cartItem = cartItems.find(
        item =>
            item.product_id === product_id &&
            (!variation_id || item.variation_id === variation_id)
    );

    if (!cartItem) return;

    const productData = productsWithCartData.find(
        p =>
            (p.id === product_id && !variation_id) ||
            (p.id === variation_id && p.parent_id === product_id)
    );

    if (!productData) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'remove_from_cart',
        item_id: productData.id,
        item_name: productData.name,
        quantity: cartItem.quantity,
        price: productData.finalPrice || 0,
    });
};
