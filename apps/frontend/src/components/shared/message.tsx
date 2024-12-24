"use client";

import { useMessage } from "@/contexts";
import { I } from "..";

const Message = () => {
  const { message, type, hideMessage } = useMessage();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-20 flex items-center justify-between gap-4 text-white text-lg min-w-80 h-12 p-2 rounded ${
        type === "success" ? "bg-green-700" : "bg-red-700"
      }`}
    >
      <div className="flex items-center gap-2">
        {type === "success" ? (
          <I.Check className="text-2xl" />
        ) : (
          <I.Warning className="text-2xl" />
        )}
        {message}
      </div>
      <I.Close className="text-2xl cursor-pointer" onClick={hideMessage} />
    </div>
  );
};

export { Message };
