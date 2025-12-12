import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { PreOrderSummaryProps } from '@/types/pages/cart';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import OrderTotalsRowsSkeleton from '../../order/OrderTotals/OrderTotalsRowsSkeleton';
import {
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
}) => {
  const t = useTranslations('Cart');
  const tShipping = useTranslations('ShippingMethodSelector');
  const { formatPrice } = useCurrencyConverter();

  const subtotal = +(summary?.subtotal ?? 0);
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
