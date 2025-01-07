"use client";

import { useManyUserFollow } from "@/hooks";
import { UsersList } from "@/components";

interface FollowersProps {
  followers: string;
}

const Followers = ({ followers }: FollowersProps) => {
  const { users, loading, hasMore, fetchUsers } = useManyUserFollow(followers);

  return (
    <UsersList
      users={users}
      loading={loading}
      page={0}
      hasMore={hasMore}
      fetchUsers={fetchUsers}
      className="p-2"
    />
  );
};

export { Followers };
