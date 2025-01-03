import { serializeDate } from "@/functions";
import { I, ProfileCircle } from "../..";
import { User } from "@/types";

interface UserCardProps {
  user: User;
  onClick?: () => void;
  className?: string;
}

const infoStyle = "flex items-center gap-2";

const UserCard = ({ user, onClick, className }: UserCardProps) => {
  const date = serializeDate(user.created_at);

  return (
    <div
      className={`flex items-center justify-between gap-4 w-full p-2 border-2 rounded-md shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 w-full text-3xl text-primary">
        {user?.picture && <ProfileCircle picture={user.picture} size={64} />}
        {!user?.picture && <I.UserCircle className="size-16" />}
        {user.name}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className={infoStyle}>
          <I.Calendar /> {date}
        </p>
        <p className={infoStyle}>
          <I.Friends /> {user.followers?.split(":").length ?? 0}
        </p>
        <p className={infoStyle}>
          <I.AddPerson /> {user.following?.split(":").length ?? 0}
        </p>
        <p className={infoStyle}>
          <I.Eye /> {user.views}
        </p>
      </div>
    </div>
  );
};

export { UserCard };
