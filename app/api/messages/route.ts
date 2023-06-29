import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, image, conversationId } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Error", { status: 500 });
  }
}
