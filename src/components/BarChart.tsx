import React from "react";
import { useGetChartDataQuery } from "../redux/api/chartApi";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import SkeletonLoader from "./SkeletonLoader";
import { options } from "../utils/BarOptions";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const { data, error, isLoading } = useGetChartDataQuery();

  // map the data
  const chartData = {
    labels: data?.map((entry) => entry.date) || [],
    datasets: [
      {
        label: "Value",
        data: data?.map((entry) => entry.value) || [],
        backgroundColor: [
          "#0066CC",
          "#63993D",
          "#00959a",
          "#5E40BE",
          "#f4c142",
          "#ec7a08",
        ],
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-9 text-gray-200">
        API Data Bar Chart
      </h1>

      <div className=" rounded-lg p-6 w-full max-w-2xl">
        {isLoading && <SkeletonLoader />}
        {error && <p className="text-red-500">Error: Unable to fetch data</p>}

        {/* Mani Bar Chart */}
        {data && (
          <Bar
            data={chartData}
            key={JSON.stringify(chartData)}
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default BarChart;
