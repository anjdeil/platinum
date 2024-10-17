import { CustomSelectStyledProps } from "@/types/layouts/Select";
import styled from "@emotion/styled";
import { Collapse } from "@mui/material";

export const CustomSelectStyled = styled.div<CustomSelectStyledProps>`
    box-sizing: border-box;
    position: relative;
    border-radius: ${({ isOpen, borderRadius = '0' }) => (isOpen ? `${borderRadius} ${borderRadius} 0 0` : borderRadius)};
    color: ${({ theme, color = theme.colors.black }) => color};
    background: ${({ background = 'transparent' }) => background};
    width: ${({ width = 'auto' }) => width};
    min-width: fit-content;
    display: flex;
    gap: 8px;
    align-items: center;
    padding: ${({ padding = "4px" }) => padding};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    font-size: ${({ fontSize }) => fontSize};
    cursor: pointer;

    @media ${({ theme }) => theme.media.large} {
        padding: ${({ tabletPadding = "4px" }) => tabletPadding};     
        line-height: 1.375em;
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        padding: ${({ mobPadding = "4px" }) => mobPadding};        
    }
`;

export const StyledCollapse = styled(Collapse) <CustomSelectStyledProps>`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    min-width: fit-content;
    z-index: 1000;
    border-radius: ${({ isOpen, borderRadius = '0' }) => (isOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius)};
`;

export const MenuItem = styled.div<CustomSelectStyledProps>`
    display: flex;
    justify-content: center;
    justify-content: ${({ allignItem = "center" }) => allignItem};
    align-items: center;
    text-align: center;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    font-size: ${({ fontSize }) => fontSize};
    padding: ${({ padding = "4px" }) => padding};
    color: ${({ theme, color = theme.colors.black }) => color};
    padding-inline: ${({ paddingOptions = "4px" }) => paddingOptions};
    background: ${({ theme, background = theme.colors.white }) => background};
    cursor: pointer;

    @media ${({ theme }) => theme.media.large} {
        padding: ${({ tabletPadding = "4px" }) => tabletPadding};     
        line-height: 1.375em;
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        padding: ${({ mobPadding = "4px" }) => mobPadding};        
    }

    &:hover {
        background: ${({ theme, background }) => background ? theme.colors.white : theme.background.secondary};
    }    
`;
