import { Router } from 'express';
import { getLatestPrices, getMonthlyData, getQuarterlyData, getAnnualData } from '../models/queries';

const router = Router();

router.get('/latest', async (_req, res, next) => {
  try {
    const prices = await getLatestPrices();
    res.json({ data: prices });
  } catch (err) { next(err); }
});

router.get('/monthly', async (_req, res, next) => {
  try {
    const data = await getMonthlyData();
    res.json({ data });
  } catch (err) { next(err); }
});

router.get('/quarterly', async (_req, res, next) => {
  try {
    const data = await getQuarterlyData();
    res.json({ data });
  } catch (err) { next(err); }
});

router.get('/annual', async (_req, res, next) => {
  try {
    const data = await getAnnualData();
    res.json({ data });
  } catch (err) { next(err); }
});

export default router;
