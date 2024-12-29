"use client";

import { useUser } from "@/contexts";
import Link from "next/link";
import { I } from "../icons/icons";
import { ProfileCircle } from "../shared/profilecircle";

const NavProfile = () => {
  const { user } = useUser();

  return (
    <div className="w-full">
      {!user && (
        <div className="flex items-center gap-2 p-2 text-md font-semibold">
          <Link href={"/register"} className="text-white hover:underline">
            Cadastro
          </Link>
          <div className="text-white text-2xl select-none">|</div>
          <Link
            href={"/login"}
            className="flex items-center gap-2 text-white hover:underline"
          >
            <I.UserCircle className="text-2xl" />
            Login
          </Link>
        </div>
      )}
      {user && (
        <div className="flex items-center gap-2 p-2 text-white text-md font-semibold">
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-2 text-white hover:underline"
          >
            {user.picture ? (
              <ProfileCircle picture={user.picture} size={32} />
            ) : (
              <I.UserCircle className="size-8" />
            )}
            {user.name}
          </Link>
        </div>
      )}
    </div>
  );
};

export { NavProfile };
