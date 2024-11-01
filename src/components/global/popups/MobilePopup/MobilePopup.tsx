import { FC } from "react";
import { Content, Header, PopupContainer } from "./styles";
import { MobilePopupPropsType } from "@/types/components/global/popups/mobilePopup";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import { Overlay } from "@/styles/components";

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
        disableOverlay,
        padding }) => {

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    console.log('MobilePopup title:', title);
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
                    disableOverlay={false} >
                    {title && (
                        <Header padding={padding}    >
                            <>{title}</>
                            {closeButton && (
                                <CloseIcon onClick={onClose} />
                            )}
                        </Header>
                    )}
                    <Content padding={padding}    >
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
                            <>{title}</>
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