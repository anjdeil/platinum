import {
  SubscriberRequest,
  SubscriberResponse,
  UnsubscribeResponse,
} from '@/types/store/rtk-queries/mailpoet';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mailpoetApi = createApi({
  reducerPath: 'mailpoetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    subscribe: builder.mutation<SubscriberResponse, SubscriberRequest>({
      query: body => ({
        url: '/mailpoet/subscribe',
        method: 'POST',
        body,
      }),
    }),

    unsubscribe: builder.mutation<UnsubscribeResponse, SubscriberRequest>({
      query: body => ({
        url: '/mailpoet/unsubscribe',
        method: 'POST',
        body,
      }),
    }),

    getSubscriber: builder.query<SubscriberResponse, SubscriberRequest>({
      query: body => ({
        url: `/mailpoet/get-subscriber`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSubscribeMutation,
  useUnsubscribeMutation,
  useGetSubscriberQuery,
} = mailpoetApi;
