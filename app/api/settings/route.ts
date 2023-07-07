import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { name, image } = await request.json();

    if (!currentUser?.id)
      return new NextResponse("Unauthorised", { status: 401 });
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log(err, "Error, settings");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
