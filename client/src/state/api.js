import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REATC_APP_BASE_URL}),
  reducerPath: "adminApi",
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"]
    }),
    
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["products"]

    }),
  })
})  

export const { useGetUserQuery, useGetProductsQuery } = api