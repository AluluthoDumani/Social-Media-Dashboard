import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FollowerChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
      fill: boolean;
    }[];
  };
}

const FollowerChart = ({ data }: FollowerChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const,
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.1)',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        shadowBlur: 10,
        shadowColor: 'rgba(255, 255, 255, 0.5)',
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        shadowBlur: 5,
        shadowColor: 'rgba(255, 255, 255, 0.8)',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default FollowerChart;