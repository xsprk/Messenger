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
      <main className="absolute lg:pl-20 left-0 top-0 h-full lg:w-80  lg:bg-slate-300">
        {children}
      </main>
      <MobileFooter />
    </>
  );
};

export default Sidebar;
