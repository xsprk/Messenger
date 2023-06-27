import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUser, HiUsers } from "react-icons/hi";
import useConversation from "./useConversation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import { RouteItem } from "@/types";
import toast from "react-hot-toast";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo<RouteItem[]>(
    () => [
      {
        label: "Chats",
        href: "/conversation",
        icon: HiChat,
        active: pathname === "/conversation" || !!conversationId,
      },
      {
        label: "People",
        href: "/users",
        icon: HiUsers,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => {
          toast.loading("Signing out", { id: "1" });
          signOut();
          setTimeout(() => toast.success("Signed out", { id: "1" }), 500);
        },
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
