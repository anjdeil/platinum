import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { QuoteSummaryProps } from '@/types/pages/cart';
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

const QuoteSummary: FC<QuoteSummaryProps> = ({
  quoteData,
  symbol,
  isLoading = false,
}) => {
  const t = useTranslations('Cart');

  const { formatPrice } = useCurrencyConverter();

  // Function for displaying the summary line
  const renderOrderTotal = () => {
    if (!quoteData?.total) {
      return `—\u00A0${symbol}`;
    }

    const formattedPrice = formatPrice(+quoteData.total);
    const formattedTax = formatPrice(+quoteData.vat_total);

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
            <span>
              {formatPrice(+quoteData.subtotal + +quoteData.vat_total)}
            </span>
          </OrderSummaryLine>

          {/* discount */}
          {+quoteData.discount_total > 0 && (
            <OrderSummaryLineCoupons>
              <OrderCouponWrapper>
                <OrderSummaryLineName>{t('discount')}</OrderSummaryLineName>
                <span>– {formatPrice(+quoteData.discount_total)}</span>
              </OrderCouponWrapper>
            </OrderSummaryLineCoupons>
          )}

          {/*Summary Total */}
          <OrderSummaryTotal>
            <OrderSummaryLineName>
              {t('OrderSummaryTotal')}
            </OrderSummaryLineName>
            <OrderSummaryTotalValue>
              {quoteData?.total && renderOrderTotal()}
            </OrderSummaryTotalValue>
          </OrderSummaryTotal>
        </>
      )}
    </OrderSummaryWrapper>
  );
};

export default QuoteSummary;
