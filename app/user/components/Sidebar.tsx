import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  return (
    <main className="absolute lg:pl-20 left-0 top-0 h-full w-80">
      Sidebar{children}
    </main>
  );
};

export default Sidebar;
