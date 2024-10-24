import { AddToBasketButtonProps } from "@/types/components/global/buttons/addToBasketButton";
import styled from "@emotion/styled";

export const AddToBasketButtonStyled = styled.button<AddToBasketButtonProps>`
    width: 100%;
    max-width: ${({ maxWidth = "auto" }) => maxWidth};
    background-color: ${({ theme }) => theme.colors.primary};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    font-size: ${({ fontSize }) => fontSize};
    line-height: ${({ lineHeight }) => lineHeight};
    font-weight: ${({ fontWeight }) => fontWeight};    
    color: ${({ theme, color = theme.colors.white }) => color};
    padding: 16px 25px;    
    text-align: center;
    transition: all 0.2s ease;
    border-radius: ${({ borderRadius = '10px' }) => borderRadius};
    cursor: pointer;
    border: ${({ theme, borderColor = theme.colors.border }) => `1px solid  ${borderColor}`};
    
    &:hover {
        background-color: ${({ theme, hoverBackground = theme.background.hover }) => hoverBackground};
        color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }

    @media ${({ theme }) => theme.media.large} {        
        padding: 12px;
    }

    @media ${({ theme }) => theme.media.medium} {
        padding: 10px 16px;
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};   
        line-height: ${({ mobLineHeight = '1.5em' }) => mobLineHeight};     
    }
`