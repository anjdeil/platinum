import { MobilePopupPropsType } from "@/types/components/global/popups/mobilePopup";
import { FC } from "react";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import { Content, Header, Overlay, PopupContainer, Title } from "./styles";

const MobilePopup: FC<MobilePopupPropsType> = ({ onClose, title = "", scroll, children, backgroundColor, width, paddingTop, rowGap, closeButton = false }) =>
{

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) =>
    {
        if (event.target === event.currentTarget)
        {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <PopupContainer
                scroll={scroll}
                backgroundColor={backgroundColor}
                width={width}
                paddingTop={paddingTop}
                rowGap={rowGap}
                title={title}
            >
                {title && (
                    <Header>
                        <Title>{title}</Title>
                        {closeButton && (
                            <CloseIcon onClick={onClose} />
                        )}
                    </Header>
                )}
                <Content>
                    {children}
                </Content>
            </PopupContainer>
        </Overlay>
    )
}

export default MobilePopup;