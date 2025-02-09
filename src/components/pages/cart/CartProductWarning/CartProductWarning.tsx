import React from 'react';
import { UpdateButton, WarningWrapper } from './style';
import { useTranslations } from 'next-intl';
import { CartProductWarningProps } from '@/types/pages/cart';

const CartProductWarning: React.FC<CartProductWarningProps> = ({
  isProductError,
  onUpdate,
  resolveCount,
}) => {
  const t = useTranslations('Cart');
  return (
    <WarningWrapper>
      {resolveCount === 0 && (
        <>
          <span>{t('productNotAvailable')}</span>
          <UpdateButton onClick={onUpdate}>{t('delete')}</UpdateButton>
        </>
      )}
      {resolveCount && resolveCount !== 0 && (
        <>
          <div>
            <span>{t('productNotAvailableQuantity')}</span>
          </div>
          <UpdateButton onClick={onUpdate}>
            {t('updateTo')}&nbsp;{resolveCount}
          </UpdateButton>
        </>
      )}
      {!resolveCount && isProductError && (
        <>
          <span>Ошибка получения данных о товаре</span>
          <UpdateButton onClick={onUpdate}>{t('delete')}</UpdateButton>
        </>
      )}
    </WarningWrapper>
  );
};

export default CartProductWarning;
