import { Router } from 'express';
import { getLatestPrices, getMarketIssues } from '../models/queries';
import { DashboardData } from '../models/types';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const prices = await getLatestPrices();
    const issues = await getMarketIssues();

    const kpiSymbols = ['SN', 'AG', 'USD'];
    const kpiCards = prices.filter(p => kpiSymbols.includes(p.symbol));

    const detailCards = prices.map(p => ({
      ...p,
      issues: issues.filter(i => i.symbol === p.symbol),
    }));

    const data: DashboardData = {
      kpiCards,
      detailCards,
      lastUpdated: new Date().toISOString(),
    };

    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
