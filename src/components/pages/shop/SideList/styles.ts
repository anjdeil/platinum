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

export const CategoryChildList = styled(List)<SideListContainerProps>`
    position: absolute;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 140%;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 10;
    display: none;
    top: 0px;
    left: 100%;

    & button {
        &:hover {
            color: ${({ theme }) => theme.colors.white};
        }
    }
`;

export const StyledListItem = styled.li<StyledListItemrops>`
    position: relative;
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
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
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
        & path {
                fill: ${({ theme, hoverColor = theme.colors.white, isActive }) => isActive && hoverColor  };
            }
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

        & .child-list {
            display: block;
        }
        & .child-list a,
        & .child-list button {
            color: ${({ theme }) => theme.colors.black};
        }
    }
`;
