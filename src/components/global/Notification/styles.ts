import styled from '@emotion/styled';

export const NotificationWrapper = styled.div<{
  type?: 'success' | 'warning' | 'info';
  marginBottom?: string;
  marginTop?: string;
  isVisible?: boolean;
}>`
  padding: 16px;
  margin-bottom: ${({ marginBottom = '24px' }) => marginBottom};
  margin-top: ${({ marginTop = '0' }) => marginTop};
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
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;

  &.fade-out {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }
`;
