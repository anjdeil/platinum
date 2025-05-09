import styled from '@emotion/styled';
import Image from 'next/image';
import { PhoneInput } from 'react-international-phone';

interface CustomInputStyleProps {
  isError: boolean;
  isTextArea: boolean;
  isCheckbox: boolean;
  isPhone: boolean;
  padding?: string;
  font?: string;
  inputStyles?: boolean;
}
interface CustomInputContainerProps {
  isCheckbox: boolean;
  width?: string;
}

interface CustomInputProps {
  height?: string;
  background?: string;
  isCheckbox?: boolean;
  isError?: boolean;
  xlarea?: boolean;
}

export const CustomInputStyle = styled.div<CustomInputStyleProps>`
  position: relative;
  height: ${({ inputStyles }) => (inputStyles ? 'auto' : '100%')};
  padding: ${({ padding = '5px' }) => padding};
  display: flex;
  flex-direction: ${({ isCheckbox }) => (isCheckbox ? 'row' : 'column')};
  align-items: ${({ isCheckbox }) => (isCheckbox ? 'center' : 'flex-start')};
  width: ${({ isCheckbox }) => (isCheckbox ? 'fit-content' : '100%')};
  overflow: ${({ isPhone }) => (isPhone ? 'inherit' : 'hidden')};
  font: ${({ theme, font = theme.fonts.bodyMiddleReg }) => font};
  div {
    order: ${({ isCheckbox }) => (isCheckbox ? '-1' : '0')};
  }
  span {
    margin-bottom: ${({ isCheckbox }) => (isCheckbox ? '0' : '5px')};
  }
  div.react-international-phone-country-selector {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  div.react-international-phone-input-container {
    width: 100%;
  }

  button.react-international-phone-country-selector-button {
    border: none;
    background-color: transparent;
  }

  input,
  input.react-international-phone-input {
    padding-left: ${({ isPhone }) => (isPhone ? '60px' : '15px')};
  }
`;
export const Input = styled.input<CustomInputProps>`
  ${props => props.as === 'textarea' && 'min-height: 120px;'};

  min-height: ${({ xlarea }) => xlarea && '150px'};
  margin-right: ${({ isCheckbox }) => (isCheckbox ? '15px' : '0')};
  padding: ${({ isCheckbox }) => (isCheckbox ? '0' : '15px')};
  width: ${({ isCheckbox }) => (isCheckbox ? '24px' : '100%')};
  height: ${({ isCheckbox, height = '100%' }) =>
    isCheckbox ? '24px' : height};

  border: ${({ isCheckbox }) => (isCheckbox ? '1px solid #ccc' : 'none')};
  border-radius: ${({ isCheckbox }) => (isCheckbox ? '5px' : '8px')};
  font-size: 16px;
  outline: 1px solid
    ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.background.formElements};
  background-color: ${({ theme, isCheckbox, background }) =>
    isCheckbox ? '#f0f0f0' : background || theme.background.formElements};
  transition: outline-width 0.1s ease-in-out, background-color 0.1s ease-in-out;

  &:focus {
    outline: 1px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }

  &::placeholder {
    ${props => props.as === 'textarea' && 'text-align: start;'};
  }

  &[type='checkbox'] {
    appearance: none;
    display: inline-block;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.lightBorder};
    border-radius: 4px;
    position: relative;
    cursor: pointer;

    &:checked {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};

      &::after {
        content: '';

        position: absolute;
        top: 45%;
        left: 50%;
        width: 10px;
        height: 5px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) scaleX(-1) rotate(45deg);
      }
    }
  }
`;

type LabelWrapperProps = {
  inputStyles?: boolean;
};
export const LabelWrapper = styled.div<LabelWrapperProps>`
  display: flex;
  align-items: flex-end;
  flex-grow: ${({ inputStyles }) => (inputStyles ? '0' : '1')};
  // flex-grow: 1;
`;
export const CustomInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: inherit;
`;

export const CustomRequired = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ShowPasswordImage = styled(Image)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 4%;
  cursor: pointer;
`;

export const CustomError = styled.p`
  position: absolute;
  left: 4px;
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  color: ${({ theme }) => theme.colors.error};
  @media ${({ theme }) => theme.media.medium} {
    margin-top: 10px;
  }
`;
export const CustomSuccess = styled(CustomError)`
  color: ${({ theme }) => theme.colors.success};
`;

export const CustomInputContainer = styled.div<CustomInputContainerProps>`
  position: relative;
  width: ${({ isCheckbox, width = '100%' }) => (isCheckbox ? '100%' : width)};
  height: 100%;
  @media ${({ theme }) => theme.media.medium} {
    margin-top: 10px;
  }
`;

type StyledPhoneInputProps = {
  isReg?: boolean;
};
export const StyledPhoneInput = styled(PhoneInput)<StyledPhoneInputProps>`
  && input {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.background.formElements};
    border: none;
    border-radius: 8px;
    margin-top: ${({ isReg }) => (isReg ? '4px;' : '0px')};
    padding: 10px 15px;
    font-size: 16px;

    width: 100%;
    height: 48px;
    padding-left: 60px;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
    }
  }

  .react-international-phone-country-selector {
    & button {
      .react-international-phone-country-selector-button__button-content {
        & img {
          width: 24px;
        }
      }
    }
  }

  .react-international-phone-country-selector-dropdown {
    left: -10px;
    width: 285px;
    border-radius: 10px;
  }
`;
