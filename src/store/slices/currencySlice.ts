import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrencyState {
    code: string;
    symbol: string;
}

export const currencySymbols: CurrencyState[] = [
    { code: 'EUR', symbol: '€' },
    { code: 'PLN', symbol: 'zł' },
    { code: 'USD', symbol: '$' },
];

const initialState: CurrencyState = {
    code: 'EUR',
    symbol: '€',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action: PayloadAction<{ code: string }>) => {
            const code = action.payload.code;
            const currency = currencySymbols.find((curr) => curr.code === code);

            if (currency) {
                state.code = currency.code;
                state.symbol = currency.symbol;
            } else {
                console.error(`Currency code "${code}" not recognized.`);
            }
        }
    }
})

export const { setCurrentCurrency } = currencySlice.actions;
export default currencySlice.reducer;
