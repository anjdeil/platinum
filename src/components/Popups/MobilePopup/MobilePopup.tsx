import CloseIcon from "@/components/Common/Icons/CloseIcon/CloseIcon";
import { MobilePopupPropsType } from "@/types/layouts/MobilePopup";
import { FC } from "react";
import { Content, Header, Overlay, PopupContainer, Title } from "./styles";

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", scroll, children }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <PopupContainer scroll={scroll}>
                <Header>
                    <Title>{title}</Title>
                    <CloseIcon onClick={onClose} />
                </Header>
                <Content>
                    {children}
                </Content>
            </PopupContainer>
        </Overlay>
    )
}

export default MobilePopup;