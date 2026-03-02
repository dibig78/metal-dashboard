import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useChartData } from '../../hooks/useChartData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ChartResponse } from '../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const darkOptions = (title: string, dualAxis = false): any => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#b0bec5', font: { size: 11 } } },
    tooltip: {
      backgroundColor: '#1a3a5c',
      titleColor: '#fff',
      bodyColor: '#b0bec5',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
    },
  },
  scales: {
    x: { ticks: { color: '#78909c', maxRotation: 45 }, grid: { color: 'rgba(255,255,255,0.05)' } },
    y: { ticks: { color: '#78909c' }, grid: { color: 'rgba(255,255,255,0.05)' }, position: 'left' as const },
    ...(dualAxis ? {
      y1: { ticks: { color: '#78909c' }, grid: { display: false }, position: 'right' as const },
    } : {}),
  },
});

function ChartCard({ title, endpoint, dualAxis = false }: { title: string; endpoint: string; dualAxis?: boolean }) {
  const { data, loading } = useChartData(endpoint);

  if (loading) return <div className="chart-card"><h3>{title}</h3><LoadingSpinner /></div>;
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(ds => ({
      ...ds,
      tension: 0.3,
      pointRadius: 2,
      borderWidth: 2,
      fill: false,
    })),
  };

  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart-container">
        <Line data={chartData} options={darkOptions(title, dualAxis)} />
      </div>
    </div>
  );
}

export function ChartsTab() {
  return (
    <div className="charts-grid">
      <ChartCard title="비철금속 시세 추이" endpoint="metals" />
      <ChartCard title="환율 추이 (USD/KRW, JPY/KRW)" endpoint="exchange" dualAxis />
      <ChartCard title="은 (Ag) 시세 추이" endpoint="silver" />
      <ChartCard title="연도별 비교 (Sn vs Ag)" endpoint="yearly-comparison" dualAxis />
      <ChartCard title="SAC305 가격 추이" endpoint="sac305" />
      <ChartCard title="솔더 페이스트 가격 추이" endpoint="solder-paste" />
      <ChartCard title="HSE100 지수 추이" endpoint="hse100" />
    </div>
  );
}
