import styled from '@emotion/styled';
import Image from 'next/image';

export const AboutContainer = styled.div`
  width: 100%;
  height: 648px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.secondary};
  column-gap: 117px;
  padding: 0 78px;

  @media ${({ theme }) => theme.media.largePlus} {
    height: 365px;
    column-gap: 76px;
    padding: 0 32px;
  }

  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
    height: 812px;
    column-gap: 0;
    row-gap: 76px;
    padding: 0 28px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  width: 641px;
  height: 637px;

  @media ${({ theme }) => theme.media.largePlus} {
    width: 284px;
    height: 329px;
    object-fit: cover;
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
    width: 344px;
  }

  @media ${({ theme }) => theme.media.medium} {
    width: 300px;
    align-items: center;
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

  @media ${({ theme }) => theme.media.largePlus} {
    font: ${({ theme }) => theme.fonts.bodypresmallReg};
  }
`;
