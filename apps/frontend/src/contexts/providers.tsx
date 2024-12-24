"use client";

import React from "react";
import { MessageProvider, UserProvider } from ".";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MessageProvider>
        <UserProvider>{children}</UserProvider>
      </MessageProvider>
    </>
  );
};

export { Providers };
