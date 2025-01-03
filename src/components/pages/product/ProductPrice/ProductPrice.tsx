import { CurrencyType } from '@/types/components/shop';
import { ProductPriceOldStyled, ProductPriceStyled } from './styles';

interface ProductPriceProps {
  currency?: CurrencyType;
  minPrice?: number | null;
  maxPrice?: number | null;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  currency,
  minPrice,
  maxPrice,
}) => {
  return (
    <>
      {maxPrice && maxPrice !== minPrice && (
        <ProductPriceOldStyled>{maxPrice.toFixed(2)}</ProductPriceOldStyled>
      )}
      {minPrice && (
        <ProductPriceStyled>{`${minPrice.toFixed(2)}  ${currency ? currency.code : 'zl'}`}</ProductPriceStyled>
      )}
    </>
  );
};

export default ProductPrice;
