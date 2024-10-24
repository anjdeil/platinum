import { StarProps } from "@/types/components/global/rating";
import styled from "@emotion/styled";

export const StyledStar = styled.svg<StarProps>`
  width: ${({ width = '20px' }) => width};
  height: ${({ height = '20px' }) => height};
  fill: ${({ filled, theme }) => (filled ? theme.colors.primary : "white")};
  stroke: #113760;
`;