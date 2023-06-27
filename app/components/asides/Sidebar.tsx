import React, { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <DesktopSidebar currentUser={currentUser!} />
      <main className="absolute lg:pl-20 left-0 top-0 h-full lg:w-80  lg:bg-slate-300">
        Sidebar{children}
      </main>
      <MobileFooter />
    </>
  );
};

export default Sidebar;
