import { useAppDispatch, useAppSelector } from '@/store';
import { currencySymbols, setCurrentCurrency } from '@/store/slices/currencySlice';
import CustomSelect from '../CustomSelect/CustomSelect';

export default function CurrencySelect() {
  const currency = useAppSelector((state) => state.currentCurrency);
  const dispatch = useAppDispatch();

  const onCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentCurrency({ code: event.target.value }));
  };

  return (
    <CustomSelect 
      options={currencySymbols} 
      value={currency.symbol} 
      onChange={onCurrencyChange} 
    />
  );
}
