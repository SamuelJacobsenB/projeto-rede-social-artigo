"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { Article } from "@/types";

const useManyArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const fetchArticles = useCallback(async () => {
    try {
      const { data, error } = await controller.get(`/articles/${page}`);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setArticles([...articles, ...data]);
        setPage(page + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parece que houve um erro");
    } finally {
      setLoading(false);
    }
  }, [articles, page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, hasMore, page, loading, error, fetchArticles };
};

export { useManyArticles };
