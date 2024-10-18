import { StarProps, StarsWrapperProps } from "@/types/components/global/rating";
import styled from "@emotion/styled";

export const Star = styled.svg<StarProps>`
  width: ${({ width = '20px' }) => width};
  height: ${({ height = '20px' }) => height};
  fill: ${({ filled, theme }) => (filled ? theme.colors.primary : "white")};
  stroke: #113760;
`;

export const StarsWrapper = styled.div<StarsWrapperProps>`
  display: flex;
  gap: ${({ gap = '1px' }) => gap};
`;