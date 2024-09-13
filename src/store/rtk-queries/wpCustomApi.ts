import { CustomDataCategoriesType, CustomDataMenuResponseType, CustomDataProductsType, QueryParamsType } from '@/types/services/wpCustomApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wpCustomRtkApi = createApi({
    reducerPath: 'wpCustomRtkApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp-custom' }),
    endpoints: (builder) => ({
        getMenus: builder.query<CustomDataMenuResponseType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/menus`,
                params,
            }),
        }),
        getCategories: builder.query<CustomDataCategoriesType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/categories`,
                params,
            }),
        }),
        getProducts: builder.query<CustomDataProductsType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/products`,
                params,
            }),
        }),
        getProduct: builder.query<CustomDataProductsType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/products/${params.slug}`,
                params,
            }),
        }),
    }),
});

export const {
    useGetMenusQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductQuery,
} = wpCustomRtkApi;
