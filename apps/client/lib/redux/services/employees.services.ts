import { createApi } from '@reduxjs/toolkit/query/react';
import { generateQueryStr } from '~/lib/utils/queryGenerator';
import baseQueryWithReauth from '../baseQueryWithReauth';

const getHeaders = () => ({
  'Content-Type': 'application/json',
});
export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allUsers'],
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: (data: any) => ({
        url: generateQueryStr(`/Employees?`, data),
        method: 'GET',
        headers: getHeaders(),
      }),
      providesTags: ['allUsers'],
    }),
    getEmployeeById: builder.query({
      query: (id: any) => ({
        url: `/Employees/${id}`,
        method: 'GET',
        headers: getHeaders(),
      }),
    }),
    searchEmployees: builder.mutation({
      query: (body: any) => ({
        url: `/Employees/Search`,
        method: 'POST',
        headers: getHeaders(),
        body,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useSearchEmployeesMutation,
} = employeesApi;
