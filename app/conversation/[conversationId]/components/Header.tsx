"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

type Props = {
  conversation: Conversation & { users: User[] };
};

const Header = ({ conversation }: Props) => {
  const members = useActiveList((state) => state.members);
  const otherUsers = useOtherUsers(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;
    const isActive = members.indexOf(otherUsers[0].email!) !== -1;
    return isActive ? "Active" : "Offline";
  }, [conversation, members]);

  return (
    <>
      <ProfileDrawer
        conversation={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
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
        <div className="flex gap-3 items-center">
          <Link
            className="lg:hidden block text-blue-500 rounded-full
            bg-slate-400
          hover-ring hover:ring-offset-slate-400 transition cursor-pointer "
            href="/conversation"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={otherUsers} />
          ) : (
            <Avatar user={otherUsers[0]} />
          )}
          <div className="flex flex-col">
            <p>{conversation.name || otherUsers[0].name}</p>
            <p className="text-sm font-light">{statusText}</p>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => {
            setDrawerOpen(true);
          }}
          className="text-blue-500 cursor-pointer 
        rounded-full
        hover:text-blue-600 
        hover-ring hover:ring-offset-slate-400
        transition"
        />
      </div>
    </>
  );
};

export default Header;
