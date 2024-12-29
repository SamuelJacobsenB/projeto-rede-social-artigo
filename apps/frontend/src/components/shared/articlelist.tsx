"use client";

import { useManyArticles } from "@/hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader, LoadingPage } from "..";

const ArticlesList = () => {
  const { articles, hasMore, loading, fetchArticles } = useManyArticles();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={() => fetchArticles()}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <div className="flex flex-col justify-center gap-4 w-full h-full">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export { ArticlesList };
