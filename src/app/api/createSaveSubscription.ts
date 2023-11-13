"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { fetchConversation } from "@/app/api/cookie";

export async function createSaveSubscription(res: PushSubscriptionJSON) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const isSavedSubscribtion = !!(await prisma.pushSubscribtion.findUnique({
        where: { authorId: currentUserId },
    }));

    const saveSubscribtion = isSavedSubscribtion
        ? null
        : await prisma.pushSubscribtion.create({
              data: {
                  endpoint: res.endpoint!,
                  authorId: currentUserId,
                  p256dhKey: res.keys!["p256dh"],
                  authKey: res.keys!["auth"],
              },
          });

    return saveSubscribtion;
}
