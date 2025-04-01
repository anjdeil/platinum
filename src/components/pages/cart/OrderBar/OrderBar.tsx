import { OrderBarProps } from '@/types/pages/cart';
import { formatPrice } from '@/utils/price/formatPrice';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  OrderBarContent,
  OrderBarSum,
  OrderBarTitle,
  OrderBarWrapper,
} from './style';

const OrderBar: FC<OrderBarProps> = ({
  subtotal,
  symbol,
  isLoadingOrder = null,
  miniCart = false,
}) => {
  const t = useTranslations('Cart');

  return (
    <OrderBarWrapper>
      <OrderBarTitle miniCart={miniCart}>{t('orderValue')}</OrderBarTitle>
      <OrderBarContent>
        <OrderBarSum>
          {(isLoadingOrder !== null && isLoadingOrder) ||
          subtotal === undefined ? (
            <>
              <Skeleton width="50px" />
            </>
          ) : (
            <>
              {formatPrice(subtotal)} &nbsp;{symbol}
            </>
          )}
        </OrderBarSum>
      </OrderBarContent>
    </OrderBarWrapper>
  );
};

export default OrderBar;
