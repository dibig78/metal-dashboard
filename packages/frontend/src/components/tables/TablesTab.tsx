import { useTableData } from '../../hooks/useTableData';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorBanner } from '../common/ErrorBanner';
import { DataTable } from './DataTable';
import { ExportButtons } from './ExportButtons';
import { MonthlyRow } from '../../types';

const COLUMNS = [
  { key: 'period', label: '기간' },
  { key: 'sn', label: 'Sn (주석)' },
  { key: 'ag', label: 'Ag (은)' },
  { key: 'pb', label: 'Pb (납)' },
  { key: 'ni', label: 'Ni (니켈)' },
  { key: 'cu', label: 'Cu (구리)' },
  { key: 'al', label: 'Al (알루미늄)' },
  { key: 'ttm_usd', label: 'USD/KRW' },
  { key: 'ttm_jpy', label: 'JPY/KRW' },
  { key: 'sac305', label: 'SAC305' },
  { key: 'hse16', label: 'HSE16' },
  { key: 'hse39', label: 'HSE39' },
  { key: 'hse11', label: 'HSE11' },
  { key: 's63', label: 'S63' },
  { key: 'hse100', label: 'HSE100' },
];

export function TablesTab() {
  const { monthly, quarterly, annual, loading, error } = useTableData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div>
      <TableSection title="월간 데이터" data={monthly} id="monthly" />
      <TableSection title="분기 데이터" data={quarterly} id="quarterly" />
      <TableSection title="연간 데이터" data={annual} id="annual" />
    </div>
  );
}

function TableSection({ title, data, id }: { title: string; data: MonthlyRow[]; id: string }) {
  return (
    <div className="table-section">
      <div className="table-header">
        <h3>{title}</h3>
        <ExportButtons data={data} filename={`metal_${id}`} tableId={`table-${id}`} />
      </div>
      <div id={`table-${id}`}>
        <DataTable columns={COLUMNS} data={data} />
      </div>
    </div>
  );
}
