import { exportToExcel } from '../../utils/exportExcel';
import { exportToPdf } from '../../utils/exportPdf';

interface Props {
  data: any[];
  filename: string;
  tableId: string;
}

export function ExportButtons({ data, filename, tableId }: Props) {
  return (
    <div className="export-btns">
      <button className="export-btn" onClick={() => exportToExcel(data, filename)}>
        Excel 다운로드
      </button>
      <button className="export-btn" onClick={() => exportToPdf(tableId, filename)}>
        PDF 다운로드
      </button>
    </div>
  );
}
