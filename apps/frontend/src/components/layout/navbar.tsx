import Link from "next/link";
import { Logo, Links, I } from "..";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20" />
      <div className="top-0 fixed flex items-center justify-between w-screen h-20 bg-primary">
        <Logo />
        <div className="flex items-center justify-end gap-4 w-full h-full">
          <div className="hidden w-full max-w-xl h-full md:flex">
            <Links />
          </div>
          <div>
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
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 bg-primary w-screen h-16 md:hidden">
        <Links />
      </div>
      <div className="absolute w-full bottom-0 h-16" />
    </>
  );
};

export { Navbar };
