"use client";
import { Option } from "@/types";
import { User } from "@prisma/client";
import React from "react";
import ReactSelect from "react-select";

type Props = {
  label: string;
  disabled?: boolean;
  options: Option[];
  value?: Option;
  onChange: (value: Option) => void;
};

const Select = ({ disabled, options, value, label, onChange }: Props) => {
  /* const lable = capitalizeFirstLetter(value); */

  return (
    <div className="z-[100]">
      <label
        className="
        font-medium leading-6
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 50 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
