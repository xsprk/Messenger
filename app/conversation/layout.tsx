import { ReactNode } from "react";
import Sidebar from "../components/asides/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";
import { ExtendedCoversationType } from "@/types";
import { Message, User } from "@prisma/client";

type Props = {
  children: ReactNode;
};

const ConversationLayout = async ({ children }: Props) => {
  const conversations = await getConversations();
  return (
    <div className="relative w-full min-h-screen ">
      <Sidebar>
        <ConversationList InitialConversations={conversations} />
      </Sidebar>
      {children}
    </div>
  );
};

export default ConversationLayout;
