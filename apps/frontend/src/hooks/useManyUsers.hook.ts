"use client";

import { useState, useEffect, useCallback } from "react";
import { controller } from "@/services";
import { User } from "@/types";

const useManyUsers = (
  followersOfAPerson?: string,
  personIsFollowing?: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | string>(false);

  const setInitialUserIds = useCallback(() => {
    if (followersOfAPerson) {
      const followers = followersOfAPerson.split(",");
      setUserIds(followers);
    }

    if (personIsFollowing) {
      const following = personIsFollowing.split(",");
      setUserIds(following);
    }
  }, [followersOfAPerson, personIsFollowing]);

  const fetchUsers = useCallback(
    async (pageToFetch?: number) => {
      try {
        setLoading(true);
        setError(false);

        if (!hasMore) {
          return;
        }

        if (!followersOfAPerson && !personIsFollowing && pageToFetch) {
          const { data, error } = await controller.get(
            `/users/many/${pageToFetch}`
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
        } else {
          const currentUsersIds =
            userIds.length >= 10 ? userIds.slice(0, 10) : userIds;

          if (currentUsersIds.length === 10) {
            setUserIds((prevUserIds) => prevUserIds.slice(10));
          } else {
            setUserIds([]);
            setHasMore(false);
          }

          const data: User[] = [];
          let error: string | null = null;

          for (const currentId of currentUsersIds) {
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
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Parece que houve um erro"
        );
      } finally {
        setLoading(false);
      }
    },
    [hasMore, followersOfAPerson, personIsFollowing, userIds]
  );

  useEffect(() => {
    setInitialUserIds();
    fetchUsers(!followersOfAPerson && !personIsFollowing ? 1 : 0);
  }, [setInitialUserIds, fetchUsers, followersOfAPerson, personIsFollowing]);

  return { users, page, hasMore, loading, error, fetchUsers };
};

export { useManyUsers };
