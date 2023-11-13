"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import CheckSession from "@/components/CheckSession/CheckSession";

export default async function fetchSaveSubscribtion(userId: string) {
    const saveSubscribtions = await prisma.pushSubscribtion.findUnique({
        where: { authorId: userId },
    });

    console.log(saveSubscribtions);
    return saveSubscribtions;
}
