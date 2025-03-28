import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WpUserType } from '@/types/store/rtk-queries/wpApi';
import { JwtTokenResponseType } from '@/types/services';
import { AuthConfigType } from '@/types/services/wpRestApi/auth';

const getAuthTokenFromCookie = (cookies: string) => {
  const match = cookies.match(/authToken=([^;]+)/);
  return match ? match[1] : null;
};

export const wpRtkApi = createApi({
  reducerPath: 'wpApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/wp',
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getToken: builder.mutation<JwtTokenResponseType, AuthConfigType>({
      query: credentials => ({
        url: '/jwt-auth/v1/token',
        method: 'POST',
        body: {
          username: credentials.username,
          password: credentials.password,
          rememberMe: credentials.rememberMe,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    checkToken: builder.mutation({
      query: (rememberMe: boolean) => ({
        url: '/jwt-auth/v1/token/validate',
        method: 'POST',
        body: { rememberMe },
      }),
    }),

    fetchUserData: builder.query<WpUserType, string | void>({
      query: () => ({
        url: '/users/me',
        prepareHeaders: (headers: any) => {
          const token = getAuthTokenFromCookie(document.cookie);
          if (token) {
            headers.set('Cookie', `authToken=${token}`);
          }
          return headers;
        },
      }),
      providesTags: ['User'],
    }),
    fetchUserUpdate: builder.mutation({
      query: body => ({
        url: '/users/me',
        method: 'PUT',
        body: body,
        prepareHeaders: (headers: any) => {
          const token = getAuthTokenFromCookie(document.cookie);
          if (token) {
            headers.set('Cookie', `authToken=${token}`);
          }
          return headers;
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetTokenMutation,
  useCheckTokenMutation,
  useLazyFetchUserDataQuery,
  useFetchUserUpdateMutation,
} = wpRtkApi;
