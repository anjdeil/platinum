import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeOptionsType } from '@/types/services/customApi/ThemeOptions';
import { LangParamType } from '@/types/services';

const initialState: ThemeOptionsType = {
  success: false,
  data: {
    item: {
      loyalty_options: {
        en: {
          silver: {
            benefitsArr: [
              'Users who have purchased more than 2500 PLN within a year receive a 5% discount on their future purchases.',
              'Enjoy a complimentary welcome gift upon registration.',
              'Take advantage of ongoing discounts available exclusively to registered users.',
            ],
            id: "silver"
          },
          gold: {
            benefitsArr: [
              'Once users reach a total of 10,000 PLN in purchases within a year, they qualify for a 10% discount on all future purchases.',
              'Enjoy complimentary samples of the latest products.',
              'Receive prioritized assistance from our support team.',
              'Benefit from an ongoing discount available to Gold level users.',
            ],
            id: "gold"
          },
          platinum: {
            benefitsArr: [
              'Achieve a total of 20,000 PLN in purchases within a year to enjoy a 15% discount on all future purchases.',
              'Benefit from complimentary shipping for all orders within Poland.',
              'Receive top-tier, prioritized assistance from our support team.',
              'Get exclusive access to free samples of the latest products.',
              'Enjoy ongoing discounts exclusively available to Platinum level users.',
              'Enjoy complimentary entry to all our events and activities.',
              'Access informative and engaging training videos every year.',
            ],
            id: "platinum"
          },
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