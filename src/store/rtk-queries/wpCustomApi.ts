import {
  CustomDataCategoriesType,
  CustomDataMenuResponseType,
  CustomDataProductsType,
  CustomDataProductType,
  CustomDataThemeOptionsType,
  QueryParamsType,
} from "@/types/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpCustomRtkApi = createApi({
  reducerPath: "wpCustomRtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/wp-custom" }),
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
    getThemeOptions: builder.query<CustomDataThemeOptionsType, void>({
      query: () => ({
        url: `/theme-options`,
      }),
      keepUnusedDataFor: 60 * 60,
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
