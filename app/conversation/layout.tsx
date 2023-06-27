import { ReactNode } from "react";
import Sidebar from "../components/asides/Sidebar";
import ConversationList from "./components/ConversationList";

type Props = {
  children: ReactNode;
};

const ConversationLayout = async ({ children }: Props) => {
  return (
    <div className="relative w-full min-h-screen ">
      <Sidebar>
        <ConversationList />
      </Sidebar>
      {children}
    </div>
  );
};

export default ConversationLayout;
