export interface LatestPrice {
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

export interface MarketIssue {
  symbol: string;
  issue_text: string;
  severity: string;
}

export interface DetailCard extends LatestPrice {
  issues: MarketIssue[];
}

export interface DashboardData {
  kpiCards: LatestPrice[];
  detailCards: DetailCard[];
  lastUpdated: string;
}

export interface MonthlyRow {
  period: string;
  sn: number | null; ag: number | null; pb: number | null;
  ni: number | null; cu: number | null; al: number | null;
  ttm_usd: number | null; ttm_jpy: number | null;
  sac305: number | null; hse16: number | null; hse39: number | null;
  hse11: number | null; s63: number | null; hse100: number | null;
}

export interface QuarterlyRow extends MonthlyRow {}
export interface AnnualRow extends MonthlyRow {}

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

export interface NewsArticle {
  id: number;
  title: string;
  summary: string | null;
  source: string | null;
  url: string | null;
  published_at: string | null;
  category: string | null;
}
