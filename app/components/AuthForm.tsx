"use client";

import InputItem from "@/app/components/InputItem";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";

type Props = {};

type Variant = "Log In" | "Sign Up";

const AuthForm = (props: Props) => {
  /* const [isExistingUser, setIsExistingUser] = useState(false); */
  const [variant, setVariant] = useState<Variant>("Log In");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "Log In") {
      setVariant("Sign Up");
    } else {
      setVariant("Log In");
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
    if (variant === "Sign Up") {
      // Axios Register
    }
    if (variant === "Log In") {
      // NextAuth SignIn
    }
  };

  return (
    <div
      className="mt-6 bg-slate-100
  p-8 shadow rounded-lg "
    >
      <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
        {variant === "Sign Up" && (
          <InputItem
            id={"name"}
            register={register}
            errors={errors}
            type="text"
          />
        )}
        <InputItem
          id={"email"}
          register={register}
          /* type="email" */ errors={errors}
        />
        <InputItem
          id={"password"}
          register={register}
          /* type="password" */
          errors={errors}
        />
        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {variant}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
