"use client";

import { useManyUserFollow } from "@/hooks";
import { UsersList } from "@/components";

interface FollowingProps {
  following: string;
}

const Following = ({ following }: FollowingProps) => {
  const { users, loading, hasMore, fetchUsers } = useManyUserFollow(following);

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

export { Following };
