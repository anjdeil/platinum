import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrencyState {
    name: string;
    code: string;
}

export const currencySymbols: CurrencyState[] = [
    { name: 'EUR', code: '€' },
    { name: 'PLN', code: 'zł' },
    { name: 'USD', code: '$' },
];

const initialState: CurrencyState = {
  name: 'PLN',
  code: 'zł',
};

const currencySlice = createSlice({
    name: 'currencySlice',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action: PayloadAction<{ code: string }>) => {
            const code = action.payload.code;
            const currency = currencySymbols.find((curr) => curr.code === code);

            if (currency) {
                state.name = currency.name;
                state.code = currency.code;
            } else {
                console.error(`Currency code "${code}" not recognized.`);
            }
        }
    }
})

export const { setCurrentCurrency } = currencySlice.actions;
export default currencySlice.reducer;
