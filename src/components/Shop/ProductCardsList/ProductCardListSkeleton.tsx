import { useResponsive } from '@/hooks/useResponsive';
import styled from "@emotion/styled";
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';

const SkeletonWrapper = styled.div<{ column: number }>`
    display: grid;
    gap: 8px;
    grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
    justify-content: space-between;

    @media ${({ theme }) => theme.media.medium} {
        gap: 16px;
    }
`;

const SkeletonItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
`;

interface ProductCardListSkeletonProps {
    columns?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
}

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

    console.log('skeleton');

    return <SkeletonWrapper column={column}>{skeletonItems}</SkeletonWrapper>;
};
