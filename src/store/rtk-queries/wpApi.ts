import { LoginFormType } from "@/types/components/global/forms/LoginForm";
import { JwtTokenResponseType } from "@/types/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpRtkApi = createApi({
  reducerPath: "wpApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/wp" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getToken: builder.mutation<JwtTokenResponseType, LoginFormType>({
      query: (credentials: LoginFormType) => ({
        url: "/jwt-auth/v1/token",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchUserData: builder.query({
      // by ID
      query: ({ /* accessToken, */ id }) => ({
        url: `/users/${id}`,
        /*  headers: {
                Authorization: `Bearer ${accessToken}`,
              }, */
      }),
      providesTags: ["User"],
    }),
    fetchUserUpdate: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: "/users/me",
        method: "PUT",
        body: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["User"],
    }),

    fetchUserUpdateById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetTokenMutation,
  useLazyFetchUserDataQuery,
  useFetchUserUpdateByIdMutation,
} = wpRtkApi;
