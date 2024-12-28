import React from "react";

interface TemplateModalProps {
  children: React.ReactNode;
  className?: string;
}

const TemplateModal = ({ children, className }: TemplateModalProps) => {
  return (
    <div className="fixed top-0 left-0 z-30 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-80 min-w-screen w-full min-h-screen h-full p-10 overflow-y-auto">
      <div
        className={`flex flex-col bg-white max-w-xl w-full p-4 rounded ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export { TemplateModal };
