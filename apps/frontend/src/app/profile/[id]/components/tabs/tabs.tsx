"use client";

import { useState } from "react";
import { User } from "@/types";
import { I } from "@/components";

interface TabsProps {
  user: User;
}

const btnStyle =
  "flex flex-1 justify-center p-4 items-center text-3xl hover:border-b-4";

const selectedBtnStyle = "text-primary border-b-4 border-primary";

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
    <>
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
    </>
  );
};

export { Tabs };
