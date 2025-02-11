import { CurrencyType } from '@/types/components/shop';
import {
  ProductPriceOldStyled,
  ProductPriceStyled,
  ProductPriceWrapper,
} from './styles';

interface ProductPriceProps {
  currency?: CurrencyType;
  minPrice: number;
  maxPrice: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  currency,
  minPrice,
  maxPrice,
}) => {
  return (
    <ProductPriceWrapper>
      {maxPrice !== minPrice && (
        <ProductPriceOldStyled>{`${maxPrice.toFixed(2)}  ${
          currency ? currency.code : 'zl'
        }`}</ProductPriceOldStyled>
      )}
      <ProductPriceStyled>{`${minPrice.toFixed(2)}  ${
        currency ? currency.code : 'zl'
      }`}</ProductPriceStyled>
    </ProductPriceWrapper>
  );
};

export default ProductPrice;
