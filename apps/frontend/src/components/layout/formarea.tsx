import React from "react";

interface FormareaProps {
  children: React.ReactNode;
}

const Formarea = ({ children }: FormareaProps) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary p-4">
      <div className="flex items-center flex-col gap-2 bg-white max-w-lg w-full min-h-96 rounded-md shadow">
        {children}
      </div>
    </div>
  );
};

export { Formarea };
