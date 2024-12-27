"use client";

import React, { useState, useCallback, createContext, useContext } from "react";

type Fn = () => void | Promise<void>;

export interface ModalContextProps {
  message?: string;
  fn?: Fn;
  showModal: (msg: string, fn: Fn) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>();
  const [fn, setFn] = useState<Fn>();

  const showModal = useCallback((msg: string, fn: Fn) => {
    setMessage(msg);
    setFn(() => fn);
  }, []);

  const hideModal = useCallback(() => {
    setMessage(undefined);
    setFn(undefined);
  }, []);

  return (
    <ModalContext.Provider value={{ message, fn, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
