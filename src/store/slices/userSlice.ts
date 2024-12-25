import { createSlice } from "@reduxjs/toolkit";

export interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface UserSliceState {
    user: UserType | null;
}

const initialState: UserSliceState = {
    user: null,
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
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
