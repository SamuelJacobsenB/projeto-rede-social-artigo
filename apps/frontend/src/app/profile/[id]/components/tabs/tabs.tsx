"use client";

import { useState } from "react";
import { User } from "@/types";
import { I } from "@/components";
import { Articles, Followers, Following } from ".";

interface TabsProps {
  user: User;
}

const btnStyle =
  "flex flex-1 justify-center p-4 items-center text-3xl hover:border-b-4";
const selectedBtnStyle = "text-primary border-b-4 border-primary";
const anyInfoTitleStyle = "text-xl text-center w-full p-2";

const Tabs = ({ user }: TabsProps) => {
  const [followingTab, setFollowingTab] = useState(false);
  const [articlesTab, setArticlesTab] = useState(true);
  const [followersTab, setFollowersTab] = useState(false);

  const handleSetStatesFalse = () => {
    setFollowingTab(false);
    setArticlesTab(false);
    setFollowersTab(false);
  };

  return (
    <div className="flex flex-col w-full p-2">
      <div className="flex w-full border-b-2 h-fit">
        <button
          onClick={() => {
            handleSetStatesFalse();
            setFollowersTab(true);
          }}
          className={`${btnStyle} ${followersTab && selectedBtnStyle}`}
          title="Seguidores"
        >
          <I.Friends />
        </button>
        <button
          onClick={() => {
            handleSetStatesFalse();
            setArticlesTab(true);
          }}
          className={`${btnStyle} ${articlesTab && selectedBtnStyle}`}
          title="Artigos"
        >
          <I.Article />
        </button>
        <button
          onClick={() => {
            handleSetStatesFalse();
            setFollowingTab(true);
          }}
          className={`${btnStyle} ${followingTab && selectedBtnStyle}`}
          title="Seguindo"
        >
          <I.AddPerson />
        </button>
      </div>
      {followersTab ? (
        user.followers ? (
          <Followers followers={user.followers} />
        ) : (
          <h2 className={anyInfoTitleStyle}>Nenhum seguidor</h2>
        )
      ) : null}
      {articlesTab && <Articles userId={user.id} />}
      {followingTab ? (
        user.following ? (
          <Following following={user.following} />
        ) : (
          <h2 className={anyInfoTitleStyle}>Seguindo a ninguém</h2>
        )
      ) : null}
    </div>
  );
};

export { Tabs };
