"use client";

import useRoutes from "@/app/hooks/useRoutes";
import React, { ReactNode, useState } from "react";
import RouteItem from "./RouteItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";

type Props = {
  currentUser: User;
};

const RouteSidebar = ({ currentUser }: Props) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  /* console.log(currentUser); */

  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-20 lg:px-6 lg:overflow-y-auto
    lg:border-r-[1px] lg:border-slate-200 lg:pb-4 lg:flex  lg:flex-col justify-between"
      >
        <nav className="">
          <ul
            role="list"
            className="mt-4 flex flex-col items-center justify-start space-y-2"
          >
            {routes.map((route) => (
              <RouteItem
                key={route.label}
                route={route}
                // href={route.href} label={route.lable} icon={route.icon} // active={route.active} onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="py-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer
        hover:opacity-75
        transition
        "
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default RouteSidebar;
