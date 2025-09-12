import { PopupContainerProps } from '@/types/components/global/popups/mobilePopup';
import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
  display: none;

  @media ${({ theme }) => theme.media.large} {
    position: fixed;
    background-color: ${({
  theme,
  backgroundColor = theme.background.secondary,
}) => backgroundColor};
    width: ${({ width = '70%' }) => width};
    padding-top: ${({ paddingTop = '0' }) => paddingTop};
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 170 - scroll) : 170)}px;
    left: 0;
    bottom: 0;
    display: grid;
    z-index: 100;
  }

  @media ${({ theme }) => theme.media.large} {
    grid-template-rows: ${({ title, closeButton = false }) =>
    closeButton ? 'auto 1fr' : title === '' ? '1fr' : '1fr 8fr'};
    overflow: auto;
  }

  @media ${({ theme }) => theme.media.medium} {
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 77 - scroll) : 77)}px;
    bottom: 72px;
  }
`;

export const Header = styled.div<PopupContainerProps>`
  display: none;
  padding: ${({ padding }) => (padding === 'all' ? '0 35px' : ' 0 17px')};

  @media ${({ theme }) => theme.media.middle} {
    display: flex;
    padding-top: ${({ closeButton = false }) => (closeButton ? '16px' : ' 0')};
    justify-content: ${({ closeButton = false }) =>
    closeButton ? 'flex-end' : ' flex-start'};
  }
`;

export const Content = styled.div<PopupContainerProps>`
  padding: ${({ padding }) => (padding === 'all' ? '0 20px' : '0 20px 0 0')};
  height: auto;
  overflow: auto;
  position: relative;
`;
