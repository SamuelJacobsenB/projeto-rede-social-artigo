import router from "next/router";
import { Button, I } from "@/components";

interface MainProps {
  id: string;
  ifOwnUser: boolean;
  isFollowing: boolean;
  toggleFollowPerson: () => Promise<void>;
}

const Main = ({
  id,
  ifOwnUser,
  isFollowing,
  toggleFollowPerson,
}: MainProps) => {
  return (
    <div className="border-b-2 p-2">
      {ifOwnUser ? (
        <div className="flex items-center gap-2 w-full">
          <Button
            className="flex justify-center items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white"
            onClick={() => router.push(`/profile/edit/${id}`)}
          >
            <I.Pencil />
            Editar Perfil
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <Button
            className={`flex justify-center items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white ${
              isFollowing ? "bg-blue-800 hover:bg-blue-700" : ""
            }`}
            onClick={async () => await toggleFollowPerson()}
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
