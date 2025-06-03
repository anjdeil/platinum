import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Checkbox, CheckboxProps } from '@mui/material';

export const StyledFomContainer = styled.div`
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  margin-bottom: 24px;
`;

type StyledFormTitleProps = {
  alignFlexEnd?: boolean;
};
export const StyledFormWrapper = styled.div<StyledFormTitleProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(49%, 1fr));
  column-gap: 2%;

  align-items: ${({ alignFlexEnd }) =>
    alignFlexEnd ? 'flex-end' : 'baseline'};
  row-gap: 16px;

  @media ${({ theme }) => theme.media.preSmall} {
    display: flex;
    flex-direction: column;
    align-items: normal;
    row-gap: 10px;
  }
`;

export const StyledNote = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: 8px;
  padding: 8px 8px 16px;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.preSmall} {
  }
  @media ${({ theme }) => theme.media.medium} {
  }

  & > p {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
    color: #000;
    margin-bottom: 8px;
  }
`;

export const VariationFields = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 16px;
`;

interface StyledCheckBoxWrapperProps {
  noTop: boolean;
}

export const StyledCheckBoxWrapper = styled.div<StyledCheckBoxWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: ${({ noTop }) => (noTop ? '0' : '20px')};
`;

export const StyledCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledPhoneWrapper = styled.div`
  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 24px;
  }
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
  margin-bottom: 24px;

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

interface StyledCheckboxProps extends CheckboxProps {
  error?: boolean;
}

export const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => prop !== 'error',
})<StyledCheckboxProps>(({ theme, error }) => ({
  padding: '0 9px 0 0',
  color: theme.colors.primary,

  '&.Mui-checked': {
    color: theme.colors.primary,
  },

  '& .MuiSvgIcon-root': {
    fontSize: 30,
  },
}));

type StyledCheckboxLabelProps = {
  noBottom?: boolean;
};

export const StyledSingleCheckBoxWrapper = styled.div<StyledCheckboxLabelProps>`
  margin-bottom: ${({ noBottom }) => (noBottom ? '0' : '20px')};
`;

export const CustomError = styled.p`
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  color: ${({ theme }) => theme.colors.error};
`;
