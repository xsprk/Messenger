import { IconType } from "react-icons";

type RouteItem = {
  label: string;
  icon: IconType;
  onClick?(): void;
  href: string;
  active?: boolean;
};

type CoversationPOSTReqBody = {
  userId: string;
  isGroup?: boolean;
  members?: any[];
  name?: string;
};
