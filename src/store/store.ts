import ProductSlice from "@/store/slices/ProductSlice";
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
import cartSlice from "./slices/cartSlice";
import saveCartSliceToLocalStorageMiddleware from "@/utils/cartSlice/saveCartSliceToLocalStorageMiddleware";
import { contactForm7Api } from "./rtk-queries/contactFrom7/contactFromApi7";
import { mailpoetApi } from "./rtk-queries/mailpoetApi";
import { instCustomRtkApi } from "./rtk-queries/instagram/InstCustomApi";

const rootReducer = combineReducers({
  [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
  [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
  [wpRtkApi.reducerPath]: wpRtkApi.reducer,
  [contactForm7Api.reducerPath]: contactForm7Api.reducer,
  [mailpoetApi.reducerPath]: mailpoetApi.reducer,
  [instCustomRtkApi.reducerPath]: instCustomRtkApi.reducer,
  cartSlice,
  languageSlice: languageSlice,
  currencySlice: currencySlice,
  themeOptions: themeOptionsSlice,
  popup: PopupSlice,
  MenuCategoriesSlice: MenuCategoriesSlice.reducer,
  currentCurrency: currencySlice,
  Popup: PopupSlice,
  swiperModal: SwiperModal,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(wpCustomRtkApi.middleware)
        .concat(wooCustomRktApi.middleware)
        .concat(wpRtkApi.middleware)
        .concat(contactForm7Api.middleware)
        .concat(saveCartSliceToLocalStorageMiddleware)
        .concat(mailpoetApi.middleware)
        .concat(instCustomRtkApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
