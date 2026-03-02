import { Router } from 'express';
import { getMonthlyData, getAnnualData } from '../models/queries';
import { ChartResponse } from '../models/types';

const router = Router();

const COLORS: Record<string, string> = {
  sn: '#ff9800', pb: '#9c27b0', ni: '#4caf50', cu: '#f44336', al: '#607d8b',
  ag: '#ffd700', ttm_usd: '#00bcd4', ttm_jpy: '#ff5722',
  sac305: '#00bcd4', hse16: '#ff9800', hse39: '#4caf50',
  hse11: '#9c27b0', s63: '#f44336', hse100: '#2196f3',
};

function makeDataset(label: string, data: (number | null)[], color: string, yAxisID?: string) {
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: color + '33',
    ...(yAxisID ? { yAxisID } : {}),
  };
}

// Metal prices chart (Sn, Cu, Ni, Pb, Al)
router.get('/metals', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const fields = ['sn', 'pb', 'ni', 'cu', 'al'] as const;
    const labelMap: Record<string, string> = {
      sn: 'Sn (주석)', pb: 'Pb (납)', ni: 'Ni (니켈)', cu: 'Cu (구리)', al: 'Al (알루미늄)',
    };
    const datasets = fields.map(f => makeDataset(
      labelMap[f], monthly.map(m => (m as any)[f]), COLORS[f]
    ));
    const chart: ChartResponse = { labels, datasets };
    res.json(chart);
  } catch (err) { next(err); }
});

// Exchange rate chart (USD, JPY dual axis)
router.get('/exchange', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const chart: ChartResponse = {
      labels,
      datasets: [
        makeDataset('USD/KRW', monthly.map(m => m.ttm_usd), COLORS.ttm_usd, 'y'),
        makeDataset('JPY/KRW (100엔)', monthly.map(m => m.ttm_jpy), COLORS.ttm_jpy, 'y1'),
      ],
    };
    res.json(chart);
  } catch (err) { next(err); }
});

// Silver chart
router.get('/silver', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const chart: ChartResponse = {
      labels,
      datasets: [makeDataset('은 (Ag) USD/oz', monthly.map(m => m.ag), COLORS.ag)],
    };
    res.json(chart);
  } catch (err) { next(err); }
});

// Yearly comparison (Sn vs Ag)
router.get('/yearly-comparison', async (_req, res, next) => {
  try {
    const annual = await getAnnualData();
    const labels = annual.map(a => a.period);
    const chart: ChartResponse = {
      labels,
      datasets: [
        makeDataset('Sn (주석) USD/MT', annual.map(a => a.sn), COLORS.sn, 'y'),
        makeDataset('Ag (은) USD/oz', annual.map(a => a.ag), COLORS.ag, 'y1'),
      ],
    };
    res.json(chart);
  } catch (err) { next(err); }
});

// SAC305 chart
router.get('/sac305', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const chart: ChartResponse = {
      labels,
      datasets: [makeDataset('SAC305', monthly.map(m => m.sac305), COLORS.sac305)],
    };
    res.json(chart);
  } catch (err) { next(err); }
});

// Solder paste chart (HSE16, HSE39, HSE11, S63)
router.get('/solder-paste', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const fields = ['hse16', 'hse39', 'hse11', 's63'] as const;
    const labelMap: Record<string, string> = {
      hse16: 'HSE16', hse39: 'HSE39', hse11: 'HSE11', s63: 'S63',
    };
    const datasets = fields.map(f => makeDataset(
      labelMap[f], monthly.map(m => (m as any)[f]), COLORS[f]
    ));
    const chart: ChartResponse = { labels, datasets };
    res.json(chart);
  } catch (err) { next(err); }
});

// HSE100 chart
router.get('/hse100', async (_req, res, next) => {
  try {
    const monthly = await getMonthlyData();
    const labels = monthly.map(m => m.period);
    const chart: ChartResponse = {
      labels,
      datasets: [makeDataset('HSE100', monthly.map(m => m.hse100), COLORS.hse100)],
    };
    res.json(chart);
  } catch (err) { next(err); }
});

export default router;
