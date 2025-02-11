import { ProductPriceType, ProductType, VariationPriceType } from "@/types/components/shop/product/products";

export const getCardProductPrice = (product: ProductType) => {
    const now = new Date();

    // Функція для перевірки, чи є акція у продукту або варіації
    const isSaleActive = (priceData: ProductPriceType | VariationPriceType) => {
        if (!priceData?.sale_price) return false;

        const saleFromDate = priceData.sale_dates_from ? new Date(priceData.sale_dates_from) : null;
        const saleToDate = priceData.sale_dates_to ? new Date(priceData.sale_dates_to) : null;

        if (!saleFromDate && !saleToDate) {
            return true; // Безстрокова акція
        }

        if (saleFromDate && !saleToDate) {
            return saleFromDate <= now; // Якщо початок акції в майбутньому, то акція не активна до цієї дати
        }

        if (!saleFromDate && saleToDate) {
            return saleToDate >= now; // Якщо кінцева дата акції ще не пройшла
        }

        return (saleFromDate ? saleFromDate <= now : false) &&
            (saleToDate ? saleToDate >= now : false);
    };

    // Для простих товарів
    if (product.type === 'simple') {
        const priceData = product.price;
        if (!priceData) return { finalPrice: 0, regularPrice: 0, isSale: false };

        const isSale = isSaleActive(priceData);
        const finalPrice = isSale ? priceData.sale_price : priceData.regular_price;

        return { finalPrice, regularPrice: priceData.regular_price || 0, isSale };
    }

    // Для варіативних товарів
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
                    maxPrice = Math.max(maxPrice, variationPriceData.regular_price);
                } else {
                    minPrice = Math.min(minPrice, variationPriceData.regular_price || 0);
                    maxPrice = Math.max(maxPrice, variationPriceData.regular_price || 0);
                }
            }
        });

        if (minPrice === Infinity || maxPrice === -Infinity) {
            minPrice = 0;
            maxPrice = 0;
        }

        return {
            finalPrice: minPrice,
            regularPrice: maxPrice,
            isSale,
        };
    }

    return { finalPrice: 0, regularPrice: 0, isSale: false };
}