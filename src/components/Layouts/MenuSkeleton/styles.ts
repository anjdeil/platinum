import { SkeletonContainerProps, SkeletonElementProps } from "@/types/layouts/menus/Skeleton";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const waveAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonElement = styled.div<SkeletonElementProps>`
  background: ${({ theme }) => theme.background.skeleton};
  background-size: 200px 100%;
  animation: ${waveAnimation} 1.5s infinite ease-in-out;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
`;

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap = "10px" }) => gap};

  @media ${({ theme }) => theme.media.large} {
      gap: 24px;
  }
`;