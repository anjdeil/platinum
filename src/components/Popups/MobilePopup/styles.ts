import { PopupContainerProps } from "@/types/Layouts/MobilePopup";
import styled from "@emotion/styled";

export const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
    position: fixed;
    background-color: ${({ theme, backgroundColor = theme.background.secondary }) => backgroundColor};
    width: ${({ width = '241px' }) => width};
    padding-top: ${({ paddingTop = '0' }) => paddingTop};
    top: 60px;
    left: 0;
    bottom: 0;
    display: grid;
    grid-template-rows: ${({ title }) => title === '' ? '1fr' : '40px 1fr'};
    z-index: 1100;

    @media ${({ theme }) => theme.media.medium} {
        top: 136px;
        bottom: unset;
    }
`;

export const Header = styled.div`
    display: none;

    @media(max-width: 768px) {
        display: flex;
        padding: 0 20px;
        align-items: center;
        justify-content: space-between;
    }
`;

export const Title = styled.div`
    font-size: 1.5rem;
`;

export const CloseButton = styled.button`
    display: block;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export const Content = styled.div`
    padding: 0 20px;
    overflow: auto;
    position: relative;
`;
