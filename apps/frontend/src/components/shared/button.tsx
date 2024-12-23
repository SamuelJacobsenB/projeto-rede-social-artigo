import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full h-12 text-lg font-semibold rounded-md ${className}`}
      {...props}
    />
  );
};

export { Button };
