import {
    CustomDataCategoriesType,
    CustomDataMenuResponseType,
    CustomDataProductReviewsType,
    CustomDataProductsMinimizedResponseType,
    CustomDataProductsType,
    CustomDataProductType,
    CustomDataThemeOptionsType,
    QueryParamsType
} from '@/types/services';
import { CartItem } from '@/types/store/reducers/сartSlice';
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
        getProductReviews: builder.query<CustomDataProductReviewsType, QueryParamsType>({
            query: (params: QueryParamsType) => ({
                url: `/products/reviews/${params.slug}`,
                params,
            }),
        }),
        getThemeOptions: builder.query<CustomDataThemeOptionsType, void>({
            query: () => ({
                url: `/theme-options`,
            }),
        }),
        getProductsMinimized: builder.mutation<CustomDataProductsMinimizedResponseType, CartItem[]>({
            query: (cartItems) => ({
                url: `/products/minimized`,
                method: 'POST',
                body: cartItems,
            }),
        }),
    }),
});

export const {
    useGetMenusQuery,
    useGetCategoriesQuery,
    useGetProductsQuery,
    useGetProductQuery,
    useGetProductReviewsQuery,
    useGetThemeOptionsQuery,
    useGetProductsMinimizedMutation
} = wpCustomRtkApi;
