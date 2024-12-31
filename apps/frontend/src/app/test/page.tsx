import { ArticleCard } from "@/components";
import { Article } from "@/types";

const Test = () => {
  const article = {
    id: "0d936a6b-d6a4-4e7f-abd1-8c79e654e8ef",
    title: "Teste",
    content: "<p>Este é um <strong>conteúdo</strong> de teste.</p>",
    author_id: "d6f5b4d1-0f88-45a2-a741-5eb22c975c95",
    views: null,
    hearts: null,
    comments: null,
    created_at: "2024-12-31T10:55:27.752Z",
    updated_at: "2024-12-31T10:55:27.752Z",
    author: {
      id: "d6f5b4d1-0f88-45a2-a741-5eb22c975c95",
      name: "Samuel Jacobsen",
      email: "rcbsjbarcellos@gmail.com",
      password: "$2b$08$1H1A6XDihDTQ46OrOUnleeHDwms5NNy7Zh8.mDyOS9vAfDCoJus52",
      followers: null,
      following: null,
      views: 0,
      hearts: 0,
      description: "Teste de conta.",
      picture: null,
      role: "USER",
      verified: true,
      token_verifier: "912367",
      created_at: "2024-12-30T10:46:33.432Z",
      updated_at: "2024-12-30T10:47:08.787Z",
    },
  } as any;

  return (
    <div className="p-4">
      <ArticleCard article={article} />
    </div>
  );
};

export default Test;
