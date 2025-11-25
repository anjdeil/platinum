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

  const hasValidResolve = typeof resolveCount === 'number';

  return (
    <WarningWrapper>
      {hasValidResolve && resolveCount <= 0 && (
        <>
          <span>{t('productNotAvailable')}</span>
          <UpdateButton onClick={onUpdate}>{t('delete')}</UpdateButton>
        </>
      )}
      {hasValidResolve && resolveCount > 0 && (
        <>
          <div>
            <span>{t('productNotAvailableQuantity')}</span>
          </div>
          <UpdateButton onClick={onUpdate}>
            {t('updateTo')}&nbsp;{resolveCount}
          </UpdateButton>
        </>
      )}
      {!hasValidResolve && isProductError && (
        <>
          <span>{t('errorFetchingProducts')}</span>
          <UpdateButton onClick={onUpdate}>{t('delete')}</UpdateButton>
        </>
      )}
    </WarningWrapper>
  );
};

export default CartProductWarning;
