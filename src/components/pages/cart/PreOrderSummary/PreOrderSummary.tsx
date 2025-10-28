import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { PreOrderSummaryProps } from '@/types/pages/cart';
import { calculateCartFront } from '@/utils/cart/calculateCartFront';
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
  cartItems,
  isLoading = false,
  userTotal,
}) => {
  const t = useTranslations('Cart');
  const { formatPrice } = useCurrencyConverter();

  const userLoyaltyStatus = userTotal?.loyalty_status;

  const subtotal = summary
    ? +summary.subtotal + +summary.vat_total
    : calculateCartFront(cartItems, userLoyaltyStatus).subtotal;
  const discountAmount = summary
    ? +summary.discount_total
    : calculateCartFront(cartItems, userLoyaltyStatus).discountAmount;
  const total = summary
    ? +summary.total
    : calculateCartFront(cartItems, userLoyaltyStatus).total;
  const vatTotal = summary ? +summary.vat_total : 0;

  // Function for displaying the summary line
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
      {isLoading ? (
        <OrderTotalsRowsSkeleton noPaymentMethod />
      ) : (
        <>
          {/* subtotal */}
          <OrderSummaryLine>
            <OrderSummaryLineName>{t('products')}</OrderSummaryLineName>
            <span>{formatPrice(subtotal)}</span>
          </OrderSummaryLine>

          {/* discount */}
          {discountAmount > 0 && (
            <OrderSummaryLineCoupons>
              <OrderCouponWrapper>
                <OrderSummaryLineName>{t('discount')}</OrderSummaryLineName>
                <span>– {formatPrice(discountAmount)}</span>
              </OrderCouponWrapper>
            </OrderSummaryLineCoupons>
          )}

          {/*Order Summary Total */}
          <OrderSummaryTotal>
            <OrderSummaryLineName>
              {t('OrderSummaryTotal')}
            </OrderSummaryLineName>
            <OrderSummaryTotalValue>
              {total && renderOrderTotal()}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default PreOrderSummary;
