import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const NotificationWrapper = styled.div<{
  type?: 'success' | 'warning' | 'info';
  show?: boolean;
}>`
  padding: 16px;
  margin-bottom: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case 'info':
        return theme.background.secondary;
      case 'warning':
        return theme.background.warning;
      case 'success':
        return theme.background.success;
      default:
        return theme.background.secondary;
    }
  }};
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;

  ${({ show }) =>
    show &&
    css`
      animation: ${fadeOut} 3s ease-out forwards;
    `}

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;
