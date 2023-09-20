import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/../lib/prisma";
import { User } from "@prisma/client";
import async from "../../../users/page";
import { createAccount, hash } from "./actions";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    secret: process.env.SECRET,

    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",

            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "text",
                    placeholder: "Password",
                },
            },

            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (
                    !!!user &&
                    credentials?.username &&
                    credentials.email &&
                    credentials.password
                ) {
                    const newUser = await createAccount(
                        credentials?.username,
                        credentials?.email,
                        credentials?.password
                    );

                    return newUser;
                }

                if (
                    !!user &&
                    (await hash(user.password!)) ==
                        (await hash(credentials?.password!))
                ) {
                    return user;
                }

                return null;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
