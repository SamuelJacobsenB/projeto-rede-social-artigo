"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { User } from "@/types";

const useManyUserFollow = (follow: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);
  const [processedIdsCount, setProcessedIdsCount] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      if (!hasMore) {
        return;
      }

      const userIds = follow.split(":");

      const currentIds = userIds.slice(
        processedIdsCount,
        processedIdsCount + 10
      );

      setProcessedIdsCount(processedIdsCount + currentIds.length);

      if (currentIds.length < 10) {
        setHasMore(false);
      }

      const data: User[] = [];
      let error: string | null = null;

      for (const currentId of currentIds) {
        const { data: user, error: userError } = await controller.get(
          `/users/${currentId}`
        );

        if (userError) {
          error = userError;
          break;
        }

        data.push(user);
      }

      if (error) {
        setError(error);
        return;
      }

      setUsers((prevUsers) => {
        const newUsers = data.filter((user) => {
          return !prevUsers.some((prevUser) => prevUser.id === user.id);
        });

        return [...prevUsers, ...newUsers];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parece que houve um erro");
    } finally {
      setLoading(false);
    }
  }, [hasMore, follow, processedIdsCount]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, hasMore, loading, error, fetchUsers };
};

export { useManyUserFollow };
