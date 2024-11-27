import styled from "@emotion/styled";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

export const FormInput = styled.input`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const FormTextarea = styled.textarea`
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

export const FormButton = styled.button`
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
