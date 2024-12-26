import Image from "next/image";
import { Loader } from "..";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-primary w-screen h-screen">
      <Image
        src={"/imgs/logo.png"}
        alt="Logo Article"
        width={320}
        height={160}
      />
      <Loader className="text-white" />
    </div>
  );
};

export { LoadingPage };
