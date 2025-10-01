import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { PreOrderSummaryProps } from '@/types/pages/cart';
import { calculateCartFront } from '@/utils/cart/calculateCartFront';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import OrderTotalsRowsSkeleton from '../../order/OrderTotals/OrderTotalsRowsSkeleton';
import {
  OrderCouponWrapper,
  OrderSummaryLine,
  OrderSummaryLineCoupons,
  OrderSummaryLineName,
  OrderSummaryTotal,
  OrderSummaryTotalValue,
  OrderSummaryTotalWrapper,
  OrderSummaryWrapper,
} from './style';

const PreOrderSummary: FC<PreOrderSummaryProps> = ({
  cartItems,
  isLoading = false,
  userTotal,
}) => {
  const t = useTranslations('Cart');
  const { formatPrice } = useCurrencyConverter();

  const totalCartPrice = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.convertedTotalPrice, 0),
    [cartItems]
  );

  const userLoyaltyStatus = userTotal?.loyalty_status;

  const { subtotal, discountAmount, total } = calculateCartFront(
    cartItems,
    userLoyaltyStatus
  );

  console.log('subtotal...', subtotal);
  console.log('discountAmount...', discountAmount);
  console.log('total...', total);

  // Function for displaying the summary line
  const renderOrderTotal = () => {
    return (
      <OrderSummaryTotalWrapper>
        <OrderSummaryTotalValue>{formatPrice(total)}</OrderSummaryTotalValue>
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
              {totalCartPrice && renderOrderTotal()}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default PreOrderSummary;
