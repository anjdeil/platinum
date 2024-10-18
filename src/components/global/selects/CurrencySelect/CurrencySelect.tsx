import { useAppDispatch, useAppSelector } from '@/store';
import CustomSelect from '../CustomSelect/CustomSelect';
import { currencySymbols, setCurrentCurrency } from '@/store/slices/currencySlice';


export default function CurrencySelect() {
  const currency = useAppSelector((state) => state.currencySlice);
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
