import React, { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUsers from "@/app/actions/getUsers";
import UserList from "@/app/users/components/UserList";

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();
  const users = await getUsers();

  return (
    <>
      <DesktopSidebar currentUser={currentUser!} />
      <main className="absolute lg:pl-20 left-0 top-0 h-full lg:w-80  lg:bg-slate-300">
        <UserList users={users!} />
        {children}
      </main>
      <MobileFooter />
    </>
  );
};

export default Sidebar;
