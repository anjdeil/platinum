import { ProductVariation } from "@/types/components/shop/product/products";
import { getProductPrice } from "./price/getProductPrice";

export const getSaleVariation = (variations: ProductVariation[]) => {
    return variations.find(variation => {
        if (!variation.price) {
            return false;
        }
        const { isSale } = getProductPrice(variation.price);
        return isSale;
    });
};