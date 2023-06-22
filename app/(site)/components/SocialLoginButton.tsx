import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  onClick: () => void;
};

const SocialLoginButton = ({ icon: Icon, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex px-6 py-3 primary-button  shadow-sm ring-1 ring-inset outline-none   blue-focus-ring flex-1 justify-center"
    >
      <Icon />
    </button>
  );
};

export default SocialLoginButton;
