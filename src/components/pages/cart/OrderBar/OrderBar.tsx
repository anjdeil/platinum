import { FC } from 'react'
import {
  OrderBarContent,
  OrderBarSum,
  OrderBarWrapper,
  OrderBarTitle,
  OrderBarDesc,
} from './style'
import { Skeleton } from '@mui/material'
import { useTranslations } from 'next-intl'
import { roundedPrice } from '@/utils/cart/roundedPrice'
import { OrderBarProps } from '@/types/pages/cart'

const OrderBar: FC<OrderBarProps> = ({
  cartSum,
  symbol,
  isLoadingOrder,
  miniCart = false,
}) => {
  const t = useTranslations('Cart')
  return (
    <OrderBarWrapper>
      <OrderBarTitle miniCart={miniCart}>{t('orderValue')}</OrderBarTitle>
      <OrderBarContent>
        <OrderBarSum>
          {isLoadingOrder ? (
            <>
              <Skeleton width="50px" />
            </>
          ) : (
            <>
              {roundedPrice(cartSum)}
              &nbsp;{symbol}
            </>
          )}
        </OrderBarSum>
        {!miniCart && (
          <OrderBarDesc textAlign="right">
            {t('priceToDelivery', { locale: '26 zl' })}
          </OrderBarDesc>
        )}
      </OrderBarContent>
    </OrderBarWrapper>
  )
}

export default OrderBar
