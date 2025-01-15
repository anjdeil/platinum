import { useTranslations } from 'next-intl'
import React, { FC } from 'react'
import {
  OrderSummaryLine,
  OrderSummaryLineName,
  OrderSummaryTotal,
  OrderSummaryTotalValue,
  OrderSummaryWrapper,
} from './style';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems'
import formatPrice from '@/utils/cart/formatPrice'
import OrderTotalsRowsSkeleton from '../../order/OrderTotals/OrderTotalsRowsSkeleton'
import { OrderSummaryProps } from '@/types/pages/cart'

const OrderSummary: FC<OrderSummaryProps> = ({ order, symbol, isLoading = false }) => {
  const t = useTranslations('Cart')
  const subtotal = order?.line_items ? getSubtotalByLineItems(order.line_items) : 0

  return (
    <OrderSummaryWrapper>
      {isLoading ? (
        <OrderTotalsRowsSkeleton />
      ) : (
        <>
          {/* subtotal */}
          <OrderSummaryLine>
            <OrderSummaryLineName>{t('products')}</OrderSummaryLineName>
            <span>
              {formatPrice(subtotal)}&nbsp;{symbol}
            </span>
          </OrderSummaryLine>

          {/* delivery */}
          {order?.shipping_lines?.map((line) => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>{line.method_title}</OrderSummaryLineName>
              <span>
                {line.total}&nbsp;{symbol}
              </span>
            </OrderSummaryLine>
          ))}

          {/* сoupons */}
          {order?.coupon_lines?.map((line) => {
            const name = `${t('сoupon')} ${
              line.discount_type === 'percent' ? `-${line.nominal_amount}% ` : ''
            }`
            return (
              <OrderSummaryLine key={line.id}>
                <OrderSummaryLineName>
                  {name} <br />
                  <span>{line.code}</span>
                </OrderSummaryLineName>
                <span>
                  - {line.discount}&nbsp;{symbol}
                </span>
              </OrderSummaryLine>
            )
          })}

          {/* fees */}
          {order?.fee_lines?.map((line) => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>{line.name}</OrderSummaryLineName>
              <span>
                {line.total}&nbsp;{symbol}
              </span>
            </OrderSummaryLine>
          ))}

          {/* Taxes */}
          {order?.tax_lines?.map((line) => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>
                {line.label} ({line.rate_percent}%)
              </OrderSummaryLineName>
              <span>
                {line.tax_total}&nbsp;{symbol}
              </span>
            </OrderSummaryLine>
          ))}

          {/*payment Method*/}
          <OrderSummaryLine>
            <OrderSummaryLineName>{t('paymentMethod')}</OrderSummaryLineName>
            <span>{order?.payment_method_title || '—'}</span>
          </OrderSummaryLine>

          {/*Order Summary Total */}
          <OrderSummaryTotal>
            <OrderSummaryLineName>{t('OrderSummaryTotal')}</OrderSummaryLineName>
            <OrderSummaryTotalValue>
              {order?.total || '—'}&nbsp;{symbol}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  )
}

export default OrderSummary
