import { useResponsive } from "@/hooks/useResponsive";
import { ProductCardListProps } from "@/types/shop/ProductsList";
import { FC } from "react";
import styled from "styled-components";
import ProductCard from "../ProductCard/ProductCard";
import { ProductCardListSkeleton } from "./ProductCardListSkeleton";

interface ProductListProps {
   column: number;
}

const StyledProductCardList = styled.div<ProductListProps>`
    display: grid;
    justify-content: space-between;
    gap: 8px;
    grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};

    @media ${({ theme }) => theme.media.medium} {
        gap: 16px;
    }
`;

export const ProductCardList: FC<ProductCardListProps> = ({ isLoading = false, isError = false, products, columns }) => {
    const { isMobile, isTablet } = useResponsive();

    const column = (isMobile && (columns?.mobile !== undefined ? columns.mobile : 2)) ||
        (isTablet && (columns?.tablet !== undefined ? columns.tablet : 4)) ||
        (columns?.desktop !== undefined ? columns.desktop : 4);

    if (isLoading) {
        return <ProductCardListSkeleton columns={columns} />;
    }

    if (isError) {
        return <p>We cannot get the products</p>;
    }

    return (
        <StyledProductCardList column={column}>
            {products?.map((product, i) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </StyledProductCardList>
    );
}
