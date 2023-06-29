import React from "react";
import prisma from "@/prisma/prismadb";

type Props = {};

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma?.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (err) {
    return null;
  }
};

export default getMessages;
