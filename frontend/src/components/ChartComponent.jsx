import { useMemo } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as Chartjs,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({
  dataArray,
  labelKey = "label",
  valueKey = "value",
  chartLabel = "Chart Data",
}) => {
  if (!dataArray.length || dataArray === 0) return <p>No data available</p>;

  const chartColor = useMemo(() => {
    const values = dataArray.map((item) => Number(item[valueKey] ?? 0));

    return {
      backgroundColor: values.map(
        () =>
          `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255
          )}, ${Math.floor(Math.random() * 255)}, 0.6)`
      ),
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
    };
  }, [dataArray.length, valueKey]);

  const chartData = useMemo(() => {
    const labels = dataArray.map((item) => item[labelKey]);
    const values = dataArray.map((item) => Number(item[valueKey] ?? 0));

    return {
      labels,
      datasets: [
        {
          label: chartLabel,
          data: values,
          ...chartColor,
        },
      ],
    };
  }, [dataArray, labelKey, valueKey, chartLabel, chartColor]);

  const ChartCalculator = useMemo(() => {
    if (dataArray.length > 10) {
      return Line;
    } else if (dataArray.length <= 5) {
      return Pie;
    } else {
      return Bar;
    }
  }, [dataArray.length]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: chartLabel },
    },
    animation: {
      duration: 500,
    },
  };

  return (
    <ChartCalculator data={chartData} options={options} color={chartColor} />
  );
};

export default ChartComponent;
