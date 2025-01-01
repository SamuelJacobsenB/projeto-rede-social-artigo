import { ArticleCard, InfiniteScroll } from "..";
import { Article } from "@/types";

interface ArticlesListProps {
  articles: Article[];
  fetchArticles: () => Promise<void>;
  loading: boolean;
  hasMore: boolean;
  className?: string;
}

const ArticlesList = ({
  articles,
  fetchArticles,
  loading,
  hasMore,
  className,
}: ArticlesListProps) => {
  return (
    <InfiniteScroll
      fetch={async () => await fetchArticles()}
      loading={loading}
      hasMore={hasMore}
    >
      <div
        className={`flex flex-col items-center gap-4 w-full h-full ${className}`}
      >
        {articles.map((article) => (
          <ArticleCard
            article={article}
            key={article.id}
            className="max-w-5xl"
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export { ArticlesList };
