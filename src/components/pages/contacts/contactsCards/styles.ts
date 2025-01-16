import styled from '@emotion/styled';
import Link from 'next/link';

export const ContactsCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media ${({ theme }) => theme.media.medium} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
  }
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
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;

  & svg {
    margin-bottom: 26px;
  }

  @media ${({ theme }) => theme.media.medium} {
    max-width: 500px;
    margin: 0 auto;
  }
`;

export const ContactCardText = styled.div`
  width: 100%;
  white-space: normal;

  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  text-align: center;

  & div {
    margin-top: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    word-break: break-all;
  }
`;

export const ContactLink = styled(Link)`
  display: flex;
  align-items: end;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.black};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
