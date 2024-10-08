import { NavLinkProps, NavListProps } from "@/types/layouts/Nav";
import styled from "@emotion/styled";
import Link from "next/link";

export const StyledNav = styled.nav`
    width: 100%;
`;

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

export const StyledItem = styled.li`
    text-align: center;
`

export const NavLink = styled(Link) <NavLinkProps>`
    display: inline-block;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg}; 
    font-size: ${({ fontSize }) => fontSize};
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
        font-size: ${({ fontSizeMob = '14px' }) => fontSizeMob};
    }
`;