import { FC, ReactElement } from "react";
import styled from "styled-components";

interface MobilePopupPropsType {
    onClose: () => void,
    title?: string | ReactElement,
    children: ReactElement
}

const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Popup = styled.div`
    position: fixed;
    background-color: ${({ theme }) => theme.background.secondary};
    width: 241px;
    top: 136px;
    left: 0;
    display: grid;
    z-index: 1100;

    @media(max-width: 768px) {
        width: 241px;
        top: 60px;
        bottom: 0;
        grid-template-rows: 60px 1fr;
    }
`;

const Header = styled.div`
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    @media(max-width: 768px) {
        display: flex;
    }
`;

const Title = styled.div`
    font-size: 1.5rem;
`;

const CloseButton = styled.button`
    display: block;
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const Content = styled.div`
    padding: 0 20px;
    overflow: visible;
    position: relative;
`;

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", children }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <Popup>
                <Header>
                    <Title>{title}</Title>
                    <CloseButton onClick={onClose} aria-label="Close hamburger menu">
                        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </CloseButton>
                </Header>
                <Content>
                    {children}
                </Content>
            </Popup>
        </Overlay>
    )
}

export default MobilePopup;