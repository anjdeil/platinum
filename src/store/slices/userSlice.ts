import { WooCustomerReqType } from "@/types/services";
import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceState {
    user: WooCustomerReqType | null;
}

const initialState: UserSliceState = {
    user: typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('user') || 'null')
        : null,
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
