import styled from "@emotion/styled";
import { Slider } from '@mui/material';

export const StyledSlider = styled(Slider)`
  & .MuiSlider-thumb {
    height: 24px;
    width: 24px;
    box-shadow: 0px 4px 8px -2px #1018281a;
  }

  & .MuiSlider-thumb[data-index='0'] {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1.5px solid ${({ theme }) => theme.colors.white};
  }

  & .MuiSlider-thumb[data-index='1'] {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1.5px solid ${({ theme }) => theme.colors.primary};
  }

  & .MuiSlider-thumb:nth-of-type(1) {
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1.5px solid ${({ theme }) => theme.colors.white};
  }

  & .MuiSlider-thumb:nth-of-type(2) {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  }

  & .MuiSlider-rail {
    background-color: ${({ theme }) => theme.background.secondary};
  }

  & .MuiSlider-track {
    background-color: ${({ theme }) => theme.background.secondary};
    border: none;
  }
`;

export const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.background.formElements};
`;

export const Divider = styled.div`
    width: 40px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const PriceFilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    input {
        text-align: center;
    }
`;