import { createSlice } from '@reduxjs/toolkit';

interface CurrencyState
{
    code: string;
    symbol: string;
}

const currencySymbols: { [key: string]: string } = {
    'EUR': '€',
    'PLN': 'zł',
    'USD': '$',
};

const initialState: CurrencyState = {
    code: 'EUR',
    symbol: '€',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrentCurrency: (state, action) =>
        {
            const code = action.payload.code;
            const symbol = currencySymbols[code];

            if (symbol)
            {
                state.code = code;
                state.symbol = symbol;
            } else
            {
                console.error(`Currency code "${code}" not recognized.`);
            }
        }
    }
})

export const { setCurrentCurrency } = currencySlice.actions;
export default currencySlice.reducer;
