import { useState, useEffect } from 'react';
import api from '../api/client';
import { AnalysisResult } from '../types';

export function useAnalysis() {
  const [qoq, setQoQ] = useState<AnalysisResult | null>(null);
  const [yoy, setYoY] = useState<AnalysisResult | null>(null);
  const [mom, setMoM] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const [q, y, m] = await Promise.all([
          api.get('/analysis/qoq'),
          api.get('/analysis/yoy'),
          api.get('/analysis/mom'),
        ]);
        setQoQ(q.data.data);
        setYoY(y.data.data);
        setMoM(m.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { qoq, yoy, mom, loading, error };
}
