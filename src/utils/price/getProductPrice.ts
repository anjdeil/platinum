import { ProductPriceType, VariationPriceType } from "@/types/components/shop/product/products";

export const getProductPrice = (priceData: ProductPriceType | VariationPriceType) => {
    const now = new Date();

    const saleFromDate = priceData.sale_dates_from ? new Date(priceData.sale_dates_from) : null;
    const saleToDate = priceData.sale_dates_to ? new Date(priceData.sale_dates_to) : null;

    const isSaleActive =
        priceData.sale_price &&
        (saleFromDate ? saleFromDate <= now : false) &&
        (saleToDate ? saleToDate >= now : false);

    const regularPrice = priceData.regular_price;
    const finalPrice = isSaleActive ? priceData.sale_price : regularPrice;

    return { finalPrice, regularPrice, isSale: !!isSaleActive, saleEndDate: saleToDate };
};