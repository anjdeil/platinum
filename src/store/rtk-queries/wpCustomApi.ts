import { BlogCategoryType } from '@/types/pages/blog';
import {
  CurrenciesResponseType,
  CustomDataCategoriesType,
  CustomDataMenuResponseType,
  CustomDataPostsType,
  CustomDataProductReviewsType,
  CustomDataProductsMinimizedResponseType,
  CustomDataProductsType,
  CustomDataProductType,
  CustomDataThemeOptionsType,
  QueryParamsType,
} from '@/types/services';
import { ProductMinReq } from '@/types/store/reducers/cartSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wpCustomRtkApi = createApi({
  reducerPath: 'wpCustomRtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/wp-custom' }),
  endpoints: builder => ({
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
      keepUnusedDataFor: 60 * 60,
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
    getProductReviews: builder.query<
      CustomDataProductReviewsType,
      QueryParamsType
    >({
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
    getCurrencies: builder.query<CurrenciesResponseType, void>({
      query: () => ({
        url: `/currencies`,
      }),
    }),
    getProductsMinimized: builder.mutation<
      CustomDataProductsMinimizedResponseType,
      { cartItems: ProductMinReq[]; lang: string }
    >({
      query: ({ cartItems, lang }) => ({
        url: `/products/minimized?lang=${lang}`,
        method: 'POST',
        body: cartItems,
      }),
    }),
    getPosts: builder.query<CustomDataPostsType, QueryParamsType>({
      query: (params: QueryParamsType) => ({
        url: `/posts`,
        params,
      }),
      keepUnusedDataFor: 60 * 60,
    }),
    getPostCategory: builder.query<
      { data: { item: BlogCategoryType } },
      { slug: string; lang?: string }
    >({
      query: ({ slug, lang }) => ({
        url: `/post-categories/${slug}`,
        params: lang ? { lang } : undefined,
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
  useGetCurrenciesQuery,
  useGetProductsMinimizedMutation,
  useGetPostsQuery,
  useGetPostCategoryQuery,
} = wpCustomRtkApi;
