import { StyledButton } from "@/styles/components";
import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 22px 22px 38px 22px;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: 16px;
`;

export const FormTextarea = styled.textarea`
  min-height: 150px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  background: ${({ theme }) => theme.colors.white};
  margin-bottom: 16px;

  & placeholder {
    text-align: left;
    align-items: center;
    font: ${({ theme }) => theme.fonts.bodyMiddleReg};
    color: ${({ theme }) => theme.colors.grey};
  }

  outline: 1px solid ${({ theme }) => theme.background.formElements};
  transition: outline-width 0.2s ease-in-out;

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
  }
`;
export const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 17px;
  margin-bottom: 12px;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
  }
`;
export const ContactsStyledButton = styled(StyledButton)`
  margin-top: 16px;
`;
export const ErrorMessage = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.error};
`;
export const SuccessMessage = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.active};
`;
