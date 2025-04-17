import styled from '@emotion/styled';
import Image from 'next/image';

export const AboutContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.secondary};
  column-gap: 76px;
  padding: 24px 78px 0;

  @media ${({ theme }) => theme.media.middle} {
    padding: 24px 32px 0;
  }

  @media ${({ theme }) => theme.media.middle} {
    column-gap: 32px;
    padding: 24px 32px 0;
  }

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
    column-gap: 0;
    row-gap: 32px;
    padding: 24px 28px 0;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled(Image)`
  max-width: 641px;
  height: auto;
  @media ${({ theme }) => theme.media.largePlus} {
    max-width: 400px;
  }

  @media ${({ theme }) => theme.media.middle} {
    max-width: 380px;
  }

  @media ${({ theme }) => theme.media.mediumLarge} {
    max-width: 320px;
  }

  @media ${({ theme }) => theme.media.preSmall} {
    max-width: 284px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: center;
  width: 524px;

  @media ${({ theme }) => theme.media.largePlus} {
    width: 400px;
  }

  @media ${({ theme }) => theme.media.mediumLarge} {
    width: 344px;
  }

  @media ${({ theme }) => theme.media.medium} {
    align-items: center;
  }

  @media ${({ theme }) => theme.media.preSmall} {
    max-width: 284px;
  }
`;

export const StyledLogoImage = styled(Image)`
  width: 416px;
  height: 80px;
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.largePlus} {
    width: 344px;
    height: 71px;
    margin-bottom: 16px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
    height: 67px;
  }
`;

export const StyledTitle = styled.p`
  font: ${({ theme }) => theme.fonts.titleH2SemiBold};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 24px;
  text-transform: uppercase;

  @media ${({ theme }) => theme.media.largePlus} {
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold};
    margin-bottom: 16px;
  }
`;

export const StyledSubtitle = styled.p`
  font: ${({ theme }) => theme.fonts.bodysmallReg};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  margin-bottom: 16px;

  @media ${({ theme }) => theme.media.largePlus} {
    margin-bottom: 8px;
  }
`;

export const StyledTextContent = styled.p`
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 24px;

  @media ${({ theme }) => theme.media.largePlus} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;
