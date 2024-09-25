import { StyledProductCardListProps } from "@/types/shop/ProductsList";
import styled from "@emotion/styled";

export const StyledProductCardList = styled.div<StyledProductCardListProps>`
    display: grid;
    justify-content: space-between;
    gap: ${({ gap = "16px" }) => gap};
    grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};

    @media ${({ theme }) => theme.media.medium} {        
        gap: ${({ mobGap = "8px" }) => mobGap};
    }
`;