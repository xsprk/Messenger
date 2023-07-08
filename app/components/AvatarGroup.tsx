"use client";

import { User } from "@prisma/client";
import React from "react";
import Image from "next/image";

type Props = {
  users?: User[];
};

const AvatarGroup = ({ users = [] }: Props) => {
  const slicedUsers = users.slice(0, 3);
  const positionArray = [
    "top-0 left-[12px] ",
    "bottom-0 left-0 ",
    "bottom-0 right-0 ",
  ];

  return (
    <div className="relative h-11 w-12">
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-6 w-6 ${positionArray[index]}`}
        >
          <Image
            alt="Avatar"
            src={user?.image || "/images/placeholder.jpg"}
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
