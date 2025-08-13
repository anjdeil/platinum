import { SubscriberActionResponse, SubscriberGetRequest, SubscriberListResponse, SubscriberRequest } from '@/types/store/rtk-queries/mailster';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mailsterApi = createApi({
  reducerPath: 'mailsterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/mailster/v1`
  }),
  endpoints: builder => ({
    subscribe: builder.mutation<SubscriberActionResponse, SubscriberRequest>({
      query: body => ({
        url: '/subscribe',
        method: 'POST',
        body,
      }),
    }),

    unsubscribe: builder.mutation<SubscriberActionResponse, SubscriberRequest>({
      query: body => ({
        url: '/unsubscribe',
        method: 'POST',
        body,
      }),
    }),

    changeSubscriptionMail: builder.mutation<SubscriberActionResponse, SubscriberRequest>({
      query: body => ({
        url: '/unsubscribe',
        method: 'POST',
        body,
      }),
    }),

    getSubscriber: builder.query<SubscriberListResponse, SubscriberGetRequest>({
      query: body => ({
        url: `/get-subscriber`,
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
} = mailsterApi;
