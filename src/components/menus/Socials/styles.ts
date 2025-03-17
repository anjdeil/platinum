import {
  SocialItemLinkProps,
  SocialsContainerProps,
} from '@/types/menus/Socials';
import styled from '@emotion/styled';
import Link from 'next/link';

interface SocialTextProps {
  textcolor?: string;
}
export const SocialsContainer = styled.div<SocialsContainerProps>`
  display: flex;
  justify-content: center;
  margin: ${({ margin = '0 0 0 0' }) => margin};
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;

  ${({ secondary }) =>
    secondary &&
    `
    @media (max-width: 768px) {
    margin-top: 8px;
    row-gap: 24px;
      align-items: flex-start;
      flex-direction: column;
    }
  `}
`;

export const SocialItemLink = styled(Link)<SocialItemLinkProps>`
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-right: ${({ itemmargin = '16px' }) => itemmargin};
  }
  text-decoration: none;
`;
export const SocialText = styled.span<SocialTextProps>`
  text-transform: uppercase;
  margin-left: 8px;
  color: ${({ theme, textcolor = theme.colors.white }) => textcolor};
`;
