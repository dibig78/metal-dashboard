import { NewsArticle } from '../../types';
import { formatDate } from '../../utils/formatters';

const CATEGORY_LABELS: Record<string, string> = {
  metal: '금속',
  exchange: '환율',
  solder: '솔더',
  general: '일반',
};

interface Props {
  article: NewsArticle;
}

export function NewsCard({ article }: Props) {
  return (
    <div className="news-card">
      <div className="news-card-title">{article.title}</div>
      {article.summary && (
        <div className="news-card-summary">{article.summary}</div>
      )}
      <div className="news-card-meta">
        {article.category && (
          <span className="news-category">
            {CATEGORY_LABELS[article.category] || article.category}
          </span>
        )}
        {article.source && <span>{article.source}</span>}
        <span>{formatDate(article.published_at)}</span>
      </div>
    </div>
  );
}
