import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { Skeleton } from '@mui/material';
import {
  ProductPriceOldStyled,
  ProductPriceStyled,
  ProductPriceWrapper,
} from './styles';

interface ProductPriceProps {
  minPrice: number;
  maxPrice: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ minPrice, maxPrice }) => {
  const { isLoading, convertCurrency, formatPrice } = useCurrencyConverter();

  return (
    <ProductPriceWrapper>
      {!isLoading ? (
        <>
          {maxPrice !== minPrice && (
            <ProductPriceOldStyled>{`${formatPrice(
              convertCurrency(maxPrice)
            )}`}</ProductPriceOldStyled>
          )}
          <ProductPriceStyled>{`${formatPrice(
            convertCurrency(minPrice)
          )}`}</ProductPriceStyled>
        </>
      ) : (
        <Skeleton width="80px" height="40px" />
      )}
    </ProductPriceWrapper>
  );
};

export default ProductPrice;
