import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wooCommerceApi = createApi({
    reducerPath: 'wooCommerceApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/woo' }),
    endpoints: (builder) => ({
        fetchOrders: builder.query({
            query: (params) => ({
                url: `/orders/`,
                params
            })
        })
    })
})


export const {
    useFetchOrdersQuery,
} = wooCommerceApi;