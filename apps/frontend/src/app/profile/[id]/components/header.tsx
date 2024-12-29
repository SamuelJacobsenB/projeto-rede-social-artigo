import { I, ProfileCircle } from "@/components";
import { User } from "@/types";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-12 w-full h-40 border-b-2 md:flex-col md:h-60 md:gap-4">
      {user.picture ? (
        <ProfileCircle
          picture={user.picture}
          size={96}
          className="select-none md:size-32"
        />
      ) : (
        <I.UserCircle className="size-24 select-none md:size-32" />
      )}
      <div className="flex flex-col justify-start gap-2 md:text-center md:gap-1">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export { Header };
