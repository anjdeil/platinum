import SwiperModal from '@/store/slices/SwiperModal'
import saveCartSliceToLocalStorageMiddleware from '@/utils/cartSlice/saveCartSliceToLocalStorageMiddleware'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { contactForm7Api } from './rtk-queries/contactFrom7/contactFromApi7'
import { instagramCustomRtkApi } from './rtk-queries/instagramMedia'
import { mailpoetApi } from './rtk-queries/mailpoetApi'
import { wooCustomRktApi } from './rtk-queries/wooCustomApi'
import { wooCustomAuthRktApi } from './rtk-queries/wooCustomAuthApi'
import { wpRtkApi } from './rtk-queries/wpApi'
import { wpCustomRtkApi } from './rtk-queries/wpCustomApi'
import cartSlice from './slices/cartSlice'
import currencySlice from './slices/currencySlice'
import languageSlice from './slices/languageSlice'
import MenuCategoriesSlice from './slices/MenuCategoriesSlice'
import PopupSlice from './slices/PopupSlice'
import ProductSlice from './slices/ProductSlice'
import themeOptionsSlice from './slices/themeOptionsSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
  [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
  [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
  [wpRtkApi.reducerPath]: wpRtkApi.reducer,
  [contactForm7Api.reducerPath]: contactForm7Api.reducer,
  [mailpoetApi.reducerPath]: mailpoetApi.reducer,
  [wooCustomAuthRktApi.reducerPath]: wooCustomAuthRktApi.reducer,
  [instagramCustomRtkApi.reducerPath]: instagramCustomRtkApi.reducer,
  cartSlice,
  languageSlice: languageSlice,
  currencySlice: currencySlice,
  productSlice: ProductSlice,
  userSlice: userSlice,
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
        .concat(wooCustomAuthRktApi.middleware)
        .concat(instagramCustomRtkApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
