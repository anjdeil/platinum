import { FC, useEffect } from 'react';
import { StyledButton, Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import { ConfirmationContainer, ConfirmationFormWrapper } from './style';
import theme from '@/styles/theme';
import { useAppDispatch, useAppSelector } from '@/store';
import { popupToggle } from '@/store/slices/PopupSlice';
import { useLazyFetchUserDataQuery } from '@/store/rtk-queries/wpApi';

type ConfirmationRegCardType = {
  register: any;
  errors: any;
  setUserId: (id: string) => void;
};

export const ConfirmationRegCard: FC<ConfirmationRegCardType> = ({
  register,
  errors,
  setUserId,
}) => {
  const dispatch = useAppDispatch();
  const t = useTranslations('Checkout');

  const { user: userSlice } = useAppSelector(state => state.userSlice);
  const [fetchUserData, { data: userData }] = useLazyFetchUserDataQuery();

  const handleOpenLoginPopUp = async () => {
    dispatch(popupToggle('login'));
  };

  useEffect(() => {
    if (userSlice !== null) {
      fetchUserData();
    }
  }, [userSlice, fetchUserData]); // Перезапускать запрос, когда userSlice меняется

  useEffect(() => {
    if (userData?.id) {
      setUserId(userData.id.toString()); // Передаем значение родительскому компоненту
    }
  }, [userData, setUserId]); // Срабатывает, когда userData загружается

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
