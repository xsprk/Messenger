import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ConversationIdLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ConversationIdLayout;
