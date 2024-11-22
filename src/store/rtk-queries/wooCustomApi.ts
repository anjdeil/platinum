import {
  couponRespType,
  CreateOrderRequestType,
  CreateOrderResponseType,
  OrderType,
  retrieveCouponQueryType,
  WooCustomerReqType,
  WooCustomerType,
} from "@/types/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wooCustomRktApi = createApi({
  reducerPath: "wooCustomRktApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/woo" }),
  endpoints: (builder) => ({
    registerCustomer: builder.mutation<WooCustomerType, WooCustomerReqType>({
      query: (credentials: WooCustomerReqType) => ({
        url: "/customers",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchOrders: builder.query({
      query: (credentials: any) => ({
        url: "/orders",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    createOrder: builder.mutation<
      CreateOrderResponseType,
      CreateOrderRequestType
    >({
      query: (credentials) => ({
        url: `/orders`,
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    retrieveCoupon: builder.query<couponRespType, retrieveCouponQueryType>({
      query: (params: retrieveCouponQueryType) => ({
        url: `/coupons/${params.id}`,
        method: "GET",
      }),
    }),
    ListAllCoupons: builder.query<couponRespType[], void>({
      query: () => ({
        url: `/coupons`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterCustomerMutation,
  useFetchOrdersQuery,
  useCreateOrderMutation,
  useListAllCouponsQuery,
} = wooCustomRktApi;
