import { PopupContainerProps } from "@/types/components/global/popups/mobilePopup";
import styled from "@emotion/styled";


export const PopupContainer = styled.div<PopupContainerProps>`
border:2px solid ${({ theme   }) => theme.background.secondary};
border-radius: 8px;
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

    @media ${({ theme }) => theme.media.middle} {
        top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 60 - scroll) : 60)}px;
        bottom: 80px;
        grid-template-rows: ${({ title }) => title === '' ? '1fr' : '90px 1fr'};
        overflow: auto;
    }
`;

export const Header = styled.div<PopupContainerProps>`
    display: none;
    padding: ${({ padding }) => (padding ==='all' ? '0 37px' : ' 0 17px')}; 


    @media ${({ theme }) => theme.media.middle} {
        display: block;
    }
`;


export const Content = styled.div<PopupContainerProps>`
    padding: ${({ padding }) => (padding ==='all' ? '0 20px' : '0 20px 0 0')}; 
    height: auto;
    overflow: auto;
    position: relative;
`;
