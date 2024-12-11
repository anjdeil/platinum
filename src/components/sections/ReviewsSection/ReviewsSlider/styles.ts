import { Text } from '@/styles/components';
import styled from '@emotion/styled';
import { Swiper } from 'swiper/react';
import 'swiper/css';

export const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 24px;
  margin-top: 24px;
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledText = styled(Text)`
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodysmallReg};
  }
`;

export const CustomSwiper = styled(Swiper)`
  width: 100%;

  & .swiper-wrapper {
    position: relative;
    width: 100%;
  }

  & .swiper-slide {
    height: auto !important;
  }

  & .swiper-pagination {
    margin-top: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    &-bullet {
      border-radius: 10px;
      width: 34px;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.lightBorder};
      &-active {
        background-color: ${({ theme }) => theme.colors.active};
      }
    }
  }
`;
