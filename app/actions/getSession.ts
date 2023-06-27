import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

const getSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

export default getSession;
