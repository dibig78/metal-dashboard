interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'charts', label: '차트' },
  { id: 'tables', label: '상세 데이터' },
  { id: 'analysis', label: '분석' },
  { id: 'news', label: '뉴스' },
];

export function TabNavigation({ activeTab, onTabChange }: Props) {
  return (
    <nav className="tab-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
