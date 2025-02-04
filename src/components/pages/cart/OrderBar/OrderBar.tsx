import { FC } from 'react';
import {
  OrderBarContent,
  OrderBarSum,
  OrderBarWrapper,
  OrderBarTitle,
  OrderBarDesc,
  CrossedOut,
} from './style';
import { Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { roundedPrice } from '@/utils/cart/roundedPrice';
import { OrderBarProps } from '@/types/pages/cart';
import { FlexBox } from '@/styles/components';

const OrderBar: FC<OrderBarProps> = ({
  subtotal,
  symbol,
  totalDisc,
  isLoadingOrder = null,
  miniCart = false,
  productsData = null,
}) => {
  const t = useTranslations('Cart');

  return (
    <OrderBarWrapper>
      <OrderBarTitle miniCart={miniCart}>{t('orderValue')}</OrderBarTitle>
      <OrderBarContent>
        <OrderBarSum>
          {(isLoadingOrder !== null && isLoadingOrder) ||
          (productsData !== null && productsData === undefined) ||
          subtotal === undefined ? (
            <>
              <Skeleton width="50px" />
            </>
          ) : (
            <div>
              {!totalDisc ? (
                <>
                  {roundedPrice(subtotal)} &nbsp;{symbol}
                </>
              ) : (
                <>
                  {subtotal !== totalDisc ? (
                    <FlexBox alignItems="flex-end">
                      <CrossedOut>{roundedPrice(subtotal)}</CrossedOut>
                      {totalDisc}&nbsp;{symbol}
                    </FlexBox>
                  ) : (
                    <>
                      {roundedPrice(subtotal)} &nbsp;{symbol}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </OrderBarSum>
        {!miniCart && (
          <OrderBarDesc textAlign="right">
            {t('priceToDelivery', { locale: '26 zl' })}
          </OrderBarDesc>
        )}
      </OrderBarContent>
    </OrderBarWrapper>
  );
};

export default OrderBar;
