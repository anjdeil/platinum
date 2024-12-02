import { ProductCardListSkeletonProps } from '@/types/components/shop';
import { StyledProductCardList } from '../styles';
import { SkeletonItem } from './styles';
import { ProductCardSkeleton } from '../../product/ProductCardSkeleton';

export const ProductCardListSkeleton: React.FC<
  ProductCardListSkeletonProps
> = ({ columns, length = 4 }) => {
  const skeletonItems = Array.from({ length }, (_, index) => (
    <SkeletonItem key={index}>
      <ProductCardSkeleton />
    </SkeletonItem>
  ));

  return (
    <StyledProductCardList
      mobileColumns={columns?.mobileColumns}
      tabletColumns={columns?.tabletColumns}
      desktopColumns={columns?.desktopColumns}
    >
      {skeletonItems}
    </StyledProductCardList>
  );
};
