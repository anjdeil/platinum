import { ProductPriceType, VariationPriceType } from "@/types/components/shop/product/products";

export const isSaleActive = (priceData: ProductPriceType | VariationPriceType) => {
    if (!priceData?.sale_price) return false;

    const now = new Date();
    const saleFromDate = priceData.sale_dates_from ? new Date(priceData.sale_dates_from) : null;
    const saleToDate = priceData.sale_dates_to ? new Date(priceData.sale_dates_to) : null;

    return (
        // When date is not exists
        (!saleFromDate && !saleToDate) ||
        // When sale date already started but never be gone
        (saleFromDate && !saleToDate && saleFromDate <= now) ||
        // When sale has only finish date
        (!saleFromDate && saleToDate && saleToDate >= now) ||
        // When current date in sale range 
        (saleFromDate && saleToDate && saleFromDate <= now && saleToDate >= now)
    );
};