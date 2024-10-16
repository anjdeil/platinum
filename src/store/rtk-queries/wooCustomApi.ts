import { OrderType, WooCustomerReqType, WooCustomerType } from "@/types/services";
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
        })
    })
})

export const { useRegisterCustomerMutation, useFetchOrdersQuery } = wooCustomRktApi;