import { PopupContainerProps } from "@/types/layouts/MobilePopup";
import styled from "@emotion/styled";

export const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
    position: fixed;
    background-color: ${({ theme }) => theme.background.secondary};
    width: ${({ width = '70%' }) => width};
    top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 136 - scroll) : 136)}px;
    left: 0;
    bottom: 0;
    display: grid;
    z-index: 1100;

    @media ${({ theme }) => theme.media.medium} {
        top: ${({ scroll = 0 }) => (scroll ? Math.max(0, 60 - scroll) : 60)}px;
        bottom: 60px;
        grid-template-rows: 60px 1fr;
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