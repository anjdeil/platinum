import { ProductVariationType } from "@/types/components/shop/product/products";

export const getAvailableVariation = (variations: ProductVariationType[]) => {
    return variations.find(v => Number(v.stock_quantity) > 0);
};
