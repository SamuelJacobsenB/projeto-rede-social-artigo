"use client";

import { useManyArticles } from "@/hooks";
import { ArticlesList } from "@/components";

interface ArticlesProps {
  userId: string;
}

const Articles = ({ userId }: ArticlesProps) => {
  const { articles, loading, page, hasMore, fetchArticles } =
    useManyArticles(userId);

  return (
    <ArticlesList
      articles={articles}
      loading={loading}
      page={page}
      hasMore={hasMore}
      fetchArticles={fetchArticles}
      className="p-2"
    />
  );
};

export { Articles };
