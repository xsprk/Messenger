import { ReactNode } from "react";
import Sidebar from "../components/asides/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import { ExtendedCoversationType } from "@/types";
import { Message, User } from "@prisma/client";
import getUsers from "../actions/getUsers";
import { useSession } from "next-auth/react";
import getCurrentUser from "../actions/getCurrentUser";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

const ConversationLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <div className="relative w-full min-h-screen ">
      <Sidebar>
        <ConversationList users={users} InitialConversations={conversations} />
      </Sidebar>

      <div className="lg:pl-80">{children}</div>
    </div>
  );
};

export default ConversationLayout;
