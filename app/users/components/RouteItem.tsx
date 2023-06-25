"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { RouteItem } from "@/types";

type Props = {
  route: RouteItem;
};

const RouteItem = ({
  route: { label, icon: Icon, href, onClick, active },
}: Props) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          `
       group  flex gap-x-3 rounded-md p-2 text-sm leading-6
       font-semibold text-slate-700 hover:text-slate-800 hover:bg-slate-200
      `,
          active && "bg-slate-200 text-slate-800"
        )}
      >
        <Icon className="h-8 w-8 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default RouteItem;
