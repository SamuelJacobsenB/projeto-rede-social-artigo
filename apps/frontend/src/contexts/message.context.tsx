"use client";

import React, { useState, useCallback, createContext, useContext } from "react";
import { Type } from "@/types";

export interface MessageContextProps {
  message: string | null;
  type: Type | null;
  showMessage: (text: string, type: Type) => void;
  hideMessage: () => void;
}

const MessageContext = createContext<MessageContextProps>(
  {} as MessageContextProps
);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<Type | null>(null);

  const showMessage = useCallback((text: string, type: Type) => {
    setMessage(text);
    setType(type);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 6000);
  }, []);

  const hideMessage = useCallback(() => {
    setMessage(null);
    setType(null);
  }, []);

  return (
    <MessageContext.Provider
      value={{ message, type, showMessage, hideMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
