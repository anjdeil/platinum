import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
  name: string;
  code: string;
}

export const languageSymbols: LanguageState[] = [
  { name: 'EN', code: 'en' },
  { name: 'PL', code: 'pl' },
  { name: 'DE', code: 'de' },
  { name: 'РУ', code: 'ru' },
  { name: 'УК', code: 'uk' },
];

const initialState: LanguageState = {
  name: 'EN',
  code: 'en',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<{ name: string }>) => {
      const name = action.payload.name;
      const language = languageSymbols.find(lang => lang.name === name);

      if (language) {
        state.name = language.name;
        state.code = language.code;
      } else {
        console.error(`Language code "${name}" not recognized.`);
      }
    },
  },
});

export const { setCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
