import { createListenerMiddleware } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { cartSlice } from '../slices/cartSlice';
import { wpCustomRtkApi } from '../rtk-queries/wpCustomApi';

const cartListenerMiddleware = createListenerMiddleware();

//update cart listener
cartListenerMiddleware.startListening({
  actionCreator: cartSlice.actions.updateCart,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const cartItems = state.cartSlice.cartItems;
    const needsProductDataUpdate = state.cartSlice.needsProductDataUpdate;

    if (cartItems.length === 0 || !needsProductDataUpdate) {
      return;
    }
    try {
      const result = await listenerApi.dispatch(
        wpCustomRtkApi.endpoints.getProductsMinimized.initiate(cartItems)
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
      console.error('Error get products data', error);
    }
  },
});

//initializeCart cart listener
cartListenerMiddleware.startListening({
  actionCreator: cartSlice.actions.initializeCart,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const cartItems = state.cartSlice.cartItems;
    const needsProductDataUpdate = state.cartSlice.needsProductDataUpdate;

    if (cartItems.length === 0 || !needsProductDataUpdate) {
      return;
    }

    try {
      const result = await listenerApi.dispatch(
        wpCustomRtkApi.endpoints.getProductsMinimized.initiate(cartItems)
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
      console.error('Error get products data', error);
    }
  },
});

export default cartListenerMiddleware;
