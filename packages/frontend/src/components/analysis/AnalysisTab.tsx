import { useAnalysis } from '../../hooks/useAnalysis';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorBanner } from '../common/ErrorBanner';
import { AnalysisCard } from './AnalysisCard';

export function AnalysisTab() {
  const { qoq, yoy, mom, loading, error } = useAnalysis();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="analysis-grid">
      {qoq && <AnalysisCard title="분기별 증감" data={qoq} />}
      {yoy && <AnalysisCard title="연간 비교" data={yoy} />}
      {mom && <AnalysisCard title="월별 증감" data={mom} />}
    </div>
  );
}
