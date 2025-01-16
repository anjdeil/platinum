import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

type StyledProps = {
  contrastBg: boolean;
};

export const StyledCardContainer = styled('div', {
  shouldForwardProp: (propName) => propName !== 'contrastBg',
}) <StyledProps>`
  position: relative;
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  border-radius: 20px;
  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.colors.black};
  transition: color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.background.primaryGradient};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
    border-radius: inherit;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover::before {
    opacity: 1;
  }

  @media ${({ theme }) => theme.media.large} {
    border-radius: 8px;
    padding: 16px;
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
    padding: 16px;
    gap: 16px;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const StyledImage = styled(Image)`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 40px;

  @media ${({ theme }) => theme.media.large} {
    width: 24px;
    height: 24px;
    margin-bottom: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
  }
`;

export const StyledTitle = styled('h2', {
  shouldForwardProp: (propName) => propName !== 'contrastBg',
}) <StyledProps>`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  text-align: center;
  color: inherit;
  z-index: 1;

  @media ${({ theme }) => theme.media.largePlus} {
    font-size: 18px;
    line-height: 22px;
  }

  @media ${({ theme }) => theme.media.large} {
    font-size: 16px;
    line-height: 18px;
  }
`;

export const StyledDescription = styled('p', {
  shouldForwardProp: (propName) => propName !== 'contrastBg',
}) <StyledProps>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: inherit;
  z-index: 1;

  @media ${({ theme }) => theme.media.largePlus} {
    font-size: 14px;
    line-height: 22px;
  }

  @media ${({ theme }) => theme.media.medium} {
    overflow: unset;
    text-overflow: unset;
    display: -webkit-box;
    -webkit-line-clamp: unset;
  }
`;

export const StyledLink = styled(Link, {
  shouldForwardProp: (propName) => propName !== 'contrastBg',
}) <StyledProps>`
  justify-self: flex-end;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  text-align: center;
  text-decoration: underline;
  color: inherit;
  z-index: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }  

  @media ${({ theme }) => theme.media.large} {
    font-size: 12px;
  }
`;
