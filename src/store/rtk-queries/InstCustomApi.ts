import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MediaInfoResponse } from "@/types/services";

export const instCustomRtkApi = createApi({
  reducerPath: "instCustomRtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/inst" }),
  endpoints: (builder) => ({
    fetchPhoto: builder.query<MediaInfoResponse[], void>({
      query: () => "instagram-photos",
    }),
  }),
});

export const { useFetchPhotoQuery } = instCustomRtkApi;
