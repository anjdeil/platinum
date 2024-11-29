import { StarsWrapperProps } from "@/types/components/global/rating";
import styled from "@emotion/styled";

export const StarsWrapper = styled.div<StarsWrapperProps>`
  display: flex;
  gap: ${({ gap = '1px' }) => gap};
`;

export const StarButton = styled.button`
  border: none;
  background-color: transparent;
`;