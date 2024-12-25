import React from "react";
import { Navbar } from "..";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className={`pb-20 md:pb-0 ${className}`}>{children}</div>
    </div>
  );
};

export { Layout };
