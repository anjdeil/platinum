import { RootState } from '@/store';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { wpCustomRtkApi } from '../rtk-queries/wpCustomApi';
import { cartSlice } from '../slices/cartSlice';
import { languageSlice } from '../slices/languageSlice';

const DEFAULT_LOCALE = 'pl';

const cartListenerMiddleware = createListenerMiddleware();

//update cart listener
cartListenerMiddleware.startListening({
  actionCreator: cartSlice.actions.updateCart,
  effect: async (action, listenerApi) => {
    await handleCartUpdate(listenerApi);
  },
});

//clearConflict cart listener
cartListenerMiddleware.startListening({
  actionCreator: cartSlice.actions.clearConflictedItems,
  effect: async (action, listenerApi) => {
    await handleCartUpdate(listenerApi);
  },
});

//  setCurrentLanguage
cartListenerMiddleware.startListening({
  actionCreator: languageSlice.actions.setCurrentLanguage,
  effect: async (action, listenerApi) => {
    await handleCartUpdate(listenerApi);
  },
});

async function handleCartUpdate(listenerApi: any) {
  const state = listenerApi.getState() as RootState;
  const lang = state.languageSlice.code || DEFAULT_LOCALE;
  const cartItems = state.cartSlice.cartItems;
  const needsProductDataUpdate = state.cartSlice.needsProductDataUpdate;
  if (cartItems.length === 0 || !needsProductDataUpdate) {
    return;
  }

  try {
    const result = await listenerApi.dispatch(
      wpCustomRtkApi.endpoints.getProductsMinimized.initiate({
        cartItems,
        lang,
      })
    );

    if ('data' in result && result.data?.data?.items) {
      const items = result.data.data.items;

      if (Array.isArray(items)) {
        listenerApi.dispatch(cartSlice.actions.setProductsData(items));
      }
    } else {
      console.warn(
        'products spec data is missing or has an unexpected structure:',
        result
      );
    }
  } catch (error) {
    console.error('Error getting product data', error);
  }
}

export default cartListenerMiddleware;
