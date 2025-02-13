import { UserTotalsType } from '@/types/services/userTotals';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_WP_URL
  ? `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/v1/`
  : '';

export const userTotals = createApi({
  reducerPath: 'userTotals',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getUserTotals: build.query<UserTotalsType, number | undefined>({
      query: (userId) => `user-totals/${userId}`,
    }),
  }),
});

export const { useGetUserTotalsQuery } = userTotals;
