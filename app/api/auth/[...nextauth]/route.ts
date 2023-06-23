import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/prisma/prismadb";
import { authOptions } from "@/app/utils/authOptions";

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
