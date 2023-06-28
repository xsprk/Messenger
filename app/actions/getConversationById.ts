import React from "react";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (convsersationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.email) return null;

    const conversation = await prisma?.conversation.findUnique({
      where: { id: convsersationId },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (err) {
    return null;
  }
};

export default getConversationById;
