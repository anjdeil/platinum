

import { SkeletonContainerProps, SkeletonElementProps } from "@/types/layouts/Menus/Skeletons";
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
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${waveAnimation} 1.5s infinite ease-in-out;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
`;

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  gap: ${({ gap }) => gap || "10px"};
`;