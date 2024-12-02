import {
  CreateOrderRequestType,
  CreateOrderResponseType,
  WooCustomerReqType,
  WooCustomerType
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
      query: (params: any) => ({
        url: `/orders?${new URLSearchParams(params).toString()}`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
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
    addComment: builder.mutation({
      query: (credentials: any) => ({
        url: "/products/reviews",
        method: "POST",
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        }
      })
    })
  }),
});

export const {
  useRegisterCustomerMutation,
  useFetchOrdersQuery,
  useCreateOrderMutation,
  useAddCommentMutation,
} = wooCustomRktApi;
