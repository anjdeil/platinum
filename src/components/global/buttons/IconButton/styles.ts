import styled from '@emotion/styled';

interface StyledIconButtonProps {
  marginLeft?: string;
}

export const StyledIconButton = styled.button<StyledIconButtonProps>`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  position: relative;
  margin-left: ${({ marginLeft = '0' }) => marginLeft};
`;
