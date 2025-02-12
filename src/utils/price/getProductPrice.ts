import { ProductPriceType, VariationPriceType } from "@/types/components/shop/product/products";

export const getProductPrice = (priceData: ProductPriceType | VariationPriceType) => {
    const now = new Date();

    const saleFromDate = priceData.sale_dates_from ? new Date(priceData.sale_dates_from) : null;
    const saleToDate = priceData.sale_dates_to ? new Date(priceData.sale_dates_to) : null;

    const isSaleActive =
        Boolean(priceData.sale_price &&
            (
                // When date is not exists
                (!saleFromDate && !saleToDate) ||
                // When sale date already started but never be gone
                (saleFromDate && !saleToDate && saleFromDate <= now) ||
                // When current date in sale range 
                (saleFromDate && saleToDate && saleFromDate <= now && saleToDate >= now) ||
                // When sale has only finish date
                (!saleFromDate && saleToDate && saleToDate >= now)
            ));

    const regularPrice = priceData.regular_price;
    const finalPrice = isSaleActive ? priceData.sale_price : regularPrice;

    return { finalPrice, regularPrice, isSale: isSaleActive, saleEndDate: saleToDate };
};
