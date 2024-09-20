import { FavoriteButtonProps } from "@/types/layouts/Button";
import styled from "@emotion/styled";

export const Heart = styled.svg<FavoriteButtonProps>`
  width: 24px;
  height: 24px;
  margin-left: auto;
  fill: ${({ active, theme }) => (active ? theme.colors.best : theme.colors.primary)};
  stroke: ${({ active, theme }) => (active ? theme.colors.best : theme.colors.primary)};
  cursor: pointer;
`;