"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMessage, useUser } from "@/contexts";
import { useOneUser } from "@/hooks";
import { controller } from "@/services";
import { Layout, LoadingPage } from "@/components";
import { P } from "./components";

const Profile = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user: _user } = useUser();
  const { user, loading, error } = useOneUser(id as string);
  const { showMessage } = useMessage();

  useEffect(() => {
    if (error) {
      showMessage(error as string, "error");
      router.push("/");
    }
  }, [error, router, showMessage]);

  if (loading) {
    return <LoadingPage />;
  }

  const ifOwnUser = user!.id === _user?.id;

  const followers = user?.followers?.split(":");
  const following = user?.following?.split(":");

  const isFollowing = user?.followers
    ? user.followers.split(":").includes(_user?.id as string)
    : false;

  const toggleFollowPerson = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!_user || !access_token) {
      showMessage("Você deve estar logado para seguir", "error");
      return;
    }

    const { error } = await controller.post(
      "/users/follow",
      { id },
      access_token
    );

    if (error) {
      showMessage(error as string, "error");
      return;
    }

    router.refresh();
  };

  return (
    <Layout className="flex flex-col md:flex-row w-full h-full">
      <main className="md:w-80 md:h-full md:border-r-2">
        <P.Header user={user!} />
        <P.Main
          id={user!.id}
          ifOwnUser={ifOwnUser}
          isFollowing={isFollowing}
          toggleFollowPerson={toggleFollowPerson}
        />
        <P.Description description={user?.description} />
        <P.Info user={user!} followers={followers} following={following} />
      </main>
    </Layout>
  );
};

export default Profile;
