import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { PreOrderSummaryProps } from '@/types/pages/cart';
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

const PreOrderSummary: FC<PreOrderSummaryProps> = ({
  summary,
  isLoading = false,
  selectedShippingMethod,
  session,
}) => {
  const t = useTranslations('Cart');
  const tShipping = useTranslations('ShippingMethodSelector');
  const { formatPrice } = useCurrencyConverter();

  const subtotal = +(summary?.items_subtotal_incl_tax ?? 0);
  const discountAmount = +(summary?.discount_total ?? 0);
  const vatTotal = +(summary?.vat_total ?? 0);
  const total = +(summary?.total ?? 0);
  const shippingTotal = +(summary?.shipping_total ?? 0);

  function normalizeShippingLabel(label: string): string {
    return label.replace(/\s*\(free\)\s*$/i, '').trim();
  }

  const renderOrderTotal = () => {
    return (
      <OrderSummaryTotalWrapper>
        <OrderSummaryTotalValue>{formatPrice(total)}</OrderSummaryTotalValue>
        {summary && vatTotal > 0 && (
          <OrderSummaryTotalTax>
            {t('includesVat', {
              cost: formatPrice(vatTotal),
            })}
          </OrderSummaryTotalTax>
        )}
      </OrderSummaryTotalWrapper>
    );
  };

  const parsedSession =
    session && typeof session === 'string'
      ? JSON.parse(session)
      : session ?? null;

  const couponData =
    parsedSession?.coupon_data && typeof parsedSession.coupon_data === 'string'
      ? JSON.parse(parsedSession.coupon_data)
      : parsedSession?.coupon_data ?? null;

  return (
    <OrderSummaryWrapper>
      {!summary || isLoading ? (
        <OrderTotalsRowsSkeleton noPaymentMethod />
      ) : (
        <>
          {/* products */}
          <OrderSummaryLine>
            <OrderSummaryLineName>{t('products')}</OrderSummaryLineName>
            <span>{formatPrice(subtotal)}</span>
          </OrderSummaryLine>

          {/* discounts */}
          {discountAmount > 0 && (
            <OrderSummaryLineCoupons>
              <OrderCouponWrapper>
                <OrderSummaryLineName>{t('discount')}</OrderSummaryLineName>
                <span>– {formatPrice(discountAmount)}</span>
              </OrderCouponWrapper>
              {couponData?.amount && (
                <OrderCouponNamesBox>
                  <OrderCouponName>
                    {t('coupon')} –{couponData.amount}% {couponData.code}
                  </OrderCouponName>
                </OrderCouponNamesBox>
              )}
            </OrderSummaryLineCoupons>
          )}

          {/* shipping */}
          {selectedShippingMethod && (
            <OrderSummaryLine>
              <OrderSummaryLineName>
                {tShipping(
                  normalizeShippingLabel(selectedShippingMethod.label)
                )}
              </OrderSummaryLineName>
              <span>{formatPrice(shippingTotal)}</span>
            </OrderSummaryLine>
          )}

          {/* total */}
          <OrderSummaryTotal>
            <OrderSummaryLineName>
              {t('OrderSummaryTotal')}
            </OrderSummaryLineName>
            <OrderSummaryTotalValue>
              {renderOrderTotal()}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default PreOrderSummary;
