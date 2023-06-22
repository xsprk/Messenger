"use client";

import React from "react";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  disabled?: boolean;
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const InputItem: React.FC<InputProps> = ({
  id,
  type = id,
  required,
  register,
  errors,
  disabled,
}) => {
  const label = capitalizeFirstLetter(id);

  return (
    <div className="space-y-2 flex flex-col items-start">
      <label htmlFor={id} className=" font-medium leading-6 ">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `
        form-input
        block
        rounded-md
        border-0
        py-1.5 
        shadow-sm
        ring-1
        ring-inset
        bg-slate-100
        ring-slate-400
        placeholder-slate-400 
        focus:ring-2
        focus:ring-blue-400/80
        `,
          errors[id] && "focus:ring-rose-400",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </div>
  );
};

export default InputItem;
