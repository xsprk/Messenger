"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

type Variant = "LOGIN" | "REGISTER";

const AuthForm = (props: Props) => {
  /* const [isExistingUser, setIsExistingUser] = useState(false); */
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // Axios Register
    }
    if (variant === "LOGIN") {
      // NextAuth SignIn
    }
  };

  return (
    <div
      className="mt-6 bg-slate-100
  px-4 py-6 shadow rounded-lg "
    >
      AuthForm!!
      <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}></form>
    </div>
  );
};

export default AuthForm;
