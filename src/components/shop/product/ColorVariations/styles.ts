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
       justify-content: space-between;
       flex-wrap: wrap;
    }
`;

export const VariationsColorButton = styled.button<VariationsButtonProps>`
    border-radius: 8px;
    background-color: ${({ theme, color = theme.colors.white }) => color};
    border: 1px solid;    
    width: 60px;
    height: 46px;
    border-color: ${({ theme }) => theme.colors.grey};
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 18px;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.colors.white};
        display: ${({ active }) => active ? 'block' : 'none'};
    }

    &:hover {
        
    }
`;