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
      <div className="flex items-center gap-2 text-primary p-4">
        {user?.picture && <ProfileCircle picture={user.picture} size={80} />}
        {!user?.picture && <I.UserCircle className="size-20" />}
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full p-2 lg:flex-row lg:justify-between">
        <h2 className="text-3xl text-primary">{user.name}</h2>
        <div className="flex justify-between gap-1 gap-x-4">
          <div className="flex flex-col gap-1">
            <p className={infoStyle}>
              <I.Calendar /> {date}
            </p>
            <p className={infoStyle}>
              <I.Friends /> {user.followers?.split(":").length ?? 0}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={infoStyle}>
              <I.Eye /> {user.views}
            </p>

            <p className={infoStyle}>
              <I.AddPerson /> {user.following?.split(":").length ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserCard };
