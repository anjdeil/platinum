import { NavLinkProps, NavListProps } from '@/types/menus/Nav';
import styled from '@emotion/styled';
import Link from 'next/link';

export const NavList = styled.ul<NavListProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  padding: 0;
  column-gap: ${({ gap = '75px' }) => gap};
  row-gap: 24px;
  justify-content: ${({ justify = 'center' }) => justify};
  list-style: none;
  align-items: ${({ align = 'center' }) => align};

  @media ${({ theme }) => theme.media.xl} {
    column-gap: ${({ mobGap = '24px' }) => mobGap};
  }
`;
export const CustomNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)<NavLinkProps>`
  display: inline-block;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  line-height: 1.2rem;
  font-size: ${({ fontSize }) => fontSize};
  text-decoration: none;
  text-align: ${({ textalign = 'center' }) => textalign};
  transition: all 0.2s ease;
  color: ${({ theme, color = theme.colors.white }) => color};
  text-transform: ${({ texttransform = 'none' }) => texttransform};

  &.active {
    font-weight: 600;
  }

  &:hover {
    opacity: 0.7;
  }

  @media ${({ theme }) => theme.media.large} {
    font-size: ${({ fontSize = '0.875rem' }) => fontSize};
  }
`;
