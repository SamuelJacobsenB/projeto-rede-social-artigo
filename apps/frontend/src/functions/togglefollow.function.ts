import { controller } from "@/services";
import { User } from "@/types";

const toggleFollow = async (
  id: string,
  user?: User | null,
  access_token?: string | null
) => {
  let error: boolean | string = false;

  if (!access_token || !user) {
    error = "Você deve estar logado para seguir";
    return { data: null, error };
  }

  const { data, error: _error } = await controller.patch(
    "/users/follow",
    { id },
    access_token
  );

  if (_error) {
    error = _error as string;
    return { data: null, error };
  }

  return { data, error };
};

export { toggleFollow };
