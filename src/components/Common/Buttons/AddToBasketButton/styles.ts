import { AddToBasketButtonProps } from "@/types/Layouts/Button";
import styled from "@emotion/styled";

export const AddToBasketButtonStyled = styled.button<AddToBasketButtonProps>`
    width: 100%;
    background-color: transparent;
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: ${({ mobLineHeight = '20px' }) => mobLineHeight};
    font-weight: ${({ fontWeight = 400 }) => fontWeight};    
    color: ${({ theme, color = theme.colors.black }) => color};
    padding: 10px 16px;
    text-align: center;
    transition: all 0.2s ease;
    border-radius: ${({ borderRadius = '10px' }) => borderRadius};
    cursor: pointer;

    border: ${({ theme, borderColor = theme.colors.border }) => `1px solid  ${borderColor}`};
    
    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }

    @media ${({ theme }) => theme.media.medium} {
        line-height: ${({ lineHeight = '24px' }) => lineHeight};
        padding: 12px 25px;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '16px' }) => fontSize};
        padding: 16px 25px;
    }
`