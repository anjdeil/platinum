import { PopupContainerProps } from "@/types/components/global/popups/mobilePopup";
import styled from "@emotion/styled";

export const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
  
    position: ${({ disableOverlay }) => (disableOverlay ? 'static' : 'fixed')}; 
    background-color: ${({ theme, backgroundColor = theme.background.secondary }) => backgroundColor};
    width: ${({ width = '70%' }) => width};
    height: ${({ height = '506px' }) => height};
    padding-top: ${({ paddingTop = '0' }) => paddingTop};
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 140 - scroll) : 140)}px;
    left: 0;
    bottom: 0;
    display: grid;
    z-index: 100;

    @media ${({ theme }) => theme.media.medium} {
        top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 60 - scroll) : 60)}px;
        bottom: 80px;
        grid-template-rows: ${({ title }) => title === '' ? '1fr' : '40px 1fr'};
        overflow: auto;
    }
`;

export const Header = styled.div`
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    @media ${({ theme }) => theme.media.medium} {
        display: flex;
    }
`;

export const Title = styled.div`
    font: ${({ theme }) => theme.fonts.bodyMiddleSemiBold}; 
`;

export const Content = styled.div`
    padding: 0 20px;
    height: auto;
    overflow: auto;
    position: relative;
`;
