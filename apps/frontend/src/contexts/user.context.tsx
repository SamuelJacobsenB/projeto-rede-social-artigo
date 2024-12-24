"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import Cookies from "js-cookie";
import { controller } from "@/services";
import { User } from "@/types";

export interface UserContextProps {
  user: User | null;
  findUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const findUser = useCallback(async () => {
    const access_token = Cookies.get("access_token");

    if (access_token) {
      const { data, error } = await controller.get(
        "/users/token",
        access_token
      );

      if (error) {
        Cookies.remove("access_token");
        setUser(null);
        return;
      }

      setUser(data);
    }
  }, []);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <UserContext.Provider value={{ user, findUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
