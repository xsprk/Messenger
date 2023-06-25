"use client";

import { signOut } from "next-auth/react";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      page
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
};

export default page;
