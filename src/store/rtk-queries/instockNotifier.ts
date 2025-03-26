import {
  ProductNotifierReqDataType,
  ProductNotifierRespDataType,
} from '@/types/store/rtk-queries/instockNotifier';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const instockNotifierAPI = createApi({
  reducerPath: 'instockNotifierAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    subscribe: builder.mutation<
      ProductNotifierRespDataType,
      ProductNotifierReqDataType
    >({
      query: body => ({
        url: '/instockNotifier/subscribe',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = instockNotifierAPI;
