"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export default async function fetchUser(email: string) {
    const currentUser = await prisma.user
        .findUnique({ where: { email: email! } })
        .then((user) => user);
    return currentUser;
}
