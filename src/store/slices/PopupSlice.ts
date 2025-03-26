import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  popupType: string;
  data?: Record<string, string | number>;
}

const initialState: PopupState = {
  popupType: '',
  data: undefined,
};

export const PopupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    popupSet: (state, action: PayloadAction<PopupState>) => {
      state.popupType = action.payload.popupType;
      state.data = action.payload.data;
    },
    popupClosed: state => {
      state.popupType = '';
      state.data = undefined;
    },
    popupClosedByType: (state, action: PayloadAction<string>) => {
      if (state.popupType === action.payload) {
        state.popupType = '';
        state.data = undefined;
      }
    },
    popupToggle: (state, action: PayloadAction<PopupState>) => {
      if (state.popupType !== action.payload.popupType) {
        state.popupType = action.payload.popupType;
        state.data = action.payload.data;
      } else {
        state.popupType = '';
        state.data = undefined;
      }
    },
  },
});

export const { popupSet, popupClosed, popupClosedByType, popupToggle } =
  PopupSlice.actions;
export default PopupSlice.reducer;
