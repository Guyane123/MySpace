"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import CheckSession from "@/components/CheckSession/CheckSession";

export default async function fetchSaveSubscribtion(userId: string) {
    const saveSubscribtions = await prisma.saveSubscription.findMany({
        where: { authorId: "clovp3zkf000kng64u6bi879b" },
    });

    console.log(saveSubscribtions[0]);
    return saveSubscribtions[0];
}
