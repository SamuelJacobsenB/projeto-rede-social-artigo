"use client";

import { useUser } from "@/contexts";
import Image from "next/image";
import { Layout, I, Button } from "@/components";

const infoBtnStyle = "bg-primary hover:bg-dark-primary select-none";

const Profile = () => {
  const { user } = useUser();

  const followers = user?.followers?.split(":");
  const following = user?.followers?.split(":");

  return (
    <Layout className="flex flex-col md:flex-row w-full h-full">
      <main className="md:w-80 md:h-full md:border-r-2">
        <div className="flex items-center justify-center gap-12 w-full h-40 border-b-2 md:flex-col md:h-60 md:gap-4">
          {user?.picture !== null && user?.picture !== undefined ? (
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
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <div
          className={`flex justify-start items-center w-full p-4 border-b-2 ${
            user?.description ? "" : "hidden"
          }`}
        >
          <p className="text-justify">{user?.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 w-full p-2 text-white border-b-2">
          <Button className={infoBtnStyle}>
            {followers ? `${followers.length} Segidores` : "Nenhum seguidor"}
          </Button>
          <Button className={infoBtnStyle}>
            {following ? `${following.length} Seguindo` : "Seguindo ninguém"}
          </Button>
          <Button className={infoBtnStyle}>
            {user?.views !== 0
              ? `${user?.views} visualizações`
              : "Nenhuma visualização"}
          </Button>
          <Button className={infoBtnStyle}>
            {user?.hearts !== 0 ? `${user?.hearts} corações` : "Nenhum coração"}
          </Button>
        </div>
      </main>
    </Layout>
  );
};

export default Profile;
