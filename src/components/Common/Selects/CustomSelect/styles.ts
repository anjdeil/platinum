import { CustomSelectStyledProps } from "@/types/layouts/Select";
import styled from "@emotion/styled";

export const CustomSelectStyled = styled.div<CustomSelectStyledProps>`
    box-sizing: border-box;
    position: relative;
    border-radius: ${({ isOpen, borderRadius = '0' }) => (isOpen ? `${borderRadius} ${borderRadius} 0 0` : borderRadius)};
    background: ${({ background = 'transparent' }) => background};
    display: flex;
    align-items: center;
    padding: ${({ padding = "4px" }) => padding};
    font-size: ${({ fontSize = '16px' }) => fontSize};
    line-height: 1.5rem;
    font-weight: 400;
    cursor: pointer;

    @media ${({ theme }) => theme.media.large} {
        padding: ${({ tabletPadding = "4px" }) => tabletPadding};     
        line-height: 1.375rem;
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        padding: ${({ mobPadding = "4px" }) => mobPadding};        
    }
`;

export const DropdownMenu = styled.div<CustomSelectStyledProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: auto;
    max-height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
    overflow: hidden;
    z-index: 1000;
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    border-radius: ${({ isOpen, borderRadius = '0' }) => (isOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius)};
`;

export const MenuItem = styled.div<CustomSelectStyledProps>`
    display: flex;
    justify-content: center;
    justify-content: ${({ allignItem = "center" }) => allignItem};
    align-items: center;
    font-size: ${({ fontSize = '16px' }) => fontSize};
    padding: ${({ padding = "4px" }) => padding};
    padding-inline: ${({ paddingOptions = "4px" }) => paddingOptions};
    background: ${({ theme, background = theme.colors.white }) => background};
    cursor: pointer;

    @media ${({ theme }) => theme.media.large} {
        padding: ${({ tabletPadding = "4px" }) => tabletPadding};     
        line-height: 1.375rem;
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        padding: ${({ mobPadding = "4px" }) => mobPadding};        
    }

    &:hover {
        background: ${({ theme, background }) => background ? theme.colors.white : theme.background.secondary};
    }    
`;
