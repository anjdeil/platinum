import { SwiperPopupProps } from '@/types/components/global/sliders/productSwiper';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import { LoginForm } from '../../forms/LoginForm';

import { FlexBox } from '@/styles/components';
import { CloseWrapper, PopupBody, PopupContainer, PopupOverlay } from './style';

const LoginPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <PopupOverlay onClick={handleClickBackground}>
      <PopupBody
        maxWidth="600px"
        padding="32px"
        tabletPadding="32px"
        mobilePadding="20px"
      >
        <PopupContainer>
          <FlexBox justifyContent="flex-end">
            <CloseWrapper>
              <CloseIcon onClick={onClose} />
            </CloseWrapper>
          </FlexBox>
          <LoginForm redirect={false} border={false} onClose={onClose} />
        </PopupContainer>
      </PopupBody>
    </PopupOverlay>
  );
};

export default LoginPopup;
