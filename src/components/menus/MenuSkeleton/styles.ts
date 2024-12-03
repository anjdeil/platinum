import {
  SkeletonContainerProps,
  SkeletonElementProps,
} from "@/types/menus/skeletons";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const waveAnimation = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

export const SkeletonElement = styled.div<SkeletonElementProps>`
  background: ${({ color, theme }) => color || theme.background.skeleton};
  background-size: 200% 100%;
  animation: ${waveAnimation} 1.5s infinite ease-in-out;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
`;

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  gap: ${({ gap }) => gap || "10px"};
`;
