import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const passwordResetApi = createApi({
  reducerPath: 'passwordResetApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/password' }),
  endpoints: build => ({
    resetPassword: build.mutation<void, { email: string }>({
      query: body => ({
        url: '/reset-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    setPassword: build.mutation<
      void,
      { email: string; password: string; code: string }
    >({
      query: body => ({
        url: '/set-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    validateCode: build.mutation<void, { email: string; code: string }>({
      query: body => ({
        url: '/validate-code',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    changePassword: build.mutation<
      void,
      { userId: string; password: string; token: string }
    >({
      query: ({ userId, password, token }) => ({
        url: '/change-password',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: { user_id: userId, password },
      }),
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useSetPasswordMutation,
  useValidateCodeMutation,
  useChangePasswordMutation,
} = passwordResetApi;
