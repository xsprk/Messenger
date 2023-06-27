import getCurrentUser from "@/app/actions/getCurrentUser";
import { CoversationPOSTReqBody } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body: CoversationPOSTReqBody = await request.json();
    const { userId, isGroup, name, members } = body;

    if (!currentUser || !currentUser.email)
      return new NextResponse("Unauthorised", { status: 401 });

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Request", { status: 400 });
    }

    if (isGroup && members!.length >= 2) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members!.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: { users: true },
      });
      return NextResponse.json(newConversation);
    }

    const existingCoversationArray = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const existingCoversation = existingCoversationArray[0];
    if (existingCoversation) return NextResponse.json(existingCoversation);

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
