"use client";

import React from "react";
import { MessageProvider } from ".";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MessageProvider>{children}</MessageProvider>
    </>
  );
};

export { Providers };
