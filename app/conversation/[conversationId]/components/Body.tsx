"use client";

import useConversation from "@/app/hooks/useConversation";
import { ExtendedMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/pusher/pusher";
import { find } from "lodash";
import ChatForm from "./ChatForm";

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

    const messageNewHandler = (message: ExtendedMessageType) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
      axios.post(`/api/conversation/${conversationId}/seen`);
    };

    const messageSeenHandler = (messageSeen: ExtendedMessageType) => {
      setMessages((current) =>
        current.map((eachMessage) => {
          return eachMessage.id === messageSeen.id ? messageSeen : eachMessage;
        })
      );
    };

    pusherClient.bind("message:new", messageNewHandler);
    pusherClient.bind("message:seen", messageSeenHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", messageNewHandler);
      pusherClient.unbind("message:seen", messageSeenHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto pt-2">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          message={message}
        />
      ))}

      <div className="py-14 lg:py-16 " ref={bottomRef}></div>
    </div>
  );
};

export default Body;
