import { ProductCardListSkeletonProps } from '@/types/layouts/Skeleton';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { StyledProductCardList } from '../ProductCardsList/styles';
import { SkeletonItem } from './styles';

export const ProductCardListSkeleton: React.FC<ProductCardListSkeletonProps> = ({ columns }) => {
    const skeletonItems = Array.from({ length: 4 }, (_, index) => (
        <SkeletonItem key={index}>
            <ProductCardSkeleton />
        </SkeletonItem>
    ));

    return <StyledProductCardList
        mobileColumns={columns?.mobileColumns}
        tabletColumns={columns?.tabletColumns}
        desktopColumns={columns?.desktopColumns}
    >{skeletonItems}</StyledProductCardList>;
};
