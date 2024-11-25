import SwiperModal from "@/store/slices/SwiperModal";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wooCustomRktApi } from "./rtk-queries/wooCustomApi";
import { wpCustomRtkApi } from "./rtk-queries/wpCustomApi";
import currencySlice from "./slices/currencySlice";
import languageSlice from "./slices/languageSlice";
import MenuCategoriesSlice from "./slices/MenuCategoriesSlice";
import PopupSlice from "./slices/PopupSlice";
import { wpRtkApi } from "./rtk-queries/wpApi";
import themeOptionsSlice from "./slices/themeOptionsSlice";
import { wooCustomAuthRktApi } from "./rtk-queries/wooCustomAuthApi";

const rootReducer = combineReducers({
    [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
    [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
    [wooCustomAuthRktApi.reducerPath]: wooCustomAuthRktApi.reducer,
    [wpRtkApi.reducerPath]: wpRtkApi.reducer,
    languageSlice: languageSlice,
    currencySlice: currencySlice,
    themeOptions: themeOptionsSlice,
    popup: PopupSlice,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
    currentCurrency: currencySlice,
    Popup: PopupSlice,
    swiperModal: SwiperModal
});

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpCustomRtkApi.middleware)
                .concat(wooCustomRktApi.middleware)
                .concat(wooCustomAuthRktApi.middleware)
                .concat(wpRtkApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];