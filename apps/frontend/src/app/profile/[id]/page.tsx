"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMessage, useUser } from "@/contexts";
import { useOneUser } from "@/hooks";
import { toggleFollow } from "@/functions";
import { Layout, LoadingPage, EditUserModal } from "@/components";
import { P } from "./components";

const Profile = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user: _user } = useUser();
  const { user, loading, error, findUser } = useOneUser(id as string);
  const { showMessage } = useMessage();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      showMessage(error as string, "error");
      router.push("/");
    }
  }, [error, router, showMessage]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    showMessage("Este perfil não foi encontrado", "error");
    router.push("/");
  }

  const ifOwnUser = user!.id === _user?.id;

  const followers = user?.followers?.split(":");
  const following = user?.following?.split(":");

  const isFollowing = user?.followers
    ? user.followers.split(":").includes(_user?.id as string)
    : false;

  const toggleFollowPerson = async () => {
    const access_token = localStorage.getItem("access_token");

    const { error } = await toggleFollow(id as string, _user, access_token);

    if (error) {
      showMessage(error as string, "error");
      return;
    }

    router.refresh();
  };

  return (
    <Layout className="flex justify-center w-full h-full">
      <EditUserModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        user={user!}
        refetchUser={findUser}
      />
      <div className="flex flex-col  w-full md:flex-row md:h-full max-w-5xl">
        <main className="h-min md:min-w-96 md:w-1/2 md:h-full md:border-x-2">
          <P.Header user={user!} />
          <P.Main
            ifOwnUser={ifOwnUser}
            isFollowing={isFollowing}
            toggleFollowPerson={toggleFollowPerson}
            setIsVisible={setIsVisible}
          />
          <P.Description description={user?.description} />
          <P.Info user={user!} followers={followers} following={following} />
        </main>
        <div className="flex w-full md:border-x-2">
          <P.Tabs user={user!} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
