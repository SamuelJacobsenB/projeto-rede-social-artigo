import React from "react";

interface EditorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const EditorButton = ({ className, ...props }: EditorButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-primary text-white text-lg p-1 px-4 rounded-sm hover:bg-dark-primary ${className}`}
      {...props}
    />
  );
};

export { EditorButton };
