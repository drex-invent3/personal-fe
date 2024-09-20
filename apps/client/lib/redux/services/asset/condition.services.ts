import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const conditionApi = createApi({
  reducerPath: 'conditionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCondition'],
  endpoints: (builder) => ({
    getAllAssetCondition: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/AssetConditions?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allCondition'],
    }),
    searchCondition: builder.mutation({
      query: (body: any) => ({
        url: `/AssetConditions/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const { useGetAllAssetConditionQuery, useSearchConditionMutation } =
  conditionApi;
