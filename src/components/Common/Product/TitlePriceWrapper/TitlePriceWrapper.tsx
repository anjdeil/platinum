import { FC, ReactNode } from "react";
import styled from "styled-components";

const StyledTitlePriceWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    justify-content: space-between;
    align-items: center;
`;

interface TitlePriceWrapperProps {
    children: ReactNode;
}

export const TitlePriceWrapper: FC<TitlePriceWrapperProps> = ({ children }) => {
    return <StyledTitlePriceWrapper>{children}</StyledTitlePriceWrapper>;
};
