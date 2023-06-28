import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyPanel from "@/app/components/asides/EmptyPanel";
import Header from "./components/Header";

type Props = {
  conversationId: string;
};

const ConversationIdPage = async ({ params }: { params: Props }) => {
  const conversation = await getConversationById(params.conversationId);

  const messages = await getMessages(params.conversationId);

  if (!conversation) return <EmptyPanel />;

  return (
    <div>
      <Header conversation={conversation} />
    </div>
  );
};

export default ConversationIdPage;
