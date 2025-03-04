import { AddToBasketButtonProps } from '@/types/components/global/buttons/addToBasketButton';
import styled from '@emotion/styled';

export const AddToBasketButtonStyled = styled.button<AddToBasketButtonProps>`
  width: 100%;
  max-width: ${({ maxWidth = '' }) => maxWidth};

  background-color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.primary};

  color: ${({ theme, color = theme.colors.black, active }) =>
    active ? color : theme.colors.white};

  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: 16px 25px;
  text-align: center;
  border-radius: ${({ borderRadius = '10px' }) => borderRadius};
  cursor: pointer;
  border: ${({ theme, borderColor = theme.colors.border }) =>
    `1px solid  ${borderColor}`};
  transition: all 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background-color: ${({
      theme,
      hoverBackground = theme.background.hover,
    }) => hoverBackground};
      color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (hover: none) {
    &:active {
      background-color: ${({
      theme,
      hoverBackground = theme.background.hover,
    }) => hoverBackground};
      color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    }
  }

  @media ${({ theme }) => theme.media.large} {
    padding: 12px;
  }

  @media ${({ theme }) => theme.media.medium} {
    padding: 10px 16px;
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: ${({ mobLineHeight = '1.5em' }) => mobLineHeight};
  }
  @media ${({ theme }) => theme.media.smallest} {
    height: 56px;
    padding: 0 16px;
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: 1.2em;
  }
`;
