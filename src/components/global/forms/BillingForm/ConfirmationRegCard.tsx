import { FC } from 'react';
import { FormWrapper, StyledButton, Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { CustomFormCheckbox } from '../CustomFormCheckbox';
import { ConfirmationContainer, ConfirmationContentrapper } from './style';
import theme from '@/styles/theme';

type ConfirmationRegCardType = {
  register: any;
  errors: any;
};

export const ConfirmationRegCard: FC<ConfirmationRegCardType> = ({
  register,
  errors,
}) => {
  const t = useTranslations('Checkout');
  return (
    <ConfirmationContainer>
      <Title as={'h3'} uppercase fontSize="16px" fontWeight={400}>
        {t('guestWarning')}
      </Title>
      <FormWrapper>
        <CustomFormCheckbox
          name={'registration'}
          register={register}
          errors={errors}
          label={t('registerAccount')}
        />
        <StyledButton
          color={theme.colors.white}
          type="submit"
          // disabled={isSubmitting}
        >
          {t('login')}
        </StyledButton>
      </FormWrapper>
    </ConfirmationContainer>
  );
};
