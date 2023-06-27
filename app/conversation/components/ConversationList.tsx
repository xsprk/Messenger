import React from "react";

type Props = {
  conversations?: any[];
};

const ConversationList = ({ conversations = [] }: Props) => {
  return <div>ConversationList</div>;
};

export default ConversationList;
