import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const VariationFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px 0;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

type AnimatedWrapperProps = {
  isVisible?: boolean;
};

export const AnimatedWrapper = styled.div<AnimatedWrapperProps>`
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 300ms forwards;
`;

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 8px;
  padding: 16px 32px;

  @media ${({ theme }) => theme.media.middle} {
    padding: 16px 24px;
  }

  @media ${({ theme }) => theme.media.medium} {
    padding: 16px;
  }
`;
