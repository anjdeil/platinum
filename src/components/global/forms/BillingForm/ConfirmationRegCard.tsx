import { FC } from 'react';
import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import { CustomCheckboxLabel } from '../CustomFormCheckbox/styles';
import { CustomCheckboxStyled } from '../CustomCheckbox/styles';

type ConfirmationRegCardType = {
  name: string;
  register: any;
};

export const ConfirmationRegCard: FC<ConfirmationRegCardType> = ({
  name,
  register,
}) => {
  const t = useTranslations('Checkout');
  return (
    <div>
      <Title as={'h3'}></Title>
      <CustomCheckboxLabel>
        <CustomCheckboxStyled {...register(name)} />
        {t('registerAccount')}
      </CustomCheckboxLabel>
      <button></button>
    </div>
  );
};
