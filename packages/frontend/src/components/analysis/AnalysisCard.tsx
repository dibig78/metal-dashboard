import { AnalysisResult } from '../../types';
import { formatNumber, formatPercent, formatChange } from '../../utils/formatters';

interface Props {
  title: string;
  data: AnalysisResult;
}

export function AnalysisCard({ title, data }: Props) {
  return (
    <div className="analysis-card">
      <h3>{title}</h3>
      <div className="analysis-period">
        {data.previousPeriod} → {data.currentPeriod}
      </div>
      <table className="analysis-table">
        <thead>
          <tr>
            <th>항목</th>
            <th>이전</th>
            <th>현재</th>
            <th>변동</th>
            <th>변동률</th>
          </tr>
        </thead>
        <tbody>
          {data.changes.map(c => {
            const cls = (c.changePercent ?? 0) > 0 ? 'positive' : (c.changePercent ?? 0) < 0 ? 'negative' : 'neutral';
            const decimals = c.field === 'ag' ? 2 : c.field.startsWith('ttm') ? 1 : 0;
            return (
              <tr key={c.field}>
                <td>{c.label}</td>
                <td>{formatNumber(c.previous, decimals)}</td>
                <td>{formatNumber(c.current, decimals)}</td>
                <td className={`change ${cls}`}>{formatChange(c.change, decimals)}</td>
                <td className={`change ${cls}`}>{formatPercent(c.changePercent)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
