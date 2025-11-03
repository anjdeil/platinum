import { ProductsWithCartDataTypeWithFinalPrice } from "@/types/components/shop/product/products";
import { discountMapping, userLoyalityStatusSchema } from "@/types/store/rtk-queries/wpApi";

export const calculateCartFront = (cartItems: ProductsWithCartDataTypeWithFinalPrice[], userLoyaltyStatus?: string) => {
    const isValidStatus = userLoyalityStatusSchema.safeParse(userLoyaltyStatus);
    const validStatus = isValidStatus.data;

    const percentString = validStatus
        ? (discountMapping[validStatus] as string)
        : null;

    const discount = percentString
        ? parseFloat(percentString.replace('%', '')) / 100
        : null;

    let subtotal = 0;
    let discountAmount = 0;


    for (const item of cartItems) {
        const itemTotal = item.convertedTotalPrice;
        subtotal += itemTotal;

        if (discount) {
            if (!item.price.sale_price) {
                const itemDiscount = itemTotal * discount;
                discountAmount -= itemDiscount;
            }
        }
    }

    const total = subtotal - discountAmount;

    return {
        subtotal,
        discountAmount,
        total,
    };
}