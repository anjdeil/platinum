import { Text } from "@/styles/components";
import { VariationsButtonProps } from "@/types/components/shop/product/productVariations";
import styled from "@emotion/styled";

export const ProductVariationsContainer = styled(Text)`    
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
    flex-wrap: wrap;

    @media ${({ theme }) => theme.media.medium} {
       justify-content: space-between;
    }
`;

export const VariationsButton = styled.button<VariationsButtonProps>`
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid;
    padding: 11px;
    min-width: 60px;
    width: auto;
    border-color: ${({ active, theme }) => active ? theme.colors.active : theme.colors.black};
    cursor: pointer;
    transition: all 0.2s ease;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};

    &:hover {
        border-color: ${({ theme }) => theme.colors.active};
    }

    @media ${({ theme }) => theme.media.large} {
       font-size: 14px;
    }

    @media ${({ theme }) => theme.media.medium} {
       min-width: 142px;
    }
`;