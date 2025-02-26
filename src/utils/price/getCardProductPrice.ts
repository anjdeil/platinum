import { ProductType } from '@/types/components/shop/product/products';
import { isSaleActive } from './isSaleActive';

export const getCardProductPrice = (product: ProductType) => {
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

    product.variations.forEach(({ price }) => {
      if (!price) return;

      const variationIsSale = isSaleActive(price);

      if (variationIsSale) {
        isSale = true;
      }

      if (price.sale_price && variationIsSale) {
        minPrice = Math.min(minPrice, price.sale_price);
        maxPrice = Math.max(maxPrice, price.sale_price);
      } else {
        minPrice = Math.min(minPrice, price.regular_price || 0);
        maxPrice = Math.max(maxPrice, price.regular_price || 0);
      }
    });

    return {
      finalPrice: minPrice === Infinity ? 0 : minPrice,
      regularPrice: maxPrice === -Infinity ? 0 : maxPrice,
      isSale,
    };
  }

  return { finalPrice: 0, regularPrice: 0, isSale: false };
};
