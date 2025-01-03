import { Button } from "@/components";
import { User } from "@/types";

const infoBtnStyle = "bg-primary hover:bg-dark-primary select-none w-full";

interface InfoProps {
  user: User;
  followers?: string[];
  following?: string[];
}

const Info = ({ user, followers, following }: InfoProps) => {
  return (
    <div className="flex flex-col gap-2 w-full p-2 text-white border-b-2">
      <div className="flex justify-center gap-2 md:flex-col">
        <Button className={infoBtnStyle}>
          {followers ? `${followers.length} Seguidores` : "Nenhum seguidor"}
        </Button>
        <Button className={infoBtnStyle}>
          {following ? `${following.length} Seguindo` : "Seguindo ninguém"}
        </Button>
      </div>
      <div className="flex justify-center gap-2 md:flex-col">
        <Button className={infoBtnStyle}>
          {user?.views !== 0
            ? `${user?.views} visualizações`
            : "Nenhuma visualização"}
        </Button>
        <Button className={infoBtnStyle}>
          {user?.hearts !== 0 ? `${user?.hearts} corações` : "Nenhum coração"}
        </Button>
      </div>
    </div>
  );
};

export { Info };
