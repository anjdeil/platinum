import { CommonTextProps } from '@/types/components/shop';
import styled from '@emotion/styled';
import Link from 'next/link';

export const ProductPrice = styled.p<CommonTextProps>`
  color: ${({ theme }) => theme.colors.black};
  font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ lineHeight }) => lineHeight};
  font-weight: ${({ fontWeight }) => fontWeight};
  text-align: center;

  @media ${({ theme }) => theme.media.large} {
    font-size: ${({ mobFontSize = '14px' }) => mobFontSize};
    line-height: ${({ mobLineHeight = '1.5em' }) => mobLineHeight};
  }
`;

export const ProductMaxPrice = styled.p<CommonTextProps>`
  color: ${({ theme }) => theme.colors.grey};
  font: ${({ theme }) => theme.fonts.bodysmallReg};
  text-align: center;
  text-decoration: line-through;
`;

export const StyledProductCard = styled.div`
  grid-column: span 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;

  @media ${({ theme }) => theme.media.middle} {
    padding: 16px 8px;
  }

  @media ${({ theme }) => theme.media.medium} {
    padding: 8px;
    row-gap: 8px;
  }
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  row-gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const PriceWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  transition: opacity 0.2s ease;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  font: ${({ theme }) => theme.fonts.bodyMiddleMedium};

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
    font-weight: 400;
  }

  &:hover {
    opacity: 0.7;
  }
`;
type ProductWrapperProps = {
  isFavorite?: boolean;
};

export const ProductWrapper = styled.div<ProductWrapperProps>`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  row-gap: 16px;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .heart-button {
    visibility: ${({ isFavorite }) => (isFavorite ? 'visible' : 'hidden')};
    opacity: ${({ isFavorite }) => (isFavorite ? 1 : 0)};
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  &:hover .heart-button {
    visibility: visible;
    opacity: 1;
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 205px;
  aspect-ratio: 1;

  @media ${({ theme }) => theme.media.large} {
    max-width: 100px;
  }

  @media ${({ theme }) => theme.media.medium} {
    max-width: 80px;
  }
`;
