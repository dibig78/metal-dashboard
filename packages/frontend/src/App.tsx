import { useState, lazy, Suspense } from 'react';
import { Header } from './components/layout/Header';
import { TabNavigation } from './components/layout/TabNavigation';
import { KpiCard } from './components/dashboard/KpiCard';
import { DetailCard } from './components/dashboard/DetailCard';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorBanner } from './components/common/ErrorBanner';
import { useDashboard } from './hooks/useDashboard';

const ChartsTab = lazy(() => import('./components/charts/ChartsTab').then(m => ({ default: m.ChartsTab })));
const TablesTab = lazy(() => import('./components/tables/TablesTab').then(m => ({ default: m.TablesTab })));
const AnalysisTab = lazy(() => import('./components/analysis/AnalysisTab').then(m => ({ default: m.AnalysisTab })));
const NewsTab = lazy(() => import('./components/news/NewsTab').then(m => ({ default: m.NewsTab })));

function App() {
  const { data, loading, error, refetch } = useDashboard();
  const [activeTab, setActiveTab] = useState('charts');

  return (
    <div>
      <Header
        lastUpdated={data?.lastUpdated ?? null}
        onRefresh={refetch}
      />

      {error && <ErrorBanner message={error} />}

      {loading && !data ? (
        <LoadingSpinner />
      ) : data ? (
        <>
          <div className="kpi-grid">
            {data.kpiCards.map(price => (
              <KpiCard key={price.symbol} price={price} />
            ))}
          </div>

          <div className="detail-grid">
            {data.detailCards
              .filter(c => !['SN', 'AG', 'USD'].includes(c.symbol) || c.issues.length > 0)
              .slice(0, 4)
              .map(card => (
                <DetailCard key={card.symbol} card={card} />
              ))}
          </div>

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="tab-content">
            <Suspense fallback={<LoadingSpinner />}>
              {activeTab === 'charts' && <ChartsTab />}
              {activeTab === 'tables' && <TablesTab />}
              {activeTab === 'analysis' && <AnalysisTab />}
              {activeTab === 'news' && <NewsTab />}
            </Suspense>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
