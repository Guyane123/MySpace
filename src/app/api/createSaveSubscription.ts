"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { fetchConversation } from "@/app/api/cookie";

export async function createSaveSubscription(
    p256dhKey: number[],
    authKey: number[],
    endPoint: string
) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const saveSubscribtion = await prisma.saveSubscription.create({
        data: {
            endpoint: endPoint,
            authorId: currentUserId,
            p256dhKey: p256dhKey,
            authKey: authKey,
        },
    });

    return saveSubscribtion;
}
