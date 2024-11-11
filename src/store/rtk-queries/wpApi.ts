import { LoginFormType } from "@/types/components/global/forms/LoginForm";
import { JwtTokenResType } from "@/types/services/wpRestApi/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpRtkApi = createApi({
    reducerPath: "wpApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/wp" }),
    endpoints: (builder) => ({
        getToken: builder.mutation<JwtTokenResType, LoginFormType>({
            query: (credentials: LoginFormType) => ({
                url: "/jwt-auth/v1/token",
                method: "POST",
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
    })
})

export const { useGetTokenMutation } = wpRtkApi;