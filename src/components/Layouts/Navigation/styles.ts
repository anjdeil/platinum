import { NavLinkProps, NavListProps } from "@/types/styles/components";
import Link from "next/link";
import { styled } from "styled-components";

export const NavList = styled.ul<NavListProps>`
    display: flex;
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
    font-size: ${({ fontSize = '16px' }) => (fontSize)};    
    font-weight: 400;
    line-height: 1.5em;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s ease;
      color: ${({ theme, color = theme.colors.white }) => color};
    text-transform: ${({ textTransform = 'none' }) => (textTransform)};

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSizeMob = '14px' }) => fontSizeMob};
    }
`;