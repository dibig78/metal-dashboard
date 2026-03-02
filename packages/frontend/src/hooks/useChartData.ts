import { useState, useEffect } from 'react';
import api from '../api/client';
import { ChartResponse } from '../types';

export function useChartData(endpoint: string) {
  const [data, setData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      try {
        setLoading(true);
        const res = await api.get(`/charts/${endpoint}`);
        if (!cancelled) setData(res.data);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
}
