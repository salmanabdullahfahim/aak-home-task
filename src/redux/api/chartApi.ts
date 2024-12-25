import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TApiResponse, TResult } from "../../types";

export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://django-dev.aakscience.com/candidate_test/fronted",
  }),
  endpoints: (builder) => ({
    getChartData: builder.query<TResult[], void>({
      query: () => "",
      transformResponse: (response: TApiResponse) => {
        const result: TResult[] = [];
        response[0]?.["2024"].forEach((month) => {
          Object.values(month).forEach((entries) => {
            entries.forEach((entry) => {
              const [date, value] = Object.entries(entry)[0];
              result.push({ date: date.split(",")[0], value });
            });
          });
        });

        return result;
      },
    }),
  }),
});

export const { useGetChartDataQuery } = chartApi;
