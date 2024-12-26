"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { User } from "@/types";

const useOneUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const findUser = useCallback(async () => {
    try {
      const { data, error } = await controller.get(`/users/${id}`);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parece que houve um erro");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return { user, loading, error };
};

export { useOneUser };
