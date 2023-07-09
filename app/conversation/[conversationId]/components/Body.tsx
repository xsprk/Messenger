"use client";

import useConversation from "@/app/hooks/useConversation";
import { ExtendedMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/pusher/pusher";
import { find } from "lodash";

type Props = {
  initialMessages: ExtendedMessageType[];
};

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: ExtendedMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
      axios.post(`/api/conversation/${conversationId}/seen`);
    };

    pusherClient.bind("message:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto py-2">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          message={message}
        />
      ))}
      <div ref={bottomRef} className="pt-6" />
    </div>
  );
};

export default Body;
