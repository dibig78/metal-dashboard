import { formatNumber } from '../../utils/formatters';

interface Column {
  key: string;
  label: string;
}

interface Props {
  columns: Column[];
  data: any[];
}

export function DataTable({ columns, data }: Props) {
  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.key === 'period'
                    ? row[col.key]
                    : formatNumber(row[col.key], col.key === 'ag' ? 2 : col.key.startsWith('ttm') ? 1 : 0)
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
