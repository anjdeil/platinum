import styled from '@emotion/styled';

interface QuantityBlockProps {
  inputWidth?: string;
  inputHeight?: string;
}

export const QuantityBlock = styled.input<QuantityBlockProps>`
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ inputWidth = '94px' }) => inputWidth};
  height: ${({ inputHeight = '46px' }) => inputHeight};
  border-radius: 8px;
  margin: 0 8px;
  outline: none;
  border: none;
  text-align: center;
`;
export const QuantityWrapper = styled.div<{ isDisabled?: boolean }>`
  ${({ isDisabled }) =>
    isDisabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}

  display: flex;
  align-items: center;
  justify-content: center;
  @media ${({ theme }) => theme.media.medium} {
    margin: 16px 0;
  }
`;

export const QuantityBtn = styled.button`
  display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    scale: 1.2;
  }
`;
