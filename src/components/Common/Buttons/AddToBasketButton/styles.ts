import { AddToBasketButtonProps } from "@/types/layouts/Button";
import styled from "@emotion/styled";

export const AddToBasketButtonStyled = styled.button<AddToBasketButtonProps>`
    width: 100%;
    background-color: transparent;
    font-size: ${({ fontSize = '16px' }) => fontSize};
    line-height: ${({ mobLineHeight = '20px' }) => mobLineHeight};
    font-weight: ${({ fontWeight = 400 }) => fontWeight};    
    color: ${({ theme, color = theme.colors.black }) => color};
    padding: 16px 25px;    
    text-align: center;
    transition: all 0.2s ease;
    border-radius: ${({ borderRadius = '10px' }) => borderRadius};
    cursor: pointer;
    border: ${({ theme, borderColor = theme.colors.border }) => `1px solid  ${borderColor}`};
    
    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }

    @media ${({ theme }) => theme.media.large} {
        line-height: ${({ lineHeight = '24px' }) => lineHeight};
        padding: 12px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 10px 16px;
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};        
    }
`