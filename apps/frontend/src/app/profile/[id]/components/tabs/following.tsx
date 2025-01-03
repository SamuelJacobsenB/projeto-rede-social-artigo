"use client";

import { useManyUsers } from "@/hooks";
import { UsersList } from "@/components";

interface FollowingProps {
  following: string | null;
}

const Following = ({ following }: FollowingProps) => {
  const { users, loading, hasMore, fetchUsers } = useManyUsers(
    following ? following : undefined
  );

  if (!following) {
    return (
      <h2 className="text-xl text-center w-full p-2">Seguindo a ninguém</h2>
    );
  }

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
