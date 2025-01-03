import {
  WooCustomerReqType,
  WooCustomerType,
  WooCustomerUpdateType,
} from '@/types/services/wooCustomApi/customer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wooCustomAuthRktApi = createApi({
  reducerPath: 'wooCustomAuthRktApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/wooAuth' }),
  endpoints: builder => ({
    updateCustomerInfo: builder.mutation<
      WooCustomerType,
      WooCustomerUpdateType
    >({
      query: (credentials: WooCustomerUpdateType) => ({
        url: `/customers`,
        method: 'PUT',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchCustomerInfo: builder.query<WooCustomerReqType, void>({
      query: () => ({
        url: `/customers`,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useFetchCustomerInfoQuery,
  useLazyFetchCustomerInfoQuery,
  useUpdateCustomerInfoMutation,
} = wooCustomAuthRktApi;
