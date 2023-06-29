import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, image, conversationId } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma;
  } catch (err) {
    console.log(err);
    return new NextResponse("Error", { status: 500 });
  }
}
