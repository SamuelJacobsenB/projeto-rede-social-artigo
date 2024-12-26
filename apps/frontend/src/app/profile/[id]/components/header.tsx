import Image from "next/image";
import { I } from "@/components";
import { User } from "@/types";

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="flex items-center justify-center gap-12 w-full h-40 border-b-2 md:flex-col md:h-60 md:gap-4">
      {user.picture ? (
        <Image
          src={user.picture.toString()}
          alt="User logo"
          width={96}
          height={96}
          className="rounded-full select-none md:w-32 md:h-32"
        />
      ) : (
        <I.UserCircle className="w-24 h-24 select-none md:w-32 md:h-32" />
      )}
      <div className="flex flex-col justify-start gap-2 md:text-center md:gap-1">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export { Header };
