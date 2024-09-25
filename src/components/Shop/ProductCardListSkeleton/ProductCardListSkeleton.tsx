import { useResponsive } from '@/hooks/useResponsive';
import { ProductCardListSkeletonProps } from '@/types/layouts/Skeleton';
import { ProductCardSkeleton } from '../ProductCardSkeleton';
import { SkeletonItem, SkeletonWrapper } from './styles';

export const ProductCardListSkeleton: React.FC<ProductCardListSkeletonProps> = ({ columns }) => {
    const { isMobile, isTablet } = useResponsive();

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);
    
    const skeletonItems = Array.from({ length: 4 }, (_, index) => (
        <SkeletonItem key={index}>
            <ProductCardSkeleton />
        </SkeletonItem>
    ));

    return <SkeletonWrapper column={column}>{skeletonItems}</SkeletonWrapper>;
};
