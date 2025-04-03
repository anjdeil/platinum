import styled from '@emotion/styled';
import { FormControl, FormLabel } from '@mui/material';

export const StyledFormControl = styled(FormControl)`
  position: relative;
  margin-bottom: 16px;
`;

export const StyledFormLabel = styled(FormLabel)`
  margin: 0 !important;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  font-size: ${({ theme }) => theme.fonts.bodyMiddleReg};
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledError = styled.div`
  margin: 6px 0 0;

  position: absolute;
  top: 100%;
  left: 0;
  font: ${({ theme }) => theme.fonts.bodysmallReg};
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.error};
  white-space: nowrap;

  // Error state
  &.Mui-error .MuiOutlinedInput-notchedOutline {
    outline-color: ${({ theme }) => theme.colors.error};
  }
`;

export const StyledTextareaField = styled.textarea<{
  isError: boolean;
  minHeight?: string;
}>`
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || '120px'} !important;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background.secondary};
  resize: none;
  outline: 1px solid
    ${({ isError, theme }) => (isError ? theme.colors.error : 'transparent')};
  background-color: ${({ theme }) => theme.background.formElements};
  ${props => (props.isError ? `box-shadow: 0px 0px 4px 0px #be414180;` : '')};
  transition: outline-width 0.2s ease-in-out;

  & placeholder {
    text-align: left;
    align-items: center;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.grey};
  }

  &:hover {
    outline-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 1px solid
      ${({ isError, theme }) =>
        isError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
  }

  @media ${({ theme }) => theme.media.large} {
    max-width: none;
    min-height: 100px;
  }
`;
