import { PopupContainerProps } from "@/types/layouts/MobilePopup";
import styled from "@emotion/styled";

export const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
`;

export const PopupContainer = styled.div<PopupContainerProps>`
    position: fixed;
    background-color: ${({ theme, backgroundColor = theme.background.secondary }) => backgroundColor};
    width: ${({ width = '70%' }) => width};
    padding-top: ${({ paddingTop = '0' }) => paddingTop};
    row-gap: ${({ rowGap }) => rowGap};
    top: 136px;
    left: 0;
    bottom: 0;
    display: grid;
    z-index: 1100;

    @media(max-width: 768px) {
        top: 60px;
        bottom: 0;
        grid-template-rows: ${({ title }) => title === '' ? '1fr' : '40px 1fr'};
    }
`;

export const Header = styled.div`
    display: none;
    
    @media ${({ theme }) => theme.media.medium} {
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
