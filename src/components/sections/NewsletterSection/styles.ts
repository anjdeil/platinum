import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/assets/images/newsletter-bg.webp');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  padding: 137px 0;

  @media ${({ theme }) => theme.media.medium} {
    background-image: url('/assets/images/newsletter-mob-bg.webp');
  }
`;

export const StyledCard = styled.div`
  width: 849px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background-color: rgba(242, 248, 254, 0.8);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  gap: 24px;

  @media ${({ theme }) => theme.media.large} {
    width: 498px;
    border-radius: 8px;
    padding: 16px;
    gap: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 271px;
  }
`;

export const StyledNotificationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
  }
`;

export const StyledNotificationText = styled.p`
  font: ${({ theme }) => theme.fonts.bodypresmallReg};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodysmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
  }
`;

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const StyledSubtext = styled.p`
  width: 85%;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
    line-height: 1.375;
  }
`;

export const StyledLink = styled(Link)`
  width: 418px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.success};
  background-color: #17aa40;
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #20b857;
  }

  @media ${({ theme }) => theme.media.large} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 239px;
    margin-bottom: 8px;
  }
`;

export const StyledIcon = styled(Image)`
  margin-right: 16px;
`;
