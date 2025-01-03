"use client";

import { useRouter } from "next/navigation";
import { ArticleCard, InfiniteScroll } from "../..";
import { Article } from "@/types";

interface ArticlesListProps {
  articles: Article[];
  fetchArticles: (page: number) => Promise<void>;
  loading: boolean;
  page: number;
  hasMore: boolean;
  className?: string;
}

const ArticlesList = ({
  articles,
  fetchArticles,
  loading,
  page,
  hasMore,
  className,
}: ArticlesListProps) => {
  const router = useRouter();

  return (
    <InfiniteScroll
      fetch={async () => await fetchArticles(page)}
      loading={loading}
      hasMore={hasMore}
    >
      <div
        className={`flex flex-col items-center gap-4 w-full h-full ${className}`}
      >
        {articles.map((article, i) => (
          <ArticleCard
            article={article}
            key={i}
            onClick={() => router.push(`/article/${article.id}`)}
            className="max-w-5xl"
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export { ArticlesList };
