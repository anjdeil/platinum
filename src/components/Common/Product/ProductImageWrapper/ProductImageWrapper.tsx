import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

const StyledProductImageWrapper = styled.div`
    position: relative;
    width: 80px;
    height: 80px;

    @media ${({ theme }) => theme.media.medium} {
        width: 100px;
        height: 100px;
    }

    @media ${({ theme }) => theme.media.large} {
        width: 205px;
        height: 205px;
    }
`;

interface ProductImageWrapperProps {
    children: ReactNode;
}

export const ProductImageWrapper: FC<ProductImageWrapperProps> = ({ children }) => {
    return <StyledProductImageWrapper>{children}</StyledProductImageWrapper>;
};
