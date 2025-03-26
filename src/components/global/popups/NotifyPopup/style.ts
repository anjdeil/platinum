import styled from '@emotion/styled';

interface PopupBodyProps {
  maxWidth?: string;
  padding?: string;
  tabletPadding?: string;
  mobilePadding?: string;
}
export const StyledPopupOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  inset: 0;
`;

export const StyledPopupBody = styled.div<PopupBodyProps>`
  box-sizing: border-box;
  max-width: 600px;
  width: 100%;
  height: auto;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.media.medium} {
    width: 90%;
    padding: 24px;
  }
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
  top: 38px;
  right: 38px;

  & button svg {
    width: 16px;
    height: 16px;
    padding: 0;
  }
  @media ${({ theme }) => theme.media.medium} {
    top: 30px;
    right: 30px;
  }
`;
