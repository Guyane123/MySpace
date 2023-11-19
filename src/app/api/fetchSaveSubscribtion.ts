"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import CheckSession from "../../../lib/CheckSession";

export default async function fetchSaveSubscribtion(userId: string) {
    const saveSubscribtions = await prisma.pushSubscribtion.findMany({
        where: { authorId: userId },
    });

    return saveSubscribtions;
}
