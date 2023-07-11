"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useOtherUsers from "@/app/hooks/useOtherUsers";
import { pusherClient } from "@/pusher/pusher";
import {
  ExtendedCoversationType,
  ExtendedMessageType,
  NewMessageViaPusher,
} from "@/types";
import clsx from "clsx";
import { format } from "date-fns";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  initialConversation: ExtendedCoversationType;
  selected: boolean;
};

const ConversationBox = ({ initialConversation, selected }: Props) => {
  const [conversation, setConversation] = useState(initialConversation);
  const otherUsers = useOtherUsers(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversation/${conversation.id}`);
  }, [conversation.id]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const currentUserEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage || !currentUserEmail) return false;

    const SeenArray = lastMessage.seen || [];

    return (
      SeenArray.filter((user) => user.email === currentUserEmail).length !== 0
    );
  }, [currentUserEmail, conversation.messages]);

  useEffect(() => {
    if (!currentUserEmail) return;
    pusherClient.subscribe(currentUserEmail!);

    const messageNewHandler = (newMessage: NewMessageViaPusher) => {
      setConversation((current) => {
        if (current.id !== newMessage.conversationId) return current;
        if (find(current.messages || [], { id: newMessage.message.id })) {
          return current;
        }

        return {
          ...current,
          messages: [...(current.messages || []), newMessage.message],
        };
      });
    };

    pusherClient.bind("conversation:newMessage", messageNewHandler);
    return () => {
      pusherClient.unsubscribe(conversation.id);
      pusherClient.unbind("conversation:newMessage", messageNewHandler);
    };
  }, [conversation.id, currentUserEmail]);

  const lastMessageText = useMemo(() => {
    if (!lastMessage) return "New Conversation";
    if (lastMessage?.image) return "Sent an image";
    if (lastMessage?.body) return lastMessage.body;
  }, [lastMessage, conversation.messages]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
  flex relative items-center space-x-2 
  hover:bg-slate-200 rounded-lg transition
  cursor-pointer py-2 px-2 -mx-4
  `,
        selected && "bg-slate-200"
      )}
    >
      <div className="overflow-visible">
        {conversation.isGroup ? (
          <AvatarGroup users={otherUsers} />
        ) : (
          <Avatar user={otherUsers[0]} />
        )}
      </div>
      <div className="w-full truncate">
        <div className="w-full flex justify-between items-center">
          <p className="truncate">
            {conversation.name || otherUsers[0]?.name || ""}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-slate-600 font-light text-sm  mt-0.5 pl-2">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={clsx(
            "text-sm truncate ",
            hasSeen ? "text-slate-500 font-light" : "text-slate-800 font-bold"
          )}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
