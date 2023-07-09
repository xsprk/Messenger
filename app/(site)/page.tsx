import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function SigninPage() {
  return (
    <div
      id="outer-frame"
      className="flex flex-col w-full min-h-screen justify-center items-center py-12 sm:px-6 lg:px-8"
    >
      <div
        id="container"
        className=" max-w-md text-center"
        style={{ marginTop: "-15svh" }}
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
        <AuthForm />
        <footer className=" flex flex-row justify-center">
          <ul className="hidden fixed bottom-20 md:flex md:flex-col mt-auto  mx-auto  justify-end items-center text-gray-800 space-y-1 px-7 py-5 rounded-xl w-160">
            <li>Next.js Rest API + NextAuth + Typescript</li>
            <li>Prisma + MongoDB + Cloudinary</li>
            <li>Pusher + Zustand</li>
            <li>HeadlessUI + Tailwind</li>
            <li>
              Learned from Antonio;
              <span className=" whitespace-nowrap pl-2">
                Powered by greybluesea
              </span>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
