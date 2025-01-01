"use client";

import { useManyArticles } from "@/hooks";
import { ArticlesList, Layout } from "@/components";

const Home = () => {
  const { articles, loading, fetchArticles, hasMore } = useManyArticles();

  return (
    <Layout className="flex items-center justify-center">
      <ArticlesList
        articles={articles}
        fetchArticles={fetchArticles}
        loading={loading}
        hasMore={hasMore}
        className="p-2"
      />
    </Layout>
  );
};

export default Home;
