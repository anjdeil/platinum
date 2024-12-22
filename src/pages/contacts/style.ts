import styled from "@emotion/styled";
import Link from "next/link";

export const ContactsPageWrapper = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export const ContactsSocials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 72px;

  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 64px;
  }
`;