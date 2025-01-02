"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { Article } from "@/types";

const useOneArticle = (id: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const fetchArticle = useCallback(async () => {
    try {
      const { data, error } = await controller.get(`/articles/one/${id}`);

      if (error) {
        setError(error);
        return;
      }

      setArticle(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parece que houve um erro");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return { article, loading, error, fetchArticle };
};

export { useOneArticle };
