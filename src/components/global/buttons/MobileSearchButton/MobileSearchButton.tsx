import { popupSet } from '@/store/slices/PopupSlice';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { ButtonStyled, IconStyled } from './styles';

const MobileSearchButton = () => {
  const dispatch = useDispatch();

  const t = useTranslations('Search');

  return (
    <ButtonStyled
      // <ButtonStyled onClick={() => dispatch(popupSet('mobile-search'))}>
      onClick={() => dispatch(popupSet({ popupType: 'mobile-search' }))}
    >
      {t('Search')}
      <IconStyled
        src={'/assets/icons/search.svg'}
        alt={'Search'}
        width={24}
        height={24}
      />
    </ButtonStyled>
  );
};

export default MobileSearchButton;
