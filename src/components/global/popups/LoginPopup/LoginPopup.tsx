import { SwiperPopupProps } from '@/types/components/global/sliders/productSwiper';
import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import { LoginForm } from '../../forms/LoginForm';
import { PopupBody, PopupOverlay } from '../styles';
import { FlexBox } from '@/styles/components';

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
        <LoginForm border={false} />
      </PopupBody>
    </PopupOverlay>
  );
};

export default LoginPopup;
