"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

const MessageInput = ({
  id,
  register,
  errors,
  placeholder,
  required,
  type = "text",
}: Props) => {
  return (
    <input
      id={id}
      className="
      py-2
      px-4
      bg-slate-200
      outline-none
      
      flex-1 w-full h-16
      
      focus:ring-2
  focus:ring-blue-500/70"
      placeholder={placeholder}
      autoComplete={id}
      required={required}
      {...register(id, { required })}
      autoFocus
    />
  );
};

export default MessageInput;
