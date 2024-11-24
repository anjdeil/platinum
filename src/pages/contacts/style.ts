import styled from "@emotion/styled";
import Link from "next/link";

export const ContactsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;
export const ContactsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
`;
export const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 16px;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 20px;
  padding: 24px;

  & svg {
    margin-bottom: 26px;
  }
`;
export const ContactCardText = styled.div`
  text-align: center;
  & p {
    margin-top: 16px;
  }
`;
export const ContsctsSocials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContactLink = styled(Link)`
  display: flex;
  align-items: end;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.black};
`;

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
