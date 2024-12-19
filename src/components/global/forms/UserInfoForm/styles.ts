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
