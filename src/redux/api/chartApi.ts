import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TResult } from "../../types";

export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://django-dev.aakscience.com/candidate_test/fronted",
  }),
  endpoints: (builder) => ({
    getChartData: builder.query<any, void>({
      query: () => "",
      transformResponse: (response: any) => {
        const result: TResult[] = [];
        response[0]?.["2024"].forEach((month: any) => {
          Object.values(month).forEach((entries: any) => {
            entries.forEach((entry: any) => {
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
