import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const wpApiRtkApi = createApi({
    reducerPath: "wpApiRtkApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/wp" }),
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: (params) => ({
                url: `/product`,
                params,
            })
        })
    })
})