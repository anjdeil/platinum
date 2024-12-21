import { MediaInfoResponse } from '@/types/services';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const instagramCustomRtkApi = createApi({
  reducerPath: 'instCustomRtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/instagram/getInstagramMedia' }),
  endpoints: (builder) => ({
    getInstagramMedia: builder.query<MediaInfoResponse[], void>({
      query: () => ({
        url: '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetInstagramMediaQuery } = instagramCustomRtkApi;
