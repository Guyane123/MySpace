import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/../lib/prisma";
import { createAccount, hash } from "./actions";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login/",
    },

    adapter: PrismaAdapter(prisma),

    secret: process.env.NEXTAUTH_SECRET,

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
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
                confirmPassword: {
                    label: "Confirm password",
                    type: "password",
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
                    credentials.password &&
                    credentials.confirmPassword
                ) {
                    if (credentials.password === credentials.confirmPassword) {
                        const newUser = await createAccount(
                            credentials?.username,
                            credentials?.email,
                            credentials?.password
                        );

                        return newUser;
                    }
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
