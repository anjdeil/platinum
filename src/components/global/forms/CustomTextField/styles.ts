import styled from '@emotion/styled';
import { FormControl, FormLabel, TextField } from '@mui/material';
import Image from 'next/image';

export const StyledFormControl = styled(FormControl)``;

export const StyledFormLabel = styled(FormLabel)`
  margin: 0 !important;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ theme }) => theme.fonts.bodyMiddleReg};
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledInputStyle = styled('div', {
  shouldForwardProp: prop => prop !== 'isError' && prop !== 'isPhone',
})<{ isError?: boolean; isPhone?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: inherit;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  margin-top: ${({ isPhone }) => (isPhone ? '0 !important' : '4px !important')};
  div {
  }
  span {
    margin-bottom: 5px;
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
    border-radius: 8px;
    padding-left: 60px;
    outline: 1px solid
      ${({ isError, theme }) => (isError ? theme.colors.error : 'transparent')};
    box-shadow: ${({ isError }) =>
      isError ? '0px 0px 4px 0px #be414180;' : 'none'};

    &:hover {
      outline: 1px solid ${({ theme }) => theme.colors.primary};
    }

    &:focus {
      outline: ${({ isError, theme }) =>
        isError
          ? `1px solid ${theme.colors.error}`
          : `1px solid ${theme.colors.primary}`};
      box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
    }
  }
`;

export const StyledPhoneWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: inherit;
`;

export const StyledError = styled.div`
  font: ${({ theme }) => theme.fonts.bodysmallReg};
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.error};

  // Error state
  &.Mui-error .MuiOutlinedInput-notchedOutline {
    outline-color: ${({ theme }) => theme.colors.error};
  }
`;

export const StyledTextField = styled(TextField, {
  shouldForwardProp: prop => prop !== 'isError',
})<{ isError?: boolean }>`
  box-sizing: border-box;
  margin-top: 4px !important;
  transition: border 0.1s ease-in-out, outline-color 0.1s ease-in-out;
  margin-bottom: 24px;
  & .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.background.secondary};
    border-radius: 8px;
    margin: 0;
    transition: border 0.1s ease-in-out;
    & input {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    // Default state
    & fieldset {
      border: 1px solid transparent;
      ${props =>
        props.isError ? `box-shadow: 0px 0px 4px 0px #be414180;` : ''};
    }

    // Hover effect
    &:hover fieldset {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }

    // Focus effect
    &.Mui-focused fieldset {
      border: 1px solid
        ${({ isError, theme }) =>
          isError ? theme.colors.error : theme.colors.primary};
      box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
    }
  }

  // Inside input
  & .MuiInputBase-input {
    height: 1.5rem;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    padding: 12px 16px;
  }

  // Error message styling
  & .MuiFormHelperText-root {
    font: ${({ theme }) => theme.fonts.bodysmallReg};
    margin: 6px 0 0;
    min-height: 16px;
    position: absolute;
    top: 48px;
  }

  // Error state
  &.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => theme.colors.error};
  }
`;

export const ShowPasswordImage = styled(Image)`
  position: absolute;
  transform: translateY(-50%);
  top: calc(50% + 10px);
  top: 50%;
  right: 4%;
  cursor: pointer;
`;
