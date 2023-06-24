"use client";

import InputItem from "@/app/(site)/components/InputItem";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button";
import SocialLoginButton from "./SocialLoginButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";

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
    reset,
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
      /* axios.post("/api/signup", data); */
      // Axios signup endpoint
      toast.loading("Signing up...", { id: "1" });
      axios
        .post("/api/signup", data)
        .then(() => {
          toast.success(<b>Success, Signed Up!</b>, { id: "1" });
          reset();
        })
        .catch((err) => {
          toast.error(<b>{err.response.data || "Something went wrong!"}</b>, {
            id: "1",
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "Log In") {
      // NextAuth SignIn
      toast.loading("Signing in...", { id: "1" });
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials", { id: "1" });
          } else if (callback?.ok) {
            toast.success("Success, Logged in", { id: "1" });
            reset();
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  function socialAction(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className="mt-6 bg-slate-300
  p-8 pb-10 shadow rounded-lg "
    >
      <Toaster />
      <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
        {variant === "Sign Up" && (
          <InputItem
            id={"name"}
            register={register}
            errors={errors}
            type="text"
            disabled={isLoading}
          />
        )}
        <InputItem
          id={"email"}
          register={register}
          /* type="email" */ errors={errors}
          disabled={isLoading}
        />
        <InputItem
          id={"password"}
          register={register}
          /* type="password" */
          errors={errors}
          disabled={isLoading}
        />
        <div className="pt-3 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {variant}
          </Button>
        </div>

        <section id="social logins">
          <div id="divider" className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-400" />
            </div>
            <div className="relative flex justify-center">
              <span className=" text-slate-500 px-2 bg-slate-300 ">
                Or continue with
              </span>
            </div>
          </div>

          <div
            id="Social Login buttons"
            className="flex gap-2 pt-3 justify-evenly"
          >
            <SocialLoginButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <SocialLoginButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </section>
        <section
          id="New to Messenger?"
          className="flex pt-2 justify-center  text-blue-500 text-sm space-x-1"
        >
          <span>
            {variant === "Log In"
              ? "New to Messenger?"
              : "Already have an account?"}
          </span>
          <span onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "Log In" ? "Creat an Account" : "Login"}
          </span>
        </section>
      </form>
    </div>
  );
};

export default AuthForm;
