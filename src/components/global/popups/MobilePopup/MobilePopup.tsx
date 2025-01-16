import { MobilePopupPropsType } from '@/types/components/global/popups/mobilePopup';
import { FC } from 'react';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import { Content, Header, Overlay, PopupContainer } from './styles';

const MobilePopup: FC<MobilePopupPropsType> = ({
  onClose,
  title = '',
  scroll,
  children,
  backgroundColor,
  width,
  height,
  paddingTop,
  rowGap,
  closeButton = false,
  disableOverlay,
  padding,
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      {!disableOverlay ? (
        <Overlay onClick={handleOverlayClick}>
          <PopupContainer
            scroll={scroll}
            backgroundColor={backgroundColor}
            width={width}
            height={height}
            paddingTop={paddingTop}
            rowGap={rowGap}
            title={title}
            disableOverlay={false}
            closeButton={closeButton}
          >
            {title ||
              (closeButton && (
                <Header padding={padding} closeButton={closeButton}>
                  <>{title}</>
                  {closeButton && <CloseIcon onClick={onClose} />}
                </Header>
              ))}
            <Content padding={padding}>{children}</Content>
          </PopupContainer>
        </Overlay>
      ) : (
        <div>
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
                {closeButton && <CloseIcon onClick={onClose} />}
              </Header>
            )}
            <Content>{children}</Content>
          </PopupContainer>
        </div>
      )}
    </>
  );
};

export default MobilePopup;
