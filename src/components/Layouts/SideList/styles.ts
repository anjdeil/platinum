import { ListProps, SideListContainerProps, StyledListItemrops } from "@/types/layouts/SideList";
import styled from "@emotion/styled";

export const SideListContainer = styled.nav<SideListContainerProps>`
    width: ${({ width = '100%' }) => width};
`;

export const List = styled.ul<ListProps>`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: ${({ marginTop }) => marginTop};
    margin-bottom: ${({ marginBottom }) => marginBottom};
    display: flex;
    flex-direction: column;
    row-gap: ${({ rowGap = '16px' }) => rowGap};
`;

export const StyledListItem = styled.li<StyledListItemrops>`
    box-sizing: border-box;
    background-color: ${({ isActive, theme, hoverBackground = theme.colors.primary }) => isActive ? hoverBackground : 'transparent'};
    font: ${({ theme }) => theme.fonts.bodyMiddleReg}; 
    font-size: ${({ fontSize }) => fontSize};
    line-height: ${({ lineHeight }) => lineHeight};
    font-weight: ${({ fontWeight }) => fontWeight};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    border-radius: ${({ borderRadius = '8px' }) => borderRadius};
    transition: all 0.2s ease;
    border: none;
    width: ${({ width = '100%' }) => width};
    cursor: pointer;
    text-transform: uppercase;
    hyphens: auto;

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ tabletFontSize = '14px' }) => tabletFontSize};
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        line-height: ${({ mobLineHeight }) => mobLineHeight};
    }

    & a,
    & button {
        width: 100%;
        padding: 16px;
        text-decoration: none;
        color: ${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.black};
        
        @media ${({ theme }) => theme.media.large} {
            padding: 12px 16px;
        }
    }

    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        & a,
        & button {
            color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
        }
    }
    
`;