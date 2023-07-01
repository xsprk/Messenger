import Avatar from "@/app/components/Avatar";
import { ExtendedMessageType } from "@/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import React from "react";
import Image from "next/image";

type Props = {
  isLast?: boolean;
  message: ExtendedMessageType;
};

const MessageBox = ({ message, isLast }: Props) => {
  const session = useSession();
  const isOwn = session.data?.user?.email === message.sender.email;

  const seenList = message.seen
    .filter((user) => user.email !== message.sender.email)
    .map((user) => user.name)
    .join(", ");

  const containerClassName = clsx(
    "flex gap-3 p-4 py-2 items-top",
    isOwn && "justify-end"
  );

  const avatarClassName = clsx("pt-1", isOwn && "order-2");

  const bodyClassName = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageBodyClassName = clsx(
    "w-fit overflow-hidden text-md",
    isOwn ? "bg-blue-500 text-slate-100" : "bg-slate-200",
    message.image ? "rounded-md p-0" : "rounded-full py-1 px-3"
  );

  return (
    <div className={containerClassName}>
      <div className={avatarClassName}>
        <Avatar user={message.sender} />
      </div>
      <div className={bodyClassName}>
        <div id="aboveMessageBody" className="flex gap-2">
          <div className="text-sm text-slate-600"> {message.sender.name}</div>
          <div className="text-sm text-slate-600">
            {format(new Date(message.createdAt), "yyyy/MM/dd p")}
          </div>
        </div>
        <div id="messageBody" className={messageBodyClassName}>
          {message.image ? (
            <Image
              alt="image message"
              height={"288"}
              width={"288"}
              src={message.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <p>{message.body}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
