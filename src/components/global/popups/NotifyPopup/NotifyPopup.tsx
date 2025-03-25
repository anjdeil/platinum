import CloseIcon from '../../icons/CloseIcon/CloseIcon';
import { Title } from '@/styles/components';
import {
  StyledCloseWrapper,
  StyledHeader,
  StyledPopupBody,
  StyledPopupOverlay,
} from './style';
import { NotifyPopupForm } from '../../forms/NotifyPopupForm';
import { useTranslations } from 'next-intl';

interface NotifyPopupProps {
  onClose: () => void;
  data: Record<string, string | number>;
}
const NotifyPopup: React.FC<NotifyPopupProps> = ({ onClose, data }) => {
  const t = useTranslations('Product');

  const handleClickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <StyledPopupOverlay onClick={handleClickBackground}>
      <StyledPopupBody>
        <StyledHeader>
          <Title as="h3">{t('notifyWhenAvailable')}</Title>
          <StyledCloseWrapper>
            <CloseIcon onClick={onClose} padding="0" />
          </StyledCloseWrapper>
        </StyledHeader>
        <NotifyPopupForm data={data} />
      </StyledPopupBody>
    </StyledPopupOverlay>
  );
};

export default NotifyPopup;
