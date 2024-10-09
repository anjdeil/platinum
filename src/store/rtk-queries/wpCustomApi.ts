import {
CustomDataCategoriesType,
CustomDataMenuResponseType,
CustomDataProductsType,
CustomDataProductType,
QueryParamsType
} from '@/types/services';
import { ThemeOptionsType } from '@/types/services/customApi/ThemeOptions';
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
        getProduct: builder.query<CustomDataProductType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/products/${params.slug}`,
                params,
            }),
        }),
        getThemeOptions: builder.query<ThemeOptionsType, void>({
            query: () => ({
                url: `/theme-options`,
            }),
        }),
    }),
});

export const {
    useGetMenusQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useGetThemeOptionsQuery,
} = wpCustomRtkApi;
