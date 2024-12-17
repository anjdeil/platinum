import { AuthConfigType, JwtTokenResType } from "@/types/services/wpRestApi/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpRtkApi = createApi({
    reducerPath: "wpApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/wp" }),
    endpoints: (builder) => ({
        getToken: builder.mutation<JwtTokenResType, AuthConfigType>({
            query: (credentials: AuthConfigType) => ({
                url: "/jwt-auth/v1/token",
                method: "POST",
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
        checkToken: builder.mutation({
            query: () => ({
                url: "/jwt-auth/v1/token/validate",
                method: "POST"
            })
        })
    })
})

export const { useGetTokenMutation, useCheckTokenMutation } = wpRtkApi;