import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../../baseQueryWithReauth';
import {
  BaseApiResponse,
  ListResponse,
  QueryParams,
  SearchQuery,
} from '@repo/interfaces';
import {
  Facility,
  LocationQueryParams,
} from '~/lib/interfaces/location.interfaces';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const facilityApi = createApi({
  reducerPath: 'facilityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allFacilities', 'facilitiesByLGAId'],
  endpoints: (builder) => ({
    getAllFacilities: builder.query<
      BaseApiResponse<ListResponse<Facility>>,
      QueryParams
    >({
      query: (data) => ({
        url: generateQueryStr(`/Facilities?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allFacilities'],
    }),
    getFacilitiesByLGAId: builder.query<
      BaseApiResponse<ListResponse<Facility>>,
      LocationQueryParams
    >({
      query: ({ id, ...data }) => ({
        url: generateQueryStr(`/Facilities/GetFacilitiesByLGAId/${id}?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['facilitiesByLGAId'],
    }),
    createFacility: builder.mutation<
      BaseApiResponse<Facility>,
      {
        lgaId: number | undefined;
        facilityName: string;
        facilityRef: string;
        address: string;
        longitude: number;
        latitude: number;
        createdBy: string | undefined;
      }
    >({
      query: (body) => ({
        url: `/Facilities`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
      invalidatesTags: ['allFacilities', 'facilitiesByLGAId'],
    }),
    searchFacilities: builder.mutation<
      BaseApiResponse<ListResponse<Facility>>,
      SearchQuery
    >({
      query: (body) => ({
        url: `/Facilities/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetAllFacilitiesQuery,
  useGetFacilitiesByLGAIdQuery,
  useSearchFacilitiesMutation,
} = facilityApi;
