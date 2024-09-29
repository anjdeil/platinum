import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeOptionsType } from '@/types/services/customApi/ThemeOptions';

const initialState: ThemeOptionsType = {
    success: false,
    data: {
      item: {
        loyalty_options: {
          lang: {
            silver: '',
            gold: '',
            platinum: '',
          },
        },
        contacts: {
          schedule: [],
          socials: [],
          phone: '',
          email: '',
          address: '',
        },
        about_platinum: {
          lang: {
            subtitle: '',
            title: '',
            text: '',
          },
        },
      },
    },
  };
  
  type ThemeOptionsPayload = {
    data: ThemeOptionsType;
    language: object | "en" | "pl" | "de" | "ru" | "uk" | undefined;
  };
  

  const themeOptionsSlice = createSlice({
    name: 'themeOptions',
    initialState,
    reducers: {
      setThemeOptions: (state, action: PayloadAction<ThemeOptionsPayload>) => {
        const { data, language } = action.payload;
        const filteredData = {
          item: {
            loyalty_options: {
              lang: data.data.item.loyalty_options[language as keyof typeof data.data.item.loyalty_options],
            },
            contacts: data.data.item.contacts,
            about_platinum: {
              lang: data.data.item.about_platinum[language as keyof typeof data.data.item.loyalty_options],
            },
          },
        };
        state.success = true;
        state.data = filteredData;
      },
    },
  });
  
  export const { setThemeOptions } = themeOptionsSlice.actions;
  export default themeOptionsSlice.reducer;