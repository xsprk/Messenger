import React, { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  return (
    <>
      <DesktopSidebar />
      <main className="absolute lg:pl-20 left-0 top-0 h-full w-80  lg:bg-slate-300">
        Sidebar{children}
      </main>
    </>
  );
};

export default Sidebar;
