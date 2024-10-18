import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wpCustomRtkApi } from "./rtk-queries/wpCustomApi";
import { wooCustomRktApi } from "./rtk-queries/wooCustomApi";
import languageSlice from "./slices/languageSlice";
import currencySlice from "./slices/currencySlice";
import themeOptionsSlice from "./slices/themeOptionsSlice";
import MenuCategoriesSlice from "./slices/MenuCategoriesSlice";
import PopupSlice from "./slices/PopupSlice";

const rootReducer = combineReducers({
    [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
    [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
    languageSlice: languageSlice,
    currencySlice: currencySlice,
    themeOptions: themeOptionsSlice,
    popup: PopupSlice,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
    currentCurrency: currencySlice,
    Popup: PopupSlice,
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpCustomRtkApi.middleware)
                .concat(wooCustomRktApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];