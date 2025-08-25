import styled from '@emotion/styled';
import FallbackImage from '../../FallbackImage/FallbackImage';

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
  max-width: 849px;
  width: 60%;
  height: auto;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  @media ${({ theme }) => theme.media.medium} {
    max-width: 400px;
    width: 70%;
  }

  @media ${({ theme }) => theme.media.preSmall} {
    width: 80%;
  }
`;
export const StyledBanner = styled(FallbackImage)`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  cursor: pointer;

  @media ${({ theme }) => theme.media.medium} {
    width: 100%;
    height: auto;
    padding: 0;
  }
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  display: flex;
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
  top: 8px;
  right: 8px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  & button {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 10px;
    border-radius: 50%;
  }

  & button svg {
    width: 16px;
    height: 16px;
    padding: 0;
    color: ${({ theme }) => theme.colors.white};
  }

  @media ${({ theme }) => theme.media.preSmall} {
    padding: 8px;
  }
`;
