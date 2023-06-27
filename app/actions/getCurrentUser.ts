import prisma from "@/prisma/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (err) {
    return null;
  }
};

export default getCurrentUser;
