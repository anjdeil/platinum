import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { OrderSummaryProps } from '@/types/pages/cart';
import getSubtotalByLineItems from '@/utils/cart/getSubtotalByLineItems';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import OrderTotalsRowsSkeleton from '../../order/OrderTotals/OrderTotalsRowsSkeleton';
import {
  OrderCouponName,
  OrderCouponNamesBox,
  OrderCouponWrapper,
  OrderSummaryLine,
  OrderSummaryLineCoupons,
  OrderSummaryLineName,
  OrderSummaryTotal,
  OrderSummaryTotalTax,
  OrderSummaryTotalValue,
  OrderSummaryTotalWrapper,
  OrderSummaryWrapper,
} from './style';

const OrderSummary: FC<OrderSummaryProps> = ({
  order,
  symbol,
  isLoading = false,
  noPaymentMethod,
}) => {
  const t = useTranslations('Cart');
  const tShipping = useTranslations('ShippingMethodSelector');

  const subtotal = order?.line_items
    ? getSubtotalByLineItems(order.line_items)
    : 0;

  const { formatPrice } = useCurrencyConverter();

  const discountTotal = order ? +order.discount_total + +order.discount_tax : 0;

  // Function for displaying the summary line
  const renderOrderTotal = () => {
    if (!order?.total) {
      return `—\u00A0${symbol}`;
    }

    const formattedPrice = formatPrice(+order.total);
    const formattedTax = formatPrice(+order.total_tax);

    return (
      <OrderSummaryTotalWrapper>
        <OrderSummaryTotalValue>{formattedPrice}</OrderSummaryTotalValue>
        <OrderSummaryTotalTax>
          {t('includesVat', {
            cost: formattedTax,
          })}
        </OrderSummaryTotalTax>
      </OrderSummaryTotalWrapper>
    );
  };

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

          {/* сoupons */}
          {discountTotal > 0 &&
            order?.coupon_lines?.map(line => {
              const name = `${t('coupon')} ${
                line.discount_type === 'percent'
                  ? `-${line.nominal_amount}% `
                  : ''
              }`;
              return (
                <OrderSummaryLineCoupons key={line.id}>
                  <OrderCouponWrapper>
                    <OrderSummaryLineName>{t('discount')}</OrderSummaryLineName>
                    <span>– {formatPrice(discountTotal)}</span>
                  </OrderCouponWrapper>
                  <OrderCouponNamesBox>
                    <OrderCouponName>
                      {name} {line.code}
                    </OrderCouponName>
                  </OrderCouponNamesBox>
                </OrderSummaryLineCoupons>
              );
            })}

          {/* delivery */}
          {order?.shipping_lines?.map(line => {
            const shippingLineTotal = +line.total + +line.total_tax;
            return (
              <OrderSummaryLine key={line.id}>
                <OrderSummaryLineName>
                  {tShipping(line.method_title)}
                </OrderSummaryLineName>
                <span>{formatPrice(+shippingLineTotal)}</span>
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
          {/* {order?.tax_lines?.map(line => (
            <OrderSummaryLine key={line.id}>
              <OrderSummaryLineName>
                {line.label} ({line.rate_percent}%)
              </OrderSummaryLineName>
              <span>{formatPrice(+line.tax_total)}</span>
            </OrderSummaryLine>
          ))} */}

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
              {order?.total && renderOrderTotal()}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default OrderSummary;
