import { controller } from "@/services";
import { User } from "@/types";
import { debounce } from "lodash";

const toggleFollow = debounce(
  async (
    id: string,
    follow: boolean,
    user?: User | null,
    access_token?: string | null,
    refetchFn?: () => Promise<void>
  ) => {
    let error: boolean | string = false;

    if (!access_token || !user) {
      error = "Você deve estar logado";
      return { data: null, error };
    }

    try {
      if (follow) {
        const { data, error: _error } = await controller.patch(
          "/users/follow",
          { id },
          access_token
        );

        if (_error) {
          error = _error as string;
          return { data: null, error };
        }

        if (refetchFn) {
          await refetchFn();
        }

        return { data, error };
      } else {
        const { data, error: _error } = await controller.patch(
          "/users/unfollow",
          { id },
          access_token
        );

        if (_error) {
          error = _error as string;
          return { data: null, error };
        }

        if (refetchFn) {
          await refetchFn();
        }

        return { data, error };
      }
    } catch (err) {
      error = err instanceof Error ? err.message : "Parece que houve um erro";
      return { data: null, error };
    }
  },
  500
);

export { toggleFollow };
