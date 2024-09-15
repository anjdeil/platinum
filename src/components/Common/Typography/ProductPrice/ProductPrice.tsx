import { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledProductPrice = styled.p`
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 22px;
    font-weight: 600;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        line-height: 24px;
    }
`;

interface ProductPriceProps {
    children: ReactNode;
}

export const ProductPrice: FC<ProductPriceProps> = ({ children }) => {
    return <StyledProductPrice>{children}</StyledProductPrice>;
};
