import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyPanel from "@/app/components/asides/EmptyPanel";
import Header from "./components/Header";
import Body from "./components/Body";
import ChatForm from "./components/ChatForm";

type Props = {
  conversationId: string;
};

const ConversationIdPage = async ({ params }: { params: Props }) => {
  const conversation = await getConversationById(params.conversationId);

  const messages = (await getMessages(params.conversationId)) || [];

  if (!conversation) return <EmptyPanel />;

  return (
    <div className="h-full flex flex-col min-h-screen z-[55] cursor-auto">
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <ChatForm />
    </div>
  );
};

export default ConversationIdPage;
