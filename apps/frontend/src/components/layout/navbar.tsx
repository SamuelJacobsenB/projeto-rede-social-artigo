import { Logo, Links, NavProfile } from "..";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20" />
      <div className="top-0 fixed flex items-center justify-between w-screen h-20 bg-primary">
        <Logo />
        <div className="flex items-center justify-end gap-4 h-full">
          <div className="hidden w-full max-w-xl h-full md:flex">
            <Links />
          </div>
          <NavProfile />
        </div>
      </div>

      <div className="fixed bottom-0 bg-primary w-screen h-16 md:hidden">
        <Links />
      </div>
    </>
  );
};

export { Navbar };
