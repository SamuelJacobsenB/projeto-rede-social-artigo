"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { User } from "@/types";

const useManyUsersByParams = (name: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const fetchUsers = useCallback(
    async (pageToFetch: number) => {
      try {
        setLoading(true);
        setError(false);

        if (!hasMore) {
          return;
        }

        const { data, error } = await controller.get(
          `/users/many/${pageToFetch}/name/${name}`
        );

        if (error) {
          setError(error);
          return;
        }

        setUsers((prevUsers) => {
          const newUsers = data.filter((user: User) => {
            return !prevUsers.some((prevUser) => prevUser.id === user.id);
          });

          return [...prevUsers, ...newUsers];
        });

        setPage(pageToFetch + 1);

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
    [hasMore, name]
  );

  useEffect(() => {
    setUsers([]);
    setHasMore(true);
    setPage(1);
    fetchUsers(1);
  }, [name, fetchUsers]);

  return { users, page, hasMore, loading, error, fetchUsers };
};

export { useManyUsersByParams };
