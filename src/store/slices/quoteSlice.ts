import { SummaryRespType } from '@/types/services/wooCustomApi/customer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuoteState {
  data: SummaryRespType | null;
  currency: string;
}

const initialState: QuoteState = {
  data: null,
  currency: ''
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData: (state, action: PayloadAction<SummaryRespType>) => {
      state.data = action.payload;
    },
    setQuoteCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    clearQuoteData: state => {
      state.data = null;
    },
  },
});

export const { setQuoteData, setQuoteCurrency, clearQuoteData } = quoteSlice.actions;
export default quoteSlice.reducer;
