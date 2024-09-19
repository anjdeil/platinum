import { MobilePopupPropsType } from "@/types/layouts/MobilePopup";
import { FC } from "react";
import { CloseButton, Content, Header, Overlay, PopupContainer, Title } from "./styles";

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", children }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <PopupContainer>
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
            </PopupContainer>
        </Overlay>
    )
}

export default MobilePopup;