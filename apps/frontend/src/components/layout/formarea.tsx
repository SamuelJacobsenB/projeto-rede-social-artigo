import Link from "next/link";
import React from "react";
import { I } from "../icons/icons";

interface FormareaProps {
  children: React.ReactNode;
}

const Formarea = ({ children }: FormareaProps) => {
  return (
    <div className="flex items-center justify-center min-w-screen w-full min-h-screen h-full bg-primary p-4 py-20">
      <div className="fixed top-4 left-4 flex items-center justify-center bg-white text-3xl w-12 h-12 rounded shadow">
        <Link href={"/"} className="text-black">
          <I.Home />
        </Link>
      </div>
      <div className="flex items-center flex-col gap-2 bg-white max-w-lg w-full min-h-96 rounded-md shadow">
        {children}
      </div>
    </div>
  );
};

export { Formarea };
