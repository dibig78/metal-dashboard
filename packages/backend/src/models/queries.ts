import { getDb } from '../config/database';
import {
  MonthlyRow, QuarterlyRow, AnnualRow,
  LatestPrice, NewsArticle, MarketIssue,
  AnalysisResult, AnalysisChange,
  FIELD_LABELS, ALL_FIELDS
} from './types';

function rowsFromResult(result: any[]): any[] {
  if (!result || result.length === 0) return [];
  const columns = result[0].columns as string[];
  const values = result[0].values as any[][];
  return values.map(row => {
    const obj: any = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

export async function getMonthlyData(): Promise<MonthlyRow[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM monthly_data ORDER BY period ASC');
  return rowsFromResult(result) as MonthlyRow[];
}

export async function getQuarterlyData(): Promise<QuarterlyRow[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM quarterly_data ORDER BY period ASC');
  return rowsFromResult(result) as QuarterlyRow[];
}

export async function getAnnualData(): Promise<AnnualRow[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM annual_data ORDER BY period ASC');
  return rowsFromResult(result) as AnnualRow[];
}

export async function getLatestPrices(): Promise<LatestPrice[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM latest_prices ORDER BY category, symbol');
  return rowsFromResult(result) as LatestPrice[];
}

export async function getNews(): Promise<NewsArticle[]> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM news ORDER BY published_at DESC LIMIT 20');
  return rowsFromResult(result) as NewsArticle[];
}

export async function getMarketIssues(symbol?: string): Promise<MarketIssue[]> {
  const db = await getDb();
  const sql = symbol
    ? `SELECT * FROM market_issues WHERE symbol = '${symbol}' AND is_active = 1`
    : 'SELECT * FROM market_issues WHERE is_active = 1';
  const result = db.exec(sql);
  return rowsFromResult(result) as MarketIssue[];
}

function computeChanges(current: any, previous: any, fields: readonly string[]): AnalysisChange[] {
  return fields.map(field => {
    const cur = current[field] as number | null;
    const prev = previous[field] as number | null;
    const change = (cur != null && prev != null) ? cur - prev : null;
    const changePercent = (change != null && prev != null && prev !== 0)
      ? (change / prev) * 100 : null;
    return {
      field,
      label: FIELD_LABELS[field] || field,
      current: cur,
      previous: prev,
      change,
      changePercent,
    };
  });
}

export async function getQoQAnalysis(): Promise<AnalysisResult | null> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM quarterly_data ORDER BY period DESC LIMIT 2');
  const rows = rowsFromResult(result);
  if (rows.length < 2) return null;
  const [current, previous] = rows;
  return {
    currentPeriod: current.period,
    previousPeriod: previous.period,
    changes: computeChanges(current, previous, ALL_FIELDS),
  };
}

export async function getYoYAnalysis(): Promise<AnalysisResult | null> {
  const monthly = await getMonthlyData();
  if (monthly.length < 2) return null;

  const latest = monthly[monthly.length - 1];
  const latestDate = latest.period; // e.g., '2026-02'
  const [latestYear, latestMonth] = latestDate.split('-').map(Number);
  const prevYear = latestYear - 1;

  // Get same months from current and previous year
  const currentYearMonths = monthly.filter(m => {
    const [y] = m.period.split('-').map(Number);
    return y === latestYear;
  });
  const prevYearMonths = monthly.filter(m => {
    const [y, mo] = m.period.split('-').map(Number);
    return y === prevYear && mo <= latestMonth;
  });

  if (currentYearMonths.length === 0 || prevYearMonths.length === 0) return null;

  const avgCurrent: any = {};
  const avgPrevious: any = {};
  for (const field of ALL_FIELDS) {
    const curVals = currentYearMonths.map(m => (m as any)[field]).filter((v: any) => v != null) as number[];
    const prevVals = prevYearMonths.map(m => (m as any)[field]).filter((v: any) => v != null) as number[];
    avgCurrent[field] = curVals.length > 0 ? curVals.reduce((a, b) => a + b, 0) / curVals.length : null;
    avgPrevious[field] = prevVals.length > 0 ? prevVals.reduce((a, b) => a + b, 0) / prevVals.length : null;
  }

  return {
    currentPeriod: `${latestYear}년 1~${latestMonth}월 평균`,
    previousPeriod: `${prevYear}년 1~${latestMonth}월 평균`,
    changes: computeChanges(avgCurrent, avgPrevious, ALL_FIELDS),
  };
}

export async function getMoMAnalysis(): Promise<AnalysisResult | null> {
  const db = await getDb();
  const result = db.exec('SELECT * FROM monthly_data ORDER BY period DESC LIMIT 2');
  const rows = rowsFromResult(result);
  if (rows.length < 2) return null;
  const [current, previous] = rows;
  return {
    currentPeriod: current.period,
    previousPeriod: previous.period,
    changes: computeChanges(current, previous, ALL_FIELDS),
  };
}
