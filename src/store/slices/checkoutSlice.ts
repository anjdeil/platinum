import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
    success: boolean | null;
    token: string | null;
    totals: any | null;
    warnings: string[];
    couponErrors: string[];
    session?: any;

    billingData?: any;
    shippingData?: any;
    shippingMethods?: any[];
    selectedShippingMethod?: any;
    step?: number;
    expiresAt?: string | null;
    hasStep2Requested: boolean;
}

const initial: CheckoutState = {
    success: null,
    token: null,
    totals: null,
    warnings: [],
    couponErrors: [],
    step: 1,
    expiresAt: null,
    hasStep2Requested: false,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: initial,
    reducers: {
        setCheckoutState: (state, action: PayloadAction<Partial<CheckoutState>>) => {
            Object.assign(state, action.payload);
        },
        clearCheckoutState: (state) => {
            Object.assign(state, initial);
        },
        setHasStep2Requested(state, action) {
            state.hasStep2Requested = action.payload;
        }
    },
});

export const { setCheckoutState, clearCheckoutState, setHasStep2Requested } = checkoutSlice.actions;
export default checkoutSlice.reducer;
