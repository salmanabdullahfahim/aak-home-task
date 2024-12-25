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
  console.log(data);
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        API Data Bar Chart
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {isLoading && <SkeletonLoader />}
        {error && <p className="text-red-500">Error: Unable to fetch data</p>}

        {data && <Bar data={chartData} key={JSON.stringify(chartData)} />}
      </div>
    </div>
  );
};

export default BarChart;
