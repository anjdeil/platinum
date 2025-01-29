import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface CustomFormProps {
  direction?: 'column' | 'grid';
  inMiddle?: boolean;
}

export const StyledFormWrapper = styled.div<CustomFormProps>`
  display: ${({ direction }) => (direction === 'column' ? 'flex' : 'grid')};
  flex-direction: ${({ direction }) =>
    direction === 'column' ? 'column' : 'unset'};
  grid-template-columns: ${({ direction }) =>
    direction === 'column' ? 'unset' : 'repeat(auto-fill, minmax(49%, 1fr))'};
  column-gap: 1%;
  align-items: baseline;
  gap: ${({ direction }) => (direction === 'column' ? '15px' : 'unset')};
  row-gap: ${({ direction }) => (direction === 'column' ? 'unset' : '15px')};
  padding-bottom: 20px;
  padding-bottom: ${({ inMiddle }) => (inMiddle ? '0' : '20px')};

  @media ${({ theme }) => theme.media.preSmall} {
    display: flex;
    flex-direction: column;
    align-items: normal;
    row-gap: 10px;
  }
`;

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

export const StyledSelectWrapper = styled.div`
  height: 90px;
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

export const ConfirmationFormWrapper = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    width: 49%;
  }

  & > button {
    width: 49%;
  }

  @media ${({ theme }) => theme.media.largePlus} {
    flex-direction: column;

    & > div {
      width: 100%;
    }

    & > button {
      width: 100%;
    }
  }
`;