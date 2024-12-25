"use client";

import { useUser } from "@/contexts";
import Link from "next/link";
import { I } from "../icons/icons";

const NavProfile = () => {
  const { user } = useUser();

  return (
    <div className="w-full">
      {!user && (
        <div className="flex items-center gap-2 p-2 text-white text-md font-semibold">
          <Link href={"/register"} className="hover:underline">
            Cadastro
          </Link>
          <div className="text-white text-2xl select-none">|</div>
          <Link
            href={"/login"}
            className="flex items-center gap-2 hover:underline"
          >
            <I.UserCircle className="text-2xl" />
            Login
          </Link>
        </div>
      )}
      {user && (
        <div className="flex items-center gap-2 p-2 text-white text-md font-semibold">
          <Link
            href={"/profile"}
            className="flex items-center gap-2 hover:underline"
          >
            <I.UserCircle className="text-3xl" />
            {user.name}
          </Link>
        </div>
      )}
    </div>
  );
};

export { NavProfile };
