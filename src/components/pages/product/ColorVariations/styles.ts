import { Text } from "@/styles/components";
import { VariationsButtonProps } from "@/types/components/shop/product/productVariations";
import styled from "@emotion/styled";

export const ColorVariationsContainer = styled(Text)`    
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    @media ${({ theme }) => theme.media.large} {
       row-gap: 8px;
    }
`;

export const VariationListBlock = styled.div`
    display: flex;
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
       flex-wrap: wrap;
    }
`;

export const VariationsColorButton = styled.button<VariationsButtonProps>`
    border-radius: 8px;
    background-color: ${({ theme, color = theme.colors.white }) => color};
    border: 1px solid;    
    width: 60px;
    height: 46px;
    border-color: ${({ theme }) => theme.colors.lightBorder};
    cursor: pointer;
    position: relative;
    outline: ${({ active, theme }) => active ? `2px solid ${theme.colors.primary}` : 'none'};
`;