import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface InstagramPost {
  id: string;
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

export const instCustomRtkApi = createApi({
  reducerPath: "instCustomRtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/instagram/getInstaPosts" }),
  endpoints: (builder) => ({
    getInstaPosts: builder.query<InstagramPost[], void>({
      query: () => ({
        url: "posts",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetInstaPostsQuery } = instCustomRtkApi;
