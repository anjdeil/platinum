import styled from "@emotion/styled";

interface InfoCardProps {
  marginBottom?: string;
  marginTop?: string;
}

export const InfoCard = styled.div<InfoCardProps>`
  margin: 0 auto;
  margin-bottom: ${({ marginBottom = "24px" }) => marginBottom};

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};

  padding: 32px;
`;
export const ProofSelect = styled.div`
  height: 96px;
`;
export const OptionButtonsContainer = styled.div`
  margin-top: 8px;
`;
export const CustomFormCheckboxStyled = styled.input`
  margin-right: 15px;
  width: 24px;
  height: 24px;
  outline: 1px solid ${({ theme }) => theme.background.formElements};
  transition: outline-width 0.1s ease-in-out, background-color 0.1s ease-in-out;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }
  appearance: none;
  display: inline-block;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.lightBorder};
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    &::after {
      content: "";
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
`;
export const OptionButton = styled.button<{ isSelected: boolean }>`
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  text-align: left;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondary : theme.background.formElements};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }
`;
