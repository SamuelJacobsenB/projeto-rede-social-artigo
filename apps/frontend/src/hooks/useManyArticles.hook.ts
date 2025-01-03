"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { Article } from "@/types";

const useManyArticles = (authorId?: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const fetchArticles = useCallback(
    async (pageToFetch: number) => {
      try {
        setLoading(true);
        setError(false);

        const url = `/articles/${
          authorId ? `author/${authorId}/${pageToFetch}` : pageToFetch
        }`;

        const { data, error } = await controller.get(url);

        if (error) {
          setError(error);
          return;
        }

        if (hasMore) {
          setArticles((prevArticles) => {
            const newArticles = data.filter((article: Article) => {
              return prevArticles.some(
                (prevArticle) => prevArticle.id !== article.id
              );
            });

            return [...prevArticles, ...newArticles];
          });
          setPage(pageToFetch + 1);
        }

        if (data.length < 10) {
          setHasMore(false);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Parece que houve um erro"
        );
      } finally {
        setLoading(false);
      }
    },
    [authorId, hasMore]
  );

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  return { articles, page, hasMore, loading, error, fetchArticles };
};

export { useManyArticles };
