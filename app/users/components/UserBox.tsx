"use client";

import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  user: User;
};

const UserBox = ({ user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    toast.loading("Creating Conversation...", { id: "1" });
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
        toast.success("Success, conversation Created", { id: "1" });
      })
      .catch((err) => toast.error("Error, " + err.message, { id: "1" }))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      onClick={handleClick}
      className="w-full
  relative
  flex
  items-center
  space-x-3
  p-3
  hover:bg-slate-200
  rounded-lg
  transition
  cursor-pointer"
    >
      <Avatar user={user} /> <span className="min-w-0 flex-1">{user.name}</span>
    </div>
  );
};

export default UserBox;
