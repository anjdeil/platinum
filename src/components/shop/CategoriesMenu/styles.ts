import { ListProps, SideListContainerProps, StyledListItemrops } from "@/types/components/global/sideList";
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

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ tabletFontSize = '14px' }) => tabletFontSize};
        line-height: ${({ tabletLineHeight }) => tabletLineHeight};
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        line-height: ${({ mobLineHeight = '24px' }) => mobLineHeight};
    }

    & a,
    & button {
        width: 100%;
        padding: 16px;
        text-decoration: none;
        color: ${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.black};
        text-transform: uppercase;
        font-size: ${({ fontSize = '16px' }) => fontSize};
        line-height: ${({ lineHeight = '24px' }) => lineHeight};
        font-weight: ${({ fontWeight = 400 }) => fontWeight};    

        @media ${({ theme }) => theme.media.large} {
            padding: 12px 16px;
            font-size: ${({ tabletFontSize = '14px' }) => tabletFontSize};
            line-height: ${({ tabletLineHeight = '24px' }) => tabletLineHeight};
        }

        @media ${({ theme }) => theme.media.medium} {
            font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
            line-height: ${({ mobLineHeight = '24px' }) => mobLineHeight};
        }
    }

    & button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
    }

    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        & a,
        & button {
            color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};

            & path {
                fill: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
            }
        }
    }
    
`;


export const TitleWrapper = styled.div`    
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    padding-inline: 16px;
    
    &:hover {
        font-weight: 600;
    }
`;

export const BackButton = styled.button`
    display: flex;
    border: none;
    background-color: transparent;
    padding: 0;
`;

export const Title = styled.div`
    font-size: 12px;
    line-height: 16px;    
    text-transform: uppercase;   
`;
