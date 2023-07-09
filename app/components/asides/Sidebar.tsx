import getCurrentUser from "@/app/actions/getCurrentUser";
import { ReactNode } from "react";
import MobileFooter from "./MobileFooter";
import RouteSidebar from "./RouteSidebar";

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <RouteSidebar currentUser={currentUser!} />

      {children}

      <MobileFooter />
    </>
  );
};

export default Sidebar;
