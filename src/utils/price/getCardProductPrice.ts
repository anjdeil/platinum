import { ProductPriceType, ProductType, VariationPriceType } from "@/types/components/shop/product/products";

export const getCardProductPrice = (product: ProductType) => {
    const now = new Date();

    // ! I may be replaced with existing function getIsSaleActive
    const isSaleActive = (priceData: ProductPriceType | VariationPriceType) => {
        if (!priceData?.sale_price) return false;

        const saleFromDate = priceData.sale_dates_from ? new Date(priceData.sale_dates_from) : null;
        const saleToDate = priceData.sale_dates_to ? new Date(priceData.sale_dates_to) : null;

        if (!saleFromDate && !saleToDate) {
            return true; // Unlimited sale
        }

        if (saleFromDate && !saleToDate) {
            return saleFromDate <= now; // If sale is started but never be gone
        }

        if (!saleFromDate && saleToDate) {
            return saleToDate >= now;
        }

        return (saleFromDate ? saleFromDate <= now : false) &&
            (saleToDate ? saleToDate >= now : false);
    };

    // Simple product condition
    if (product.type === 'simple') {
        const priceData = product.price;
        if (!priceData) return { finalPrice: 0, regularPrice: 0, isSale: false };

        const isSale = isSaleActive(priceData);
        const finalPrice = isSale ? priceData.sale_price : priceData.regular_price;

        return { finalPrice, regularPrice: priceData.regular_price || 0, isSale };
    }

    // Variable product condition
    if (product.type === 'variable') {
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        let isSale = false;

        product.variations.forEach((variation) => {
            if (variation.price) {
                const variationPriceData = variation.price;
                const variationIsSale = isSaleActive(variationPriceData);

                if (variationIsSale) {
                    isSale = true;
                }

                if (variationPriceData.sale_price && variationIsSale) {
                    minPrice = Math.min(minPrice, variationPriceData.sale_price);
                    maxPrice = Math.max(maxPrice, variationPriceData.sale_price);
                } else {
                    minPrice = Math.min(minPrice, variationPriceData.regular_price || 0);
                    maxPrice = Math.max(maxPrice, variationPriceData.regular_price || 0);
                }
            }
        });

        return {
            finalPrice: minPrice,
            regularPrice: maxPrice,
            isSale,
        };
    }

    return { finalPrice: 0, regularPrice: 0, isSale: false };
}
