import { WooCustomerReqType } from '@/types/services';
import { createSlice } from '@reduxjs/toolkit';

export interface UserSliceState {
  user: WooCustomerReqType | null;
  isAuthenticated: boolean;
}

const initialState: UserSliceState = {
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null,
  isAuthenticated:
    typeof window !== 'undefined' && !!localStorage.getItem('user'),
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setAuthState: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuthState } = userSlice.actions;
export default userSlice.reducer;
