import { Container } from '@/styles/components';
import styled from '@emotion/styled';
import Link from 'next/link';

export const TopBarWrapper = styled(Container)`
  overflow: visible;
`;

export const Stack = styled.div`
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;

  @media ${({ theme }) => theme.media.large} {
    display: none;
  }
`;

export const SelectsWrapper = styled.div`
  gap: 52px;
  display: flex;

  @media ${({ theme }) => theme.media.xl} {
    gap: 20px;
  }

  @media ${({ theme }) => theme.media.large} {
    display: none;
  }
`;

export const ButtonWrapper = styled(Link)`
  max-width: fit-content;
  text-decoration: none;
`;

export const BurgerButtonWrapper = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.large} {
    display: flex;
    margin-left: auto;
  }
`;
