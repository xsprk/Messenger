import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MessengerClone",
  description:
    "Fullstack: Next.js Rest API + NextAuth + MongoDB + Cloudinary + Pusher + HeadlessUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " min-h-screen bg-slate-400 text-slate-800l"
        }
      >
        {children}
      </body>
    </html>
  );
}
