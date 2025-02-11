import { FC } from 'react';
import { StyledButton, Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import { ConfirmationContainer, ConfirmationFormWrapper } from './style';
import theme from '@/styles/theme';
import { useAppDispatch } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';

type ConfirmationRegCardType = {
  register: any;
  errors: any;
};

export const ConfirmationRegCard: FC<ConfirmationRegCardType> = ({
  register,
  errors,
}) => {
  const dispatch = useAppDispatch();
  const t = useTranslations('Checkout');

  const handleOpenLoginPopUp = async () => {
    dispatch(popupToggle('login'));
  };

  return (
    <ConfirmationContainer>
      <Title as={'h3'} uppercase fontSize="16px" fontWeight={400}>
        {t('guestWarning')}
      </Title>
      <ConfirmationFormWrapper>
        <CustomFormCheckbox
          name={'registration'}
          register={register}
          errors={errors}
          label={t('registerAccount')}
        />
        <StyledButton
          color={theme.colors.white}
          type="submit"
          onClick={handleOpenLoginPopUp}
          // disabled={isSubmitting}
        >
          {t('login')}
        </StyledButton>
      </ConfirmationFormWrapper>
    </ConfirmationContainer>
  );
};
