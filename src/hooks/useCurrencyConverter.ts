import { useAppSelector } from '@/store';
import { useGetCurrenciesQuery } from '@/store/rtk-queries/wpCustomApi';
import { roundedPrice } from '@/utils/cart/roundedPrice';

export const useCurrencyConverter = () => {
  const { data: currencies, isLoading: isCurrenciesLoading } =
    useGetCurrenciesQuery();
  const selectedCurrency = useAppSelector(state => state.currencySlice);

  const currentCurrency =
    currencies && !isCurrenciesLoading
      ? currencies?.data?.items.find(
        currency => currency.code === selectedCurrency.name
      )
      : undefined;

  const extendedCurrency = {
    ...selectedCurrency,
    rate: currentCurrency ? currentCurrency.rate || 1 : undefined,
  };

  console.log('extendedCurrency...', extendedCurrency);

  const convertCurrency = (value: number) => {
    if (!extendedCurrency.rate) {
      return value;
    }
    const convertedValue = value * extendedCurrency.rate;
    return roundedPrice(convertedValue);
  };

  const convertToDefaultCurrency = (value: number) => {
    if (!extendedCurrency.rate) {
      return value;
    }
    const convertedValue = value / extendedCurrency.rate;
    return roundedPrice(convertedValue);
  };

  const formatPrice = (price: number): string => {
    const rounded = (Math.round(price * 100) / 100).toFixed(2);
    return `${rounded.replace('.', ',')}\u00A0${extendedCurrency.code}`;
  };

  return {
    formatPrice,
    currentCurrency,
    convertCurrency,
    convertToDefaultCurrency,
    currencyName: extendedCurrency.name,
    currencyCode: extendedCurrency.code,
    isLoading: isCurrenciesLoading || !extendedCurrency.rate,
  };
};
