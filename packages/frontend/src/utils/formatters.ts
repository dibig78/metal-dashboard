export function formatNumber(value: number | null | undefined, decimals = 0): string {
  if (value == null) return '-';
  return value.toLocaleString('ko-KR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number | null | undefined): string {
  if (value == null) return '-';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatChange(value: number | null | undefined, decimals = 0): string {
  if (value == null) return '-';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${formatNumber(value, decimals)}`;
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
