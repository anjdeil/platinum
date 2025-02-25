import {
  ProductPriceType,
  VariationPriceType,
} from '@/types/components/shop/product/products';
import { isSaleActive } from './isSaleActive';

export const getProductPrice = (
  priceData: ProductPriceType | VariationPriceType
) => {
  if (priceData) {
    const isSale = isSaleActive(priceData);

    const regularPrice = priceData?.regular_price;
    const finalPrice = isSale ? priceData.sale_price : regularPrice;

    return {
      finalPrice,
      regularPrice,
      isSale,
      saleEndDate: priceData.sale_dates_to
        ? new Date(priceData.sale_dates_to)
        : null,
    };
  } else {
    return {
      finalPrice: null,
      regularPrice: null,
      isSale: null,
      saleEndDate: null,
    };
  }
};
