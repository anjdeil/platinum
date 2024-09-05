import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wpCustomRtkApi = createApi({
    reducerPath: 'wpCustomRtkApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp-custom' }),
    endpoints: (builder) => ({
        getMenus: builder.query<any, any>({
            query: (params) => ({
                url: `/menus`,
                params,
            }),
        }),
        getCategories: builder.query<any, any>({
            query: (params) => ({
                url: `/categories`,
                params,
            }),
        }),
    }),
});

export const {
    useGetMenusQuery,
    useGetCategoriesQuery,
} = wpCustomRtkApi;
