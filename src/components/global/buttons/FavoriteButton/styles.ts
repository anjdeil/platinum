import { FavoriteButtonProps } from '@/types/components/global/buttons/favoriteButton'
import styled from '@emotion/styled'

export const Heart = styled.svg<FavoriteButtonProps>`
  width: 24px;
  aspect-ratio: 1;
  margin-left: auto;
  fill: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.white)};
  fill: ${({ isLoading, theme }) => isLoading && theme.colors.border};
  stroke: ${({ active, theme }) => (active ? theme.colors.best : theme.colors.primary)};
  stroke: ${({ isLoading, theme }) => isLoading && theme.colors.lightBorder};
  cursor: ${({ isLoading = false }) => (isLoading ? 'auto' : 'pointer')};
`
