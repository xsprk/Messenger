"use client";

import Image from "next/image";
import AuthForm from "./(site)/components/AuthForm";
import { SessionProvider } from "next-auth/react";

export default function SigninPage() {
  return (
    <div
      id="outer-frame"
      className="flex flex-col w-full min-h-screen justify-center items-center py-12 sm:px-6 lg:px-8"
    >
      <div
        id="container"
        className=" max-w-md text-center"
        style={{ marginTop: "-12svh" }}
      >
        <Image
          alt="logo"
          height={"48"}
          width={"48"}
          src={"/images/messengerLogo.png"}
          className="mx-auto"
        />
        <h2 className="mt-6 text-2xl font-bold tracking-tight ">
          Sign in to your account
        </h2>{" "}
        <SessionProvider>
          <AuthForm />
        </SessionProvider>
      </div>
    </div>
  );
}
