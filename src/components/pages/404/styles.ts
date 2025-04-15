import styled from '@emotion/styled';
import Image from 'next/image';

export const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 629px;
  padding: 2rem 0;
  gap: 2rem;

  margin: auto;

  @media ${({ theme }) => theme.media.extraLarge} {
    width: 585px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
  }
`;

export const ErrorPageSubtitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #6c757d;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  color: #000000;
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.extraLarge} {
    font-size: 1rem;
  }
`;

export const ErrorPageImage = styled(Image)`
  width: 484px;
  height: 206px;

  @media ${({ theme }) => theme.media.extraLarge} {
    width: 421px;
    height: 179px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 289px;
    height: 123px;
  }
`;

export const ErrorPageDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-align: center;
  color: #000000;

  @media ${({ theme }) => theme.media.extraLarge} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`;

export const ErrorPageButtonGoHome = styled.button<{ buttonwidth: string }>`
  width: ${({ buttonwidth }) => buttonwidth};
  height: 56px;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  background-color: #113760;
  border-radius: 10px;
  border: none;
  text-align: center;
  transition: all 0.2s ease;
  padding: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
    height: 52px;
    font-size: 0.875rem;
  }
`;
