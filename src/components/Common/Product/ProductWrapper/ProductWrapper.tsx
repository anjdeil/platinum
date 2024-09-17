import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

const StyledProductWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

interface ProductWrapperProps {
    children: ReactNode;
}

export const ProductWrapper: FC<ProductWrapperProps> = ({ children }) => {
    return <StyledProductWrapper>{children}</StyledProductWrapper>;
};
