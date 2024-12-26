import { Button } from "@/components";
import { User } from "@/types";

const infoBtnStyle =
  "bg-primary hover:bg-dark-primary w-10/21 select-none md:w-full";

interface InfoProps {
  user: User;
  followers?: string[];
  following?: string[];
}

const Info = ({ user, followers, following }: InfoProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full p-2 text-white border-b-2">
      <Button className={infoBtnStyle}>
        {followers ? `${followers.length} Seguidores` : "Nenhum seguidor"}
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
  );
};

export { Info };
