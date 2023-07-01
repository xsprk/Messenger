"user client";

import React from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  return (
    <aside
      className="fixed hidden left-0 w-full lg:block inset-y-0 pb-20 lg:pb-0
  lg:left-20 lg:w-60 overflow-y-auto border-r border-slate-200"
    >
      <div className="p-5 flex flex-col">
        <p className="my-2 text-2xl font-bold">People</p>
        {users.map((user) => (
          <UserBox key={user.id} user={user}></UserBox>
        ))}
      </div>
    </aside>
  );
};

export default UserList;
