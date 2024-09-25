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
    top: 136px;
    left: 0;
    display: grid;
    z-index: 1100;

    @media ${({ theme }) => theme.media.medium} {
        top: 60px;
        bottom: 0;
        grid-template-rows: 60px 1fr;
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
    font-size: 1.5rem;
`;

export const Content = styled.div`
    padding: 0 20px;
    overflow: visible;
    position: relative;
`;