import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { OrderSummaryProps } from '@/types/pages/cart';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import OrderTotalsRowsSkeleton from '../../order/OrderTotals/OrderTotalsRowsSkeleton';
import {
  OrderSummaryLine,
  OrderSummaryLineName,
  OrderSummaryTotal,
  OrderSummaryTotalValue,
  OrderSummaryWrapper,
} from './style';

const OrderSummary: FC<OrderSummaryProps> = ({
  order,
  symbol,
  isLoading = false,
  noPaymentMethod,
}) => {
  const t = useTranslations('Cart');
  const subtotal = order?.line_items
    ? getSubtotalByLineItems(order.line_items)
    : 0;

  const { formatPrice } = useCurrencyConverter();

  return (
    <OrderSummaryWrapper>
      {isLoading ? (
        <OrderTotalsRowsSkeleton noPaymentMethod />
      ) : (
        <>
          {/* subtotal */}
          <OrderSummaryLine>
            <OrderSummaryLineName>{t('products')}</OrderSummaryLineName>
            <span>{formatPrice(subtotal)}</span>
          </OrderSummaryLine>

          {/* delivery */}
          {order?.shipping_lines?.map(line => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>{line.method_title}</OrderSummaryLineName>
              <span>{formatPrice(+line.total)}</span>
            </OrderSummaryLine>
          ))}

          {/* сoupons */}
          {order?.coupon_lines?.map(line => {
            const name = `${t('coupon')} ${
              line.discount_type === 'percent'
                ? `-${line.nominal_amount}% `
                : ''
            }`;
            return (
              <OrderSummaryLine key={line.id}>
                <OrderSummaryLineName>
                  {name} <br />
                  <span>{line.code}</span>
                </OrderSummaryLineName>
                <span>- {formatPrice(+line.discount)}</span>
              </OrderSummaryLine>
            );
          })}

          {/* fees */}
          {order?.fee_lines?.map(line => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>{line.name}</OrderSummaryLineName>
              <span>{formatPrice(+line.total)}</span>
            </OrderSummaryLine>
          ))}

          {/* Taxes */}
          {order?.tax_lines?.map(line => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>
                {line.label} ({line.rate_percent}%)
              </OrderSummaryLineName>
              <span>{formatPrice(+line.tax_total)}</span>
            </OrderSummaryLine>
          ))}

          {/*payment Method*/}
          {noPaymentMethod === false && (
            <OrderSummaryLine>
              <OrderSummaryLineName>{t('paymentMethod')}</OrderSummaryLineName>
              <span>{order?.payment_method_title || '—'}</span>
            </OrderSummaryLine>
          )}

          {/*Order Summary Total */}
          <OrderSummaryTotal>
            <OrderSummaryLineName>
              {t('OrderSummaryTotal')}
            </OrderSummaryLineName>
            <OrderSummaryTotalValue>
              {order?.total ? formatPrice(+order.total) : `—\u00A0${symbol}`}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default OrderSummary;
