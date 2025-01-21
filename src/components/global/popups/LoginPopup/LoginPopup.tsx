import { SwiperPopupProps } from '@/types/components/global/sliders/productSwiper';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import { LoginForm } from '../../forms/LoginForm';

import { FlexBox } from '@/styles/components';
import { PopupBody, PopupOverlay } from './style';

const LoginPopup: React.FC<SwiperPopupProps> = ({ onClose }) => {
  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <PopupOverlay onClick={handleClickBackground}>
      <PopupBody padding="24px 32px">
        <FlexBox justifyContent="flex-end" padding="0 32px">
          <CloseIcon onClick={onClose} />
        </FlexBox>
        <LoginForm redirect={false} border={false} onClose={onClose} />
      </PopupBody>
    </PopupOverlay>
  );
};

export default LoginPopup;
