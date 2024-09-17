import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

const StyledProductTitle = styled.p`
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        font-weight: 500;
    }
`;

interface ProductTitleProps {
    children: ReactNode;
}

export const ProductTitle: FC<ProductTitleProps> = ({ children }) => {
    return <StyledProductTitle>{children}</StyledProductTitle>;
};
