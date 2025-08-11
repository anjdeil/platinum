import { CartProductWarningProps } from '@/types/pages/cart';
import { useTranslations } from 'next-intl';
import React from 'react';
import { UpdateButton, WarningWrapper } from './style';

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
      {Boolean(resolveCount && resolveCount !== 0) && (
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
          <span>{t('errorFetchingProducts')}</span>
          <UpdateButton onClick={onUpdate}>{t('delete')}</UpdateButton>
        </>
      )}
    </WarningWrapper>
  );
};

export default CartProductWarning;
