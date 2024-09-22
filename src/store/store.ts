import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wpCustomRtkApi } from "./rtk-queries/wpCustomApi";
import currencySlice from "./slices/currencySlice";
import { wooCustomRktApi } from "./rtk-queries/wooCustomApi";

const rootReducer = combineReducers({
    [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
    [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
    currentCurrency: currencySlice,
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