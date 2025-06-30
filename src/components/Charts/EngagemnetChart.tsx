// src/components/Charts/EngagemnetChart.tsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EngagemnetChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}

const EngagemnetChart = ({ data }: EngagemnetChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
      // Add tooltip callbacks for interactivity
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y}`,
          footer: (tooltipItems: any) => {
            const total = tooltipItems[0].dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((tooltipItems[0].parsed.y / total) * 100).toFixed(1);
            return `Contribution: ${percentage}%`;
          }
        }
      }
    },
    // Use the correct easing type
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const,
    },
    scales: {
      y: {
        beginAtZero: true,
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
    // Add interactive elements
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    onHover: (event: any, chartElement: any) => {
      // Add hover effects
      if (event.native) {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      }
    },
  };

  return <Bar data={data} options={options} />;
};

export default EngagemnetChart;