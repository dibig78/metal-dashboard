export interface MonthlyRow {
  id: number;
  period: string;
  sn: number | null;
  ag: number | null;
  pb: number | null;
  ni: number | null;
  cu: number | null;
  al: number | null;
  ttm_usd: number | null;
  ttm_jpy: number | null;
  sac305: number | null;
  hse16: number | null;
  hse39: number | null;
  hse11: number | null;
  s63: number | null;
  hse100: number | null;
}

export interface QuarterlyRow extends MonthlyRow {}
export interface AnnualRow extends MonthlyRow {}

export interface LatestPrice {
  id: number;
  symbol: string;
  name_ko: string;
  name_en: string;
  current_value: number | null;
  previous_value: number | null;
  change_amount: number | null;
  change_percent: number | null;
  unit: string;
  category: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string | null;
  source: string | null;
  url: string | null;
  published_at: string | null;
  category: string | null;
}

export interface MarketIssue {
  id: number;
  symbol: string;
  issue_text: string;
  severity: string;
  is_active: number;
}

export interface AnalysisChange {
  field: string;
  label: string;
  current: number | null;
  previous: number | null;
  change: number | null;
  changePercent: number | null;
}

export interface AnalysisResult {
  currentPeriod: string;
  previousPeriod: string;
  changes: AnalysisChange[];
}

export interface DashboardData {
  kpiCards: LatestPrice[];
  detailCards: Array<LatestPrice & { issues: MarketIssue[] }>;
  lastUpdated: string;
}

export interface ChartDataset {
  label: string;
  data: (number | null)[];
  borderColor: string;
  backgroundColor: string;
  yAxisID?: string;
}

export interface ChartResponse {
  labels: string[];
  datasets: ChartDataset[];
}

export const METAL_FIELDS = ['sn', 'ag', 'pb', 'ni', 'cu', 'al'] as const;
export const SOLDER_FIELDS = ['sac305', 'hse16', 'hse39', 'hse11', 's63', 'hse100'] as const;
export const EXCHANGE_FIELDS = ['ttm_usd', 'ttm_jpy'] as const;
export const ALL_FIELDS = [...METAL_FIELDS, ...EXCHANGE_FIELDS, ...SOLDER_FIELDS] as const;

export const FIELD_LABELS: Record<string, string> = {
  sn: '주석 (Sn)', ag: '은 (Ag)', pb: '납 (Pb)',
  ni: '니켈 (Ni)', cu: '구리 (Cu)', al: '알루미늄 (Al)',
  ttm_usd: 'USD/KRW', ttm_jpy: 'JPY/KRW',
  sac305: 'SAC305', hse16: 'HSE16', hse39: 'HSE39',
  hse11: 'HSE11', s63: 'S63', hse100: 'HSE100',
};
