import { FC, ReactElement } from "react";
import styled from "styled-components";

interface MobilePopupPropsType {
    onClose: () => void,
    title?: string | ReactElement,
    children: ReactElement,
    isCatalog?: boolean
}

const Overlay = styled.div`
    position: fixed;
    z-index: 1000;
    inset: 0;
`;

const Popup = styled.div<{ isCatalog: boolean }>`
    position: fixed;
    background-color: ${({ theme, isCatalog }) => (isCatalog ? theme.colors.white : theme.background.secondary)};
    width: 241px;    
    top: 136px;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 1100;

    @media(max-width: 768px) {
        width: ${({ isCatalog }) => (isCatalog ? '100%' : '241px')};
        top: 60px;
        bottom: 0;
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
    margin-top: 22px;
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    padding: 8px 16px;    
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
    overflow-y: auto;
    position: relative;
`;

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", children, isCatalog = false }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <Popup isCatalog={isCatalog}>
                <Header>
                    <Title>{title}</Title>
                    {!isCatalog && (
                        <CloseButton onClick={onClose} aria-label="Close hamburger menu">
                        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </CloseButton>
                    )}
                </Header>
                <Content>
                    {children}
                </Content>
            </Popup>
        </Overlay>
    )
}

export default MobilePopup;