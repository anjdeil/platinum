import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export const mailpoetApi = createApi({
  reducerPath: 'mailpoetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/mailpoet/subscribe' }),
  endpoints: (builder) => ({
    subscribe: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = mailpoetApi;
