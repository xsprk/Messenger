import React, { ReactNode } from "react";
import Sidebar from "../components/asides/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

type Props = {
  children: ReactNode;
};

const UsersLayout = async ({ children }: Props) => {
  const users = await getUsers();
  return (
    <div className="relative w-full min-h-screen ">
      <Sidebar>
        <UserList users={users!} />
      </Sidebar>
      {children}
    </div>
  );
};

export default UsersLayout;
