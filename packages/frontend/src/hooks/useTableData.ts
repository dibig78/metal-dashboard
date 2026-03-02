import { useState, useEffect } from 'react';
import api from '../api/client';
import { MonthlyRow, QuarterlyRow, AnnualRow } from '../types';

export function useTableData() {
  const [monthly, setMonthly] = useState<MonthlyRow[]>([]);
  const [quarterly, setQuarterly] = useState<QuarterlyRow[]>([]);
  const [annual, setAnnual] = useState<AnnualRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const [m, q, a] = await Promise.all([
          api.get('/prices/monthly'),
          api.get('/prices/quarterly'),
          api.get('/prices/annual'),
        ]);
        setMonthly(m.data.data);
        setQuarterly(q.data.data);
        setAnnual(a.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { monthly, quarterly, annual, loading, error };
}
