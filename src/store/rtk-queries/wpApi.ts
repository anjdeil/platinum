import { LoginFormType } from '@/types/components/global/forms/LoginForm';
import { JwtTokenResponseType } from '@/types/services';
import { WpUserType } from '@/types/store/rtk-queries/wpApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AuthConfigType,
  JwtTokenResType,
} from '@/types/services/wpRestApi/auth';

export const wpRtkApi = createApi({
  reducerPath: 'wpApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/wp' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getToken: builder.mutation<JwtTokenResponseType, AuthConfigType>({
      query: (credentials: AuthConfigType) => ({
        url: '/jwt-auth/v1/token',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    checkToken: builder.mutation({
      query: () => ({
        url: '/jwt-auth/v1/token/validate',
        method: 'POST',
      }),
    }),

    fetchUserDataById: builder.query<WpUserType, { id: number }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['User'],
    }),
    fetchUserData: builder.query<
      WpUserType,
      { accessToken: string; id: number }
    >({
      query: ({ accessToken }) => ({
        url: `/users/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: ['User'],
    }),
    fetchUserUpdate: builder.mutation({
      query: ({ accessToken, body }) => ({
        url: '/users/me',
        method: 'PUT',
        body: body,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ['User'],
    }),

    fetchUserUpdateById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetTokenMutation,
  useLazyFetchUserDataByIdQuery,
  useLazyFetchUserDataQuery,
  useFetchUserUpdateMutation,
  useFetchUserUpdateByIdMutation,
  useCheckTokenMutation,
} = wpRtkApi;
