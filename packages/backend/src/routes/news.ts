import { Router } from 'express';
import { getNews } from '../models/queries';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const data = await getNews();
    res.json({ data });
  } catch (err) { next(err); }
});

export default router;
