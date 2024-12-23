import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex">
      <Image src={"/imgs/logo.png"} alt="Logo" width={160} height={80} />
    </Link>
  );
};

export { Logo };
