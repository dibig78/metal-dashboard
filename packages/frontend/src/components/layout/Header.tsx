interface Props {
  lastUpdated: string | null;
  onRefresh: () => void;
}

export function Header({ lastUpdated, onRefresh }: Props) {
  const formatted = lastUpdated
    ? new Date(lastUpdated).toLocaleString('ko-KR')
    : '-';

  return (
    <header className="header">
      <h1><span>Metal</span> Price Dashboard</h1>
      <div className="header-right">
        <span className="last-updated">최종 업데이트: {formatted}</span>
        <button className="refresh-btn" onClick={onRefresh}>
          새로고침
        </button>
      </div>
    </header>
  );
}
