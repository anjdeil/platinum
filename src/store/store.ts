import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wpCustomRtkApi } from "./rtk-queries/wpCustomApi";
import currencySlice from "./slices/currencySlice";
import MenuCategoriesSlice from "./slices/MenuCategoriesSlice";
import PopupSlice from "./slices/PopupSlice";

const rootReducer = combineReducers({
    [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
    MenuCategoriesSlice: MenuCategoriesSlice.reducer,
    currentCurrency: currencySlice,
    Popup: PopupSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(wpCustomRtkApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];