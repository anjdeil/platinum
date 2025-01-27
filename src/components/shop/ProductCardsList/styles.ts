import { StyledProductCardListProps } from '@/types/components/shop';
import styled from '@emotion/styled';

export const StyledProductCardList = styled.div<StyledProductCardListProps>`
  width: 100%;
  display: grid;
  justify-content: space-between;
  gap: ${({ gap = '16px' }) => gap};
  grid-template-columns: ${({ desktopColumns = 4 }) =>
    `repeat(${desktopColumns}, 1fr)`};

  @media ${({ theme }) => theme.media.large} {
    grid-template-columns: ${({ tabletColumns = 4 }) =>
      `repeat(${tabletColumns}, 1fr)`};
  }
  @media ${({ theme }) => theme.media.mediumLarge} {
    grid-template-columns: ${({ mintabletColumns = 4 }) =>
      `repeat(${mintabletColumns}, 1fr)`};
  }

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: ${({ mobileColumns = 2 }) =>
      `repeat(${mobileColumns}, 1fr)`};
    gap: ${({ mobGap = '8px' }) => mobGap};
  }
`;
