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

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const url = `/articles/${authorId ? `${authorId}/${page}` : page}`;

      const { data, error } = await controller.get(url);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      if (hasMore) {
        setArticles([...articles, ...data]);
        setPage(page + 1);
      }

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parece que houve um erro");
    } finally {
      setLoading(false);
    }
  }, [authorId, articles, page, hasMore]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, hasMore, loading, error, fetchArticles };
};

export { useManyArticles };
