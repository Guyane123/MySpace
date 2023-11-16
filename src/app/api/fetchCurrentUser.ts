"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import CheckSession from "@/components/CheckSession/CheckSession";

export default async function fetchCurrentUser(
    id: undefined | string = undefined
) {
    await CheckSession();
    const session = await getServerSession(authOptions);

    const currentUserEmail = session?.user?.email;

    if (id) {
        const currentUser = await prisma.user
            .findUnique({
                where: { id: id },
                include: { posts: true, followedBy: true, following: true, },
            })
            .then((user) => user);
        return currentUser;
    } else {
        const currentUser = await prisma.user
            .findUnique({ where: { email: currentUserEmail! }, include: {posts: true, followedBy: true, following: true}})
            .then((user) => user);
        return currentUser;
    }
}
