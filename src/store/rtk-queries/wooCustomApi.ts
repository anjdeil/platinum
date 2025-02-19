import {
  ShippingLocationType,
  ShippingMethodType,
  ShippingZoneType,
  WooCustomerUpdateReqType,
} from '@/types/services';
import {
  couponRespType,
  CreateOrderRequestType,
  OrderType,
  retrieveCouponQueryType,
  reviewQueryType,
  ReviewsRespType,
  WooCustomerReqType,
  WooCustomerType,
} from '@/types/services/wooCustomApi/customer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wooCustomRktApi = createApi({
  reducerPath: 'wooCustomRktApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/woo' }),
  endpoints: builder => ({
    registerCustomer: builder.mutation<WooCustomerType, WooCustomerReqType>({
      query: (credentials: WooCustomerReqType) => ({
        url: '/customers',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchOrders: builder.query({
      query: (params: any) => ({
        url: `/orders?${new URLSearchParams(params).toString()}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    createOrder: builder.mutation<OrderType, CreateOrderRequestType>({
      query: credentials => ({
        url: `/orders`,
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    fetchCustomer: builder.query<WooCustomerType, { customerId: string }>({
      query: ({ customerId }) => ({
        url: `/customers/${customerId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateCustomer: builder.mutation<WooCustomerType, WooCustomerUpdateReqType>(
      {
        query: (credentials: WooCustomerUpdateReqType) => ({
          url: `/customers/${credentials.id}`,
          method: 'PUT',
          body: credentials,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      }
    ),
    retrieveCoupon: builder.query<couponRespType, retrieveCouponQueryType>({
      query: (params: retrieveCouponQueryType) => ({
        url: `/coupons/${params.id}`,
        method: 'GET',
      }),
    }),
    ListAllCoupons: builder.query<couponRespType[], void>({
      query: () => ({
        url: `/coupons`,
        method: 'GET',
      }),
    }),
    addComment: builder.mutation({
      query: (credentials: any) => ({
        url: '/products/reviews',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getProductsReviews: builder.query<
      ReviewsRespType,
      { orderby?: string; order?: string }
    >({
      query: ({ orderby = 'date', order = 'desc' }) => ({
        url: `/products/reviews`,
        method: 'GET',
        params: {
          orderby,
          order,
        },
      }),
    }),

    getProductReviews: builder.query<ReviewsRespType, reviewQueryType>({
      query: ({ product }) => ({
        url: `/products/reviews/`,
        method: 'GET',
        params: { product },
      }),
    }),
    getShippingZones: builder.query<ShippingZoneType[], void>({
      query: () => ({
        url: `/shipping/zones`,
        method: 'GET',
      }),
    }),
    getShippingZoneMethods: builder.query<ShippingMethodType[], number>({
      query: (zoneId: number) => ({
        url: `/shipping/zones/${zoneId}/methods`,
        method: 'GET',
      }),
    }),
    getShippingZoneLocations: builder.query<ShippingLocationType[], number>({
      query: (zoneId: number) => ({
        url: `/shipping/zones/${zoneId}/locations`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useFetchOrdersQuery,
  useCreateOrderMutation,
  useListAllCouponsQuery,
  useAddCommentMutation,
  useGetProductsReviewsQuery,
  useGetProductReviewsQuery,
  useFetchCustomerQuery,
  useUpdateCustomerMutation,
  useGetShippingZonesQuery,
  useLazyGetShippingZoneMethodsQuery,
  useLazyGetShippingZoneLocationsQuery,
} = wooCustomRktApi;
