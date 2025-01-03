"use client";

import { useManyUsers } from "@/hooks";
import { UsersList } from "@/components";

interface FollowersProps {
  followers: string | null;
}

const Followers = ({ followers }: FollowersProps) => {
  const { users, loading, hasMore, fetchUsers } = useManyUsers(
    followers ? followers : undefined
  );

  if (!followers) {
    return <h2 className="text-xl text-center w-full p-2">Nenhum seguidor</h2>;
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

export { Followers };
