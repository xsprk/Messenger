import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

type Props = {
  children: ReactNode;
};

const UserLayout = ({ children }: Props) => {
  return (
    <div className="relative w-full min-h-screen ">
      <Sidebar>Sidebar</Sidebar>
      {children}
    </div>
  );
};

export default UserLayout;
