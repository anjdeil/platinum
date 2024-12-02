import { CategoryItemContainerProps } from "@/types/pages/shop";
import { StyledButtonProps } from '@/types/styles/components';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export const CategoryItemContainer = styled.div<CategoryItemContainerProps>`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  grid-column: ${({ double }) => (double ? 'span 2' : 'span 1')};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 20px;
  height: 392px;
  padding: 16px;
  z-index: 1;

  @media ${({ theme }) => theme.media.large} {
    height: 208px;
  }

  @media ${({ theme }) => theme.media.medium} {
    height: 236px;
  }
`;

export const BackGroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.large} {
    row-gap: 8px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50%;
`;

export const StyledLink = styled(Link)`
  self-align: flex-start;
  text-decoration: none;
  height: 50%;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ widthDesktop = 'auto' }) => widthDesktop};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  background-color: transparent;
  color: ${({ theme, color = theme.colors.black }) => color};
  text-transform: none;
  border: ${({ theme }) => `1px solid ${theme.colors.secondary}`};
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 16px;

  &:hover {
    color: ${({ theme, hoverColor = theme.colors.white }) => hoverColor};
    background-color: ${({
      theme,
      hoverBackgroundColor = theme.background.hover,
    }) => hoverBackgroundColor};
  }

  @media ${({ theme }) => theme.media.largePlus} {
    width: ${({ widthMobile = 'auto' }) => widthMobile};
    font-size: 14px;
    padding: 16px 8px;
  }

  @media ${({ theme }) => theme.media.mediumLarge} {
    width: ${({ widthTablet = 'auto' }) => widthTablet};
    padding: 16px 4px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: ${({ widthTablet = 'auto' }) => widthTablet};
  }
`;