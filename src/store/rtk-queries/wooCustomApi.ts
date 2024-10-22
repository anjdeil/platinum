import { OrderType, WooCustomerReqType, WooCustomerType, WooCustomerUpdateReqType } from "@/types/services";
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
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchOrders: builder.query({
            query: (credentials: any) => ({
                url: "/orders",
                method: "POST",
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        fetchCustomer: builder.query<WooCustomerType, { customerId: string }>({
            query: ({ customerId }) => ({
                url: `/customers/${customerId}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        updateCustomer: builder.mutation<WooCustomerType, WooCustomerUpdateReqType>({
            query: (credentials: WooCustomerUpdateReqType) => ({
                url: `/customers/${credentials.id}`,
                method: "PUT",
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
    })
})

export const { useRegisterCustomerMutation, useFetchOrdersQuery, useFetchCustomerQuery, useUpdateCustomerMutation} = wooCustomRktApi;