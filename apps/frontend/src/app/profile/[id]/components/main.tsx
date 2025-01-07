import { Button, I } from "@/components";

interface MainProps {
  ifOwnUser: boolean;
  isFollowing: boolean;
  toggleFollowPerson: (follow: boolean) => Promise<void>;
  logout: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({
  ifOwnUser,
  isFollowing,
  toggleFollowPerson,
  logout,
  setIsVisible,
}: MainProps) => {
  return (
    <div className="border-b-2 p-2">
      {ifOwnUser ? (
        <div className="flex flex-col items-center gap-2 w-full">
          <Button
            className="flex justify-center items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => setIsVisible(true)}
          >
            <I.Pencil />
            Editar Perfil
          </Button>
          <Button
            className="flex justify-center items-center gap-4 bg-red-700 hover:bg-red-800 text-white"
            onClick={() => logout()}
          >
            <I.Logout />
            Sair da conta
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <Button
            className={`flex justify-center items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white ${
              isFollowing ? "bg-blue-800 hover:bg-blue-700" : ""
            }`}
            onClick={async () =>
              await toggleFollowPerson(isFollowing ? false : true)
            }
          >
            {isFollowing && (
              <>
                <I.Remove className="text-2xl" />
                Deixar de Seguir
              </>
            )}

            {!isFollowing && (
              <>
                <I.Add className="text-2xl" />
                Seguir
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export { Main };
