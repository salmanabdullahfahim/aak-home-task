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

  const chartData = {
    labels: data?.map((entry) => entry.date) || [],
    datasets: [
      {
        label: "value",
        data: data?.map((entry) => entry.value) || [],
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-3">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        API Data Bar Chart
      </h2>
      {isLoading && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <div className="animate-pulse">
            <div className="h6 bg-gray-300 rounded mb-4 w-1/2 mx-auto">
              <div className="space-y-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                ))}
              </div>
              <div className="h-40 bg-gray-300 rounded mt-6"></div>
            </div>
          </div>
        </div>
      )}
      {error && <p>Unable to fetch data.</p>}
      {data && (
        <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-2xl">
          <Bar data={chartData} key={JSON.stringify(chartData)} />
        </div>
      )}
    </div>
  );
};

export default BarChart;
