import { useTranslations } from 'next-intl';
import { AvailableStyles, EmptyStyled } from './styles';
import { Skeleton } from '@mui/material';

interface ProductAvailableProps {
  count: number;
}

const ProductAvailable: React.FC<ProductAvailableProps> = ({ count }) => {
  const t = useTranslations('Product');

  return (
    <>
      {!count ? (
        <Skeleton width="120px" height="24px" />
      ) : (
        <>
          {count > 0 ? (
            <AvailableStyles>
              {`${t('available', { count: count })}`}
            </AvailableStyles>
          ) : (
            <EmptyStyled>{t(`notAvailable`)}</EmptyStyled>
          )}
        </>
      )}
    </>
  );
};

export default ProductAvailable;
