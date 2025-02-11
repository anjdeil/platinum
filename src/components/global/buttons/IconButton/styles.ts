import styled from '@emotion/styled';

interface StyledIconButtonProps {
  marginLeft?: string;
  isLoading?: boolean;
}

export const StyledIconButton = styled.button<StyledIconButtonProps>`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: ${({ isLoading = false }) => (isLoading ? 'auto' : 'pointer')};
  position: relative;
  margin-left: ${({ marginLeft = '0' }) => marginLeft};
`
