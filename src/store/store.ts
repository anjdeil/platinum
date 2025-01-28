import SwiperModal from '@/store/slices/SwiperModal';
import saveCartSliceToLocalStorageMiddleware from '@/utils/cartSlice/saveCartSliceToLocalStorageMiddleware';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactForm7Api } from './rtk-queries/contactFrom7/contactFromApi7';
import { instagramCustomRtkApi } from './rtk-queries/instagramMedia';
import { mailpoetApi } from './rtk-queries/mailpoetApi';
import { wooCustomRktApi } from './rtk-queries/wooCustomApi';
import { wooCustomAuthRktApi } from './rtk-queries/wooCustomAuthApi';
import { wpRtkApi } from './rtk-queries/wpApi';
import { wpCustomRtkApi } from './rtk-queries/wpCustomApi';
import cartSlice from './slices/cartSlice';
import categoriesSlice from './slices/categoriesSlice';
import currencySlice from './slices/currencySlice';
import languageSlice from './slices/languageSlice';
import MenuCategoriesSlice from './slices/MenuCategoriesSlice';
import PopupSlice from './slices/PopupSlice';
import ProductSlice from './slices/ProductSlice';
import themeOptionsSlice from './slices/themeOptionsSlice';
import userSlice from './slices/userSlice';
import { passwordResetApi } from './rtk-queries/passwordResetApi';
import cartListenerMiddleware from './listeners/cartSliceListener';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currencySlice'],
};

const rootReducer = combineReducers({
  [wpCustomRtkApi.reducerPath]: wpCustomRtkApi.reducer,
  [wooCustomRktApi.reducerPath]: wooCustomRktApi.reducer,
  [wpRtkApi.reducerPath]: wpRtkApi.reducer,
  [contactForm7Api.reducerPath]: contactForm7Api.reducer,
  [mailpoetApi.reducerPath]: mailpoetApi.reducer,
  [wooCustomAuthRktApi.reducerPath]: wooCustomAuthRktApi.reducer,
  [instagramCustomRtkApi.reducerPath]: instagramCustomRtkApi.reducer,
  [passwordResetApi.reducerPath]: passwordResetApi.reducer,
  cartSlice,
  languageSlice: languageSlice,
  currencySlice: currencySlice,
  categoriesSlice: categoriesSlice.reducer,
  productSlice: ProductSlice,
  userSlice: userSlice,
  themeOptions: themeOptionsSlice,
  popup: PopupSlice,
  MenuCategoriesSlice: MenuCategoriesSlice.reducer,
  swiperModal: SwiperModal,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        // Ця конфігурація запобігає помилкам перевірки серіалізованості, які можуть виникнути
        // під час використання redux-persist, забезпечуючи коректну роботу middlewares.
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(
        wpCustomRtkApi.middleware,
        wooCustomRktApi.middleware,
        wpRtkApi.middleware,
        contactForm7Api.middleware,
        saveCartSliceToLocalStorageMiddleware,
        mailpoetApi.middleware,
        wooCustomAuthRktApi.middleware,
        instagramCustomRtkApi.middleware,
        passwordResetApi.middleware,
        cartListenerMiddleware.middleware
      ),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>['store'];
export type AppDispatch = AppStore['dispatch'];
