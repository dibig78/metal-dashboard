import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { runMigrations } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import dashboardRouter from './routes/dashboard';
import pricesRouter from './routes/prices';
import chartsRouter from './routes/charts';
import analysisRouter from './routes/analysis';
import newsRouter from './routes/news';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/prices', pricesRouter);
app.use('/api/v1/charts', chartsRouter);
app.use('/api/v1/analysis', analysisRouter);
app.use('/api/v1/news', newsRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

async function start() {
  await runMigrations();
  app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

start().catch(console.error);
