import { ButtonProps, ListProps, SideListContainerProps } from "@/types/layouts/SideList";
import styled from "@emotion/styled";

export const SideListContainer = styled.nav<SideListContainerProps>`
    width: ${({ width = '100%' }) => width};
`;

export const List = styled.ul<ListProps>`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: ${({ marginTop = '15px' }) => marginTop};
    margin-bottom: ${({ marginBottom = '106px' }) => marginBottom};
    display: flex;
    flex-direction: column;
    row-gap: ${({ rowGap = '16px' }) => rowGap};
`;

export const Button = styled.button<ButtonProps>`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    font-size: ${({ fontSize = '12px' }) => fontSize};
    line-height: ${({ lineHeight = '16px' }) => lineHeight};
    font-weight: ${({ fontWeight = 400 }) => fontWeight};
    padding: 12px 16px;
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

    &:hover {
        background-color: ${({ theme, hoverBackground = theme.colors.primary }) => hoverBackground};
        color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }
`;
