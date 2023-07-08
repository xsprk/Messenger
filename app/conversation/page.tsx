"use client";

import React from "react";
import useConversation from "../hooks/useConversation";
import EmptyPanel from "../components/asides/EmptyPanel";
import clsx from "clsx";

type Props = {};

const ConversationPage = (props: Props) => {
  const { isOpen } = useConversation();

  return (
    <div
      className={clsx(
        `
      lg:block 

      `,
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyPanel />
    </div>
  );
};

export default ConversationPage;
