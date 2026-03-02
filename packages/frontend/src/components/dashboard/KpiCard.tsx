import { LatestPrice } from '../../types';
import { formatNumber } from '../../utils/formatters';
import { ChangeIndicator, Badge } from '../common/ChangeIndicator';
import { METAL_COLORS } from '../../utils/colors';

interface Props {
  price: LatestPrice;
}

export function KpiCard({ price }: Props) {
  const color = METAL_COLORS[price.symbol] || '#00bcd4';
  const decimals = price.symbol === 'AG' ? 2 : price.unit === 'KRW' ? 1 : 0;

  return (
    <div className="kpi-card" style={{ borderTopColor: color }}>
      <div className="kpi-title">
        {price.name_ko} ({price.symbol})
        <Badge percent={price.change_percent} />
      </div>
      <div className="kpi-value" style={{ color }}>
        {formatNumber(price.current_value, decimals)}
      </div>
      <div className="kpi-unit">{price.unit}</div>
      <ChangeIndicator
        changeAmount={price.change_amount}
        changePercent={price.change_percent}
        decimals={decimals}
      />
    </div>
  );
}
