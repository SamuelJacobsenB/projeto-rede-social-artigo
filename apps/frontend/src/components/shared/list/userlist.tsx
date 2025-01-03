"use client";

import { useRouter } from "next/navigation";
import { InfiniteScroll, UserCard } from "../..";
import { User } from "@/types";

interface UsersListProps {
  users: User[];
  fetchUsers: (page?: number) => Promise<void>;
  loading: boolean;
  page?: number;
  hasMore: boolean;
  className?: string;
}

const UsersList = ({
  users,
  fetchUsers,
  loading,
  page,
  hasMore,
  className,
}: UsersListProps) => {
  const router = useRouter();

  return (
    <InfiniteScroll
      fetch={async () => await fetchUsers(page)}
      loading={loading}
      hasMore={hasMore}
    >
      <div
        className={`flex flex-col items-center gap-4 w-full h-full ${className}`}
      >
        {users.map((user, i) => (
          <UserCard
            user={user}
            key={i}
            onClick={() => router.push(`/profile/${user.id}`)}
            className="max-w-5xl"
          />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export { UsersList };
