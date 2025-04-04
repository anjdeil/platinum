import styled from '@emotion/styled';
import Image from 'next/image';

interface PopupBodyProps {
  maxWidth?: string;
  padding?: string;
  tabletPadding?: string;
  mobilePadding?: string;
}

export const StyledContainer = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  inset: 0;
`;

export const StyledPopupBody = styled.div<PopupBodyProps>`
  box-sizing: border-box;
  max-width: 700px;
  padding: 32px;
  width: 55%;
  height: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.mediumLarge} {
    width: 70%;
  }

  @media ${({ theme }) => theme.media.preSmall} {
    width: 90%;
    padding: 20px;
  }
`;
export const StyledBanner = styled(Image)`
  width: 100%;
  max-width: 700px;
  height: auto;
  aspect-ratio: 700 / 288;
  border-radius: 8px;
  cursor: pointer;

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
    height: auto;
    max-width: 90vw;
    padding: 0;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  max-width: 90%;
  justify-self: center;
`;

export const StyledCloseWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 12px;
  right: 12px;

  & button svg {
    width: 16px;
    height: 16px;
    padding: 0;

    @media ${({ theme }) => theme.media.medium} {
      width: 12px;
      height: 12px;
    }
  }

  @media ${({ theme }) => theme.media.medium} {
    top: 6px;
    right: 6px;
  }
`;
