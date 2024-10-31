import { FC } from "react";
import { Content, Header, Overlay, PopupContainer, Title } from "./styles";
import { MobilePopupPropsType } from "@/types/components/global/popups/mobilePopup";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";

const MobilePopup: FC<MobilePopupPropsType> = (
    { onClose,
        title = "",
        scroll,
        children,
        backgroundColor,
        width,
        height,
        paddingTop,
        rowGap,
        closeButton = false,
        disableOverlay }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <>{!disableOverlay ? (
            <Overlay onClick={handleOverlayClick}>
                <PopupContainer
                    scroll={scroll}
                    backgroundColor={backgroundColor}
                    width={width}
                    height={height}
                    paddingTop={paddingTop}
                    rowGap={rowGap}
                    title={title}
                    disableOverlay={false}                >
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
            :
            (<div>
                <PopupContainer
                    scroll={scroll}
                    backgroundColor={backgroundColor}
                    width={width}
                    paddingTop={paddingTop}
                    rowGap={rowGap}
                    title={title}
                    disableOverlay={true}  
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
            </div>)}
        </>

    )
}

export default MobilePopup;