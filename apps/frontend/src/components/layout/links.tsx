"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { links } from "@/constants";

const Links = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <ul className="flex items-center justify-around text-white text-3xl min-w-96 w-full h-full border-2 border-primary">
      {links.map(({ href, label, icon }, i: number) => {
        const Icon = icon;

        return (
          <li
            key={i}
            className="flex items-center justify-center flex-1 h-full hover:bg-dark-primary"
            title={label}
          >
            <Link
              href={href}
              className={`flex items-center justify-center flex-1 h-full text-white ${
                href == path ? "bg-dark-primary" : ""
              }`}
            >
              <Icon className={`${href == "/create" ? "text-4xl" : ""}`} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export { Links };
