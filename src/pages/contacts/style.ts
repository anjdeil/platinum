import styled from "@emotion/styled";
import Link from "next/link";

export const ContactsPageWrapper = styled.div`
  padding-top: 24px;
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
