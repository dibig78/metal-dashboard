import { formatPercent, formatChange } from '../../utils/formatters';

interface Props {
  changeAmount?: number | null;
  changePercent?: number | null;
  decimals?: number;
}

export function ChangeIndicator({ changeAmount, changePercent, decimals = 0 }: Props) {
  const pct = changePercent ?? 0;
  const cls = pct > 0 ? 'positive' : pct < 0 ? 'negative' : 'neutral';
  const arrow = pct > 0 ? '\u25B2' : pct < 0 ? '\u25BC' : '';

  return (
    <div className={`change ${cls}`}>
      {arrow} {changeAmount != null && formatChange(changeAmount, decimals)}{' '}
      ({formatPercent(changePercent)})
    </div>
  );
}

export function Badge({ percent }: { percent: number | null }) {
  if (percent == null) return null;
  const type = percent > 1 ? 'up' : percent < -1 ? 'down' : 'flat';
  const label = percent > 1 ? '강세' : percent < -1 ? '약세' : '보합';
  return <span className={`badge ${type}`}>{label}</span>;
}
