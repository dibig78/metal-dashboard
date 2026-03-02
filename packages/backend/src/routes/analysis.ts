import { Router } from 'express';
import { getQoQAnalysis, getYoYAnalysis, getMoMAnalysis } from '../models/queries';

const router = Router();

router.get('/qoq', async (_req, res, next) => {
  try {
    const data = await getQoQAnalysis();
    res.json({ data });
  } catch (err) { next(err); }
});

router.get('/yoy', async (_req, res, next) => {
  try {
    const data = await getYoYAnalysis();
    res.json({ data });
  } catch (err) { next(err); }
});

router.get('/mom', async (_req, res, next) => {
  try {
    const data = await getMoMAnalysis();
    res.json({ data });
  } catch (err) { next(err); }
});

export default router;
