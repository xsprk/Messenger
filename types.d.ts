import { IconType } from "react-icons";
import { Conversation, Message, User } from "@prisma/client";

type RouteItem = {
  label: string;
  icon: IconType;
  onClick?(): void;
  href: string;
  active?: boolean;
};

type CoversationPOSTReqBody = {
  userId: string;
  isGroup?: boolean;
  members?: any[];
  name?: string;
};

type ExtendedMessageType = Message & {
  sender: User;
  seen: User[];
};

/* type Conversation = {
  id: string;
  createAt: DateTime;
  lastMessageAt: DateTime;
  name: string;
  isGroup: boolean;

  messageIds: string[];
  messages: Message[];

  userIds: String[];
  users: User[];
}; */

type ExtendedCoversationType = Conversation & {
  users: User[];
  messages: ExtendedMessageType[];
};

type Option = { [string]: any };

type NewMessageViaPusher = {
  conversationId: string;
  message: ExtendedMessageType;
};
