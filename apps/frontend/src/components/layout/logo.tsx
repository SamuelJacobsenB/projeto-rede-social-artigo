import Image from "next/image";
import { montserrat } from "@/app/fonts";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 bg-primary">
      <Image src={"/imgs/white_logo.png"} alt="Logo" width={60} height={60} />
      <h1 className={`${montserrat.className} text-white text-3xl font-medium`}>
        Article
      </h1>
    </div>
  );
};

export { Logo };
