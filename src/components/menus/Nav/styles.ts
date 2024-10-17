import { NavLinkProps, NavListProps } from "@/types/menus/Nav";
import styled from "@emotion/styled";
import Link from "next/link";

export const NavList = styled.ul<NavListProps>`
    display: flex;
    flex-direction: ${({ direction = "row" }) => direction};
    padding: 0;
    gap: ${({ gap = "40px" }) => gap};
    justify-content: ${({ justify = "center" }) => justify};
    list-style: none;
    align-items: ${({ align = "center" }) => align};

    @media (max-width: 1200px) {
        gap: ${({ mobGap = "20px" }) => mobGap};
    }
`;

export const NavLink = styled(Link) <NavLinkProps>`
    display: inline-block;
    font-size: ${({ fontSizeMob = '14px' }) => fontSizeMob};    
    font-weight: 400;
    line-height: 1.5em;
    text-decoration: none;
    text-align: ${({ textAlign = "center" }) => textAlign};
    transition: all 0.2s ease;
    color: ${({ theme, color = theme.colors.white }) => color};
    text-transform: ${({ textTransform = 'none' }) => (textTransform)};

    &:hover,
    &.active {
        font-weight: 600;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = '16px' }) => (fontSize)};
    }
`;