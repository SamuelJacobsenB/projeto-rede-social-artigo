"use client";

import { useParams, useRouter } from "next/navigation";
import { useMessage, useUser } from "@/contexts";
import { useOneArticle } from "@/hooks";
import { serializeDate, toggleFollow } from "@/functions";
import { I, Layout, LoadingPage, ProfileCircle } from "@/components";
import { useCallback, useEffect } from "react";
import { controller } from "@/services";
import { debounce } from "lodash";

const infoItemStyle = "flex items-center gap-2 text-lg";

const Article = () => {
  const router = useRouter();
  const { id } = useParams();
  const { showMessage } = useMessage();
  const { user } = useUser();
  const { article, loading, error, fetchArticle } = useOneArticle(id as string);

  const handleAddView = useCallback(async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token || !user || !id) {
      return;
    }

    await controller.patch("/articles/view", { id }, access_token);
  }, [user, id]);

  useEffect(() => {
    handleAddView();
  }, [handleAddView]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !article) {
    return <div>Error: {error}</div>;
  }

  const { author } = article;
  const date = serializeDate(article.created_at);

  const ifUserIsAuthor = user && article.author_id === user.id;

  const ifUserLiked =
    article.hearts && user
      ? article.hearts.split(":").includes(user.id)
      : false;

  const ifIsFollowing =
    author.followers && user ? author.followers.includes(user.id) : false;

  const toggleFollowAuthor = async (follow: boolean) => {
    const access_token = localStorage.getItem("access_token");

    const response = await toggleFollow(
      author.id,
      follow,
      user,
      access_token,
      fetchArticle
    );

    if (response?.error) {
      showMessage(error as string, "error");
      return;
    }
  };

  const toggleLikeArticle = debounce(async (add: boolean) => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token || !user) {
      showMessage("Você deve estar logado para curtir", "error");
      return;
    }

    const url = `/articles/${add ? "add" : "remove"}/heart`;

    const { error } = await controller.patch(url, { id }, access_token);

    if (error) {
      showMessage(error as string, "error");
      return;
    }

    await fetchArticle();
  }, 500);

  return (
    <Layout className="flex justify-center p-4">
      <div className="flex flex-col gap-8 max-w-3xl w-full h-full p-2">
        <h1 className="text-3xl">{article.title}</h1>
        <div className="flex items-center gap-2">
          <div
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => router.push(`/profile/${author.id}`)}
          >
            {author.picture && (
              <ProfileCircle picture={author.picture} size={40} />
            )}
            {!author.picture && <I.UserCircle className="size-10" />}
            {author.name}
          </div>

          {!ifUserIsAuthor && (
            <>
              <p>-</p>
              <button
                onClick={async () =>
                  await toggleFollowAuthor(ifIsFollowing ? false : true)
                }
                className="text-blue-700 hover:underline"
              >
                {ifIsFollowing && "Deixar de seguir"}
                {!ifIsFollowing && "Seguir"}
              </button>
            </>
          )}
        </div>
        <div
          className="flex flex-col gap-2 text-lg p-2 py-6 border-y-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <div className="flex justify-between w-full">
          <div className="flex gap-8">
            <p className={infoItemStyle}>
              <I.Calendar />
              {date}
            </p>
            <p className={infoItemStyle}>
              <I.Eye />
              {article.views?.split(":").length ?? 0}
            </p>
          </div>
          <div>
            <p className={`text-red-700 ${infoItemStyle}`}>
              {ifUserLiked && (
                <I.Heart
                  className="cursor-pointer"
                  onClick={async () => await toggleLikeArticle(false)}
                />
              )}
              {!ifUserLiked && (
                <I.HeartEmpty
                  className="cursor-pointer"
                  onClick={async () => await toggleLikeArticle(true)}
                />
              )}
              {article.hearts?.split(":").length ?? 0}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
