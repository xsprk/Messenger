"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import React from "react";
import RouteItem from "./RouteItem";

type Props = {};

const MobileFooter = (props: Props) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="fixed
      flex
  justfigy-between
  inset-x-0
  bottom-0
  z-40
  items-center
  bg-slate-300
  border-t-[1px]
  border-slate-200
  lg:hidden

  
  "
    >
      <nav className="w-full">
        <ul
          role="list"
          className="w-full py-2 px-4 flex flex-row items-center justify-evenly space-x-2"
        >
          {routes.map((route) => (
            <RouteItem key={route.label} route={route} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileFooter;
