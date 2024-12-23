import Link from "next/link";
import { Logo, I } from "..";

const Links = () => {
  return <div></div>;
};

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20" />
      <div className="top-0 fixed flex items-center justify-between w-screen h-20 bg-primary">
        <Logo />
        <div>
          <div></div>
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
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Navbar };
