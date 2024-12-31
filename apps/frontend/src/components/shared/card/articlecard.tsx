import { serializeDate } from "@/functions";
import { I, ProfileCircle } from "../..";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
  className?: string;
}

const infoStyle = "flex items-center gap-2";

const ArticleCard = ({ article, onClick, className }: ArticleCardProps) => {
  const { author: user } = article;

  const date = serializeDate(article.created_at);

  return (
    <div
      className={`flex flex-col justify-between gap-4 w-full p-2 border-2 rounded-md shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 w-full text-lg text-primary">
        {user?.picture && <ProfileCircle picture={user.picture} size={32} />}
        {!user?.picture && <I.UserCircle className="size-8" />}
        {user.name}
      </div>
      <div className="w-full text-4xl text-primary">{article.title}</div>
      <div className="flex gap-8 text-lg text-primary w-full">
        <p className={infoStyle}>
          <I.Calendar /> {date}
        </p>
        <p className={infoStyle}>
          <I.Heart /> {article.hearts ?? 0}
        </p>
        <p className={infoStyle}>
          <I.Eye /> {article.views ?? 0}
        </p>
      </div>
    </div>
  );
};

export { ArticleCard };
