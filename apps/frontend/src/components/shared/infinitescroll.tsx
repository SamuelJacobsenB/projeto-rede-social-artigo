"use client";

import React, { useEffect } from "react";
import { Loader } from "./loader";

interface InfiniteScrollProps {
  children: React.ReactNode;
  className?: string;
  fetch: () => Promise<void>;
  hasMore: boolean;
  loading: boolean;
}

const InfiniteScroll = ({
  children,
  className,
  fetch,
  hasMore,
  loading,
}: InfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        hasMore
      ) {
        fetch();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetch, hasMore]);

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 w-full ${className}`}
    >
      {children}
      {loading && (
        <div className="flex justify-center w-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export { InfiniteScroll };
