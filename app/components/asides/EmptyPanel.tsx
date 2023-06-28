import React from "react";

type Props = {};

const EmptyPanel = (props: Props) => {
  return (
    <div
      className="
  px-4
  py-10
  sm:px-6
  lg:px-8
  min-h-screen 
  grid
  place-items-center
  
  "
    >
      <h3 className="mt-2 text-xl  ">
        Select a previous conversation or start a new chat
      </h3>
    </div>
  );
};

export default EmptyPanel;
