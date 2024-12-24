import React from "react";
import { useGetChartDataQuery } from "../redux/api/chartApi";
import { Bar } from "react-chartjs-2";

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
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default BarChart;
