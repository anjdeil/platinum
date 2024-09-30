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
    background-color: transparent;
    font-size: ${({ fontSize = '16px' }) => fontSize};
    line-height: ${({ lineHeight = '24px' }) => lineHeight};
    font-weight: ${({ fontWeight = 400 }) => fontWeight};
    padding: 16px;
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
        line-height: ${({ tabletLineHeight = '24px' }) => tabletLineHeight};
        padding: 12px 16px;
    }

    @media ${({ theme }) => theme.media.medium} {
        font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
        line-height: ${({ mobLineHeight = '24px' }) => mobLineHeight};
    }

    & a,
    & button {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.black};
    }

    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        & a,
        & button {
            color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
        }
    }
    
`;