import { useNews } from '../../hooks/useNews';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorBanner } from '../common/ErrorBanner';
import { NewsCard } from './NewsCard';

export function NewsTab() {
  const { articles, loading, error } = useNews();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorBanner message={error} />;

  return (
    <div className="news-grid">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
      {articles.length === 0 && (
        <div className="loading">뉴스가 없습니다.</div>
      )}
    </div>
  );
}
