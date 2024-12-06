import styled from '@emotion/styled'
import Image from 'next/image'

interface CustomInputStyleProps {
  isError: boolean
  isTextArea: boolean
  isCheckbox: boolean
  isPhone: boolean
  padding?: string

  font?: string
}
interface CustomInputContainerProps {
  isCheckbox: boolean
  width?: string
}

interface CustomInputProps {
  height?: string
  background?: string
  isCheckbox: boolean
  isError: boolean
}

// Styles with classes name are for international phone input from react-international-phone
export const CustomInputStyle = styled.div<CustomInputStyleProps>`
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
`
export const Input = styled.input<CustomInputProps>`
  ${(props) => props.as === 'textarea' && 'min-height: 150px;'};
  margin-right: ${({ isCheckbox }) => (isCheckbox ? '15px' : '0')};
  padding: ${({ isCheckbox }) => (isCheckbox ? '0' : '15px')};
  width: ${({ isCheckbox }) => (isCheckbox ? '24px' : '100%')};
  height: ${({ isCheckbox, height = '100%' }) => (isCheckbox ? '24px' : height)};

  border: ${({ isCheckbox }) => (isCheckbox ? '1px solid #ccc' : 'none')};
  border-radius: 10px;
  font-size: 16px;

  outline: 1px solid
    ${({ theme, isError }) =>
      isError ? theme.colors.error : theme.background.formElements};
  background-color: ${({ theme, background = theme.background.formElements }) =>
    background};
  transition: outline-width 0.2s ease-in-out;

  &:-webkit-autofill {
    background-color: ${({ theme, background }) =>
      background || theme.colors.white} !important;
    color: ${({ theme }) => theme.colors.black} !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:focus {
    outline: 1px solid
      ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.primary)};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }

  &::placeholder {
    ${(props) => props.as === 'textarea' && 'text-align: start;'};
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    appearance: none;
    -moz-appearance: textfield;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: ${({ isCheckbox }) => (isCheckbox ? '15px' : '100%')};
    height: ${({ isCheckbox, height = '100%' }) => (isCheckbox ? '15px' : height)};
    font-size: 14px;
  }
`

export const CustomInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: inherit;
`

export const CustomRequired = styled.span`
  font-size: 16px;

  @media ${({ theme }) => theme.media.medium} {
    margin-left: 5px;
    font-size: 21px;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ShowPasswordImage = styled(Image)`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 4%;
  cursor: pointer;
`

export const CustomError = styled.p`
  margin-top: 5px;
  padding: 0 10px;

  color: ${({ theme }) => theme.colors.error};
  @media ${({ theme }) => theme.media.medium} {
    margin-top: 10px;
  }
`
export const CustomInputContainer = styled.div<CustomInputContainerProps>`
  width: ${({ isCheckbox, width = '100%' }) => (isCheckbox ? '18px' : width)};
`
