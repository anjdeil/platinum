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
    name: 'EUR',
    code: '€',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action: PayloadAction<{ name: string }>) => {
            const name = action.payload.name;
            const currency = currencySymbols.find((curr) => curr.name === name);

            if (currency) {
                state.name = currency.name;
                state.code = currency.code;
            } else {
                console.error(`Currency code "${name}" not recognized.`);
            }
        }
    }
})

export const { setCurrentCurrency } = currencySlice.actions;
export default currencySlice.reducer;
