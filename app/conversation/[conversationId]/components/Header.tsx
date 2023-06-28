"use client";

import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import React, { useMemo } from "react";

type Props = {
  conversation: Conversation & { users: User[] };
};

const Header = ({ conversation }: Props) => {
  const otherUsers = useOtherUsers(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;

    return "Active";
  }, [conversation]);

  return (
    <div
      className="
  bg-slate-400
  w-full
  flex
  border-b-[1px]
  border-slate-300
  px-4
  py-3
  lg:px-6
  justify-between
  items-center
  shadow-sm"
    >
      Header
    </div>
  );
};

export default Header;
