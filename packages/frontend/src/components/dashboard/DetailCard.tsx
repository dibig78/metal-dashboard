import { DetailCard as DetailCardType } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { ChangeIndicator } from '../common/ChangeIndicator';
import { METAL_COLORS } from '../../utils/colors';

interface Props {
  card: DetailCardType;
}

export function DetailCard({ card }: Props) {
  const color = METAL_COLORS[card.symbol] || '#00bcd4';
  const decimals = card.symbol === 'AG' ? 2 : card.unit === 'KRW' || card.unit === 'KRW/100JPY' ? 1 : 0;

  return (
    <div className="detail-card">
      <div className="detail-card-header">
        <div className="detail-card-title" style={{ color }}>
          {card.name_ko} ({card.symbol})
        </div>
        <div className="detail-card-value">
          {formatNumber(card.current_value, decimals)} <span className="kpi-unit">{card.unit}</span>
        </div>
      </div>
      <ChangeIndicator
        changeAmount={card.change_amount}
        changePercent={card.change_percent}
        decimals={decimals}
      />
      {card.issues.length > 0 && (
        <div className="issue-list">
          {card.issues.map((issue, i) => (
            <div key={i} className="issue-item">
              <span className={`issue-dot ${issue.severity}`} />
              {issue.issue_text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
