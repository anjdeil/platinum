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

  const convertCurrency = (value: number) => {
    if (!extendedCurrency.rate) {
      console.warn(
        'Currency rate is not defined. Returning the original value.'
      );
      return value;
    }
    const convertedValue = value * extendedCurrency.rate;
    return roundedPrice(convertedValue);
  };

  const convertToDefaultCurrency = (value: number) => {
    if (!extendedCurrency.rate) {
      console.warn(
        'Currency rate is not defined. Returning the original value.'
      );
      return value; // Возвращаем оригинальное значение, если курс ещё не доступен
    }
    const convertedValue = value / extendedCurrency.rate;
    return roundedPrice(convertedValue);
  };

  return {
    currentCurrency,
    convertCurrency,
    convertToDefaultCurrency,
    currencyCode: extendedCurrency.code,
    isLoading: isCurrenciesLoading || !extendedCurrency.rate,
  };
};
