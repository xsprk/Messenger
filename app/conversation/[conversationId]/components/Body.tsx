"use client";

import useConversation from "@/app/hooks/useConversation";
import { ExtendedMessageType } from "@/types";
import React, { useRef, useState } from "react";
import MessageBox from "./MessageBox";

type Props = {
  initialMessages: ExtendedMessageType[];
};

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto py-2">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
