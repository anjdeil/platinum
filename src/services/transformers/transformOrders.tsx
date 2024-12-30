import { OrderSummaryType } from '@/types/pages/account';
import { CurrenciesResponseType } from '@/types/services';
import { OrderType } from '@/types/services/wooCustomApi/shop';

export function transformOrders(
  orders: OrderType[],
  currencies: CurrenciesResponseType,
  selectedCurrency: string
): OrderSummaryType {
  if (!Array.isArray(orders)) {
    throw new Error('orders must be an array');
  }

  const filteredOrders = orders.filter(
    order => order.status === 'processing' || order.status === 'completed'
  );

  const currencyRates =
    currencies?.data?.items?.reduce<Record<string, number>>((acc, item) => {
      acc[item.code] = item.rate || 1;
      return acc;
    }, {}) || {};

  const selectedCurrencyRate = currencyRates[selectedCurrency] || 1;

  const totalAmountInBaseCurrency = filteredOrders.reduce((sum, order) => {
    const orderCurrencyRate = currencyRates[order.currency] || 1;
    return sum + parseFloat(order.total) / orderCurrencyRate;
  }, 0);

  const totalAmountInSelectedCurrency =
    totalAmountInBaseCurrency * selectedCurrencyRate;

  const orderCount = orders.length;

  return {
    orderCount,
    totalAmountPLN: parseFloat(totalAmountInBaseCurrency.toFixed(2)),
    totalAmount: parseFloat(totalAmountInSelectedCurrency.toFixed(2)),
  };
}
