"use client";

import { Conversation } from "@prisma/client";
import React from "react";

type Props = {
  conversation: Conversation;
  selected: boolean;
};

const ConversationBox = ({ conversation, selected }: Props) => {
  return <div>ConversationBox</div>;
};

export default ConversationBox;
