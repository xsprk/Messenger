"use client";

import getConversations from "@/app/actions/getConversations";
import useConversation from "@/app/hooks/useConversation";
import { Conversation } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";

type Props = {
  InitialConversations?: Conversation[];
};

const ConversationList = ({ InitialConversations = [] }: Props) => {
  const [conversations, setConversations] = useState(InitialConversations);
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();

  return (
    <aside
      className={clsx(
        `fixed left-0 lg:block inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-60 overflow-y-auto border-r border-slate-200`,
        isOpen ? "hidden" : "block"
      )}
    >
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold ">Chats</p>
          <div className="p-2 rounded-md cursor-pointer hover:bg-slate-200 transition ">
            <MdOutlineGroupAdd size={32} />
          </div>
        </div>
        {conversations.map((conversation) => (
          <ConversationBox
            key={conversation.id}
            conversation={conversation}
            selected={conversation.id === conversationId}
          ></ConversationBox>
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
