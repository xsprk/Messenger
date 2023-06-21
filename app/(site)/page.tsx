import Image from "next/image";

export default function SigninPage() {
  return (
    <div
      id="outer-frame"
      className="flex flex-col min-h-screen justify-center py-12 sm:px-6 lg:px-8"
    >
      <div
        id="container"
        className="mx-auto w-full max-w-md text-center"
        style={{ marginTop: "-38svh" }}
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
        </h2>
      </div>
    </div>
  );
}
