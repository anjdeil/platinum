import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LanguageState {
    code: string;
    symbol: string;
}

export const languageSymbols: LanguageState[] = [
    { code: 'English', symbol: 'En' },
    { code: 'Polish', symbol: 'Pl' },
    { code: 'Ukraine', symbol: 'Ua' },
    { code: 'Russian', symbol: 'Ru' },
    { code: 'German', symbol: 'De' },
];

const initialState: LanguageState = {
    code: 'English',
    symbol: 'En',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setCurrentLanguage: (state, action: PayloadAction<{ code: string }>) => {
            const code = action.payload.code;
            const language = languageSymbols.find((lang) => lang.code === code);

            if (language) {
                state.code = language.code;
                state.symbol = language.symbol;
            } else {
                console.error(`Language code "${code}" not recognized.`);
            }
        },
    },
});

export const { setCurrentLanguage } = languageSlice.actions;
export default languageSlice.reducer;
