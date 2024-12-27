"use client";

import React from "react";
import { MessageProvider, UserProvider, ModalProvider } from ".";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MessageProvider>
        <UserProvider>
          <ModalProvider>{children}</ModalProvider>
        </UserProvider>
      </MessageProvider>
    </>
  );
};

export { Providers };
