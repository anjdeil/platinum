import {
  SkeletonContainerProps,
  SkeletonElementProps,
} from '@/types/menus/Skeletons';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const waveAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const SkeletonElement = styled.div<SkeletonElementProps>`
  // background: ${({ color, theme }) => color || theme.background.skeleton};
  background: ${({ color, light, dark, theme }) => {
    if (color) return color;
    if (light)
      return 'linear-gradient(90deg, #f0f0f052 25%, #f3f0f096 50%, #f0f0f07a 75%)';
    if (dark)
      return 'linear-gradient(90deg, #061d5e63 20%, #061d5e70 50%, #061d5e40 75%)';
    return theme.background.skeleton;
  }};
  background-size: 200% 100%;
  animation: ${waveAnimation} 1.5s infinite ease-in-out;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
`;

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  margin-top: ${({ marginTop }) => marginTop};
  align-items: ${({ leftSide }) => (leftSide ? 'flex-start' : 'center')};
  gap: ${({ gap }) => gap || '10px'};

  @media ${({ theme }) => theme.media.largePlus} {
    margin-top: 0;
  }
  @media ${({ theme }) => theme.media.medium} {
    align-items: ${({ verticalSlider }) =>
      verticalSlider ? 'center' : 'flex-start'};
  }
`;
