import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeOptionsType } from '@/types/services/customApi/ThemeOptions';
import { LangParamType } from '@/types/services';

const initialState: ThemeOptionsType = {
  success: false,
  data: {
    item: {
      loyalty_options: {
        en: {
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
        en: {
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
    language: string;
  };
  
  const themeOptionsSlice = createSlice({
    name: 'themeOptions',
    initialState,
    reducers: {
      setThemeOptions: (state, action: PayloadAction<ThemeOptionsPayload>) => {
        const { data, language } = action.payload;
        
        const loyaltyOptions = data.data.item.loyalty_options;
        const aboutPlatinum = data.data.item.about_platinum;
  
        if (!loyaltyOptions || !aboutPlatinum || !language) {
          throw new Error('Invalid data structure or lang err');
        }
        
        const filteredData = {
          item: {
            loyalty_options: {
              ['lang']: loyaltyOptions[language] || { silver: '', gold: '', platinum: '' },
            },
            contacts: data.data.item.contacts,
            about_platinum: {
              ['lang']: aboutPlatinum[language] || { subtitle: '', title: '', text: '' },
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