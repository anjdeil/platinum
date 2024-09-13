import { CustomDataType, QueryParamsType } from '@/types/services/wpCustomApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wpCustomRtkApi = createApi({
    reducerPath: 'wpCustomRtkApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp-custom' }),
    endpoints: (builder) => ({
        getMenus: builder.query<CustomDataType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/menus`,
                params,
            }),
        }),
        getCategories: builder.query<CustomDataType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/categories`,
                params,
            }),
        }),
        getProduct: builder.query<CustomDataType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/products`,
                params,
            }),
        }),
    }),
});

export const {
    useGetMenusQuery,
    useGetCategoriesQuery,
    useGetProductQuery,
} = wpCustomRtkApi;
