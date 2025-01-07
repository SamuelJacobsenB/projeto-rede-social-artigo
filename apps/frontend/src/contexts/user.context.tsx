"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { controller } from "@/services";
import { User } from "@/types";

export interface UserContextProps {
  user: User | null;
  findUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const findUser = useCallback(async () => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const { data, error } = await controller.get(
        "/users/token",
        access_token
      );

      if (error) {
        localStorage.removeItem("access_token");
        setUser(null);
        return;
      }

      setUser(data);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    setUser(null);
  }, []);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <UserContext.Provider value={{ user, findUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
