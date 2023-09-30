"use server";

import { getServerSession } from "next-auth";
import { prisma } from "../../lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type type = "like" | "follow" | "comment" | "message";

export async function createNotification(
    type: type,
    targetId: String,
    targetElementId: String
) {
    const session = await getServerSession(authOptions);
    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    let targetElement;
    let notifyer;

    switch (type) {
        case "like":
            targetElement = "likingId";
            notifyer = "likerId";
            break;
        case "follow":
            targetElement = "followingId";
            notifyer = "followerId";
            break;
        case "comment":
            targetElement = "postId";
            notifyer = "commenterId";
            break;
        case "message":
            targetElement = "conversatingId";
            notifyer = "conversaterId";
            break;
    }

    const data = {
        content: type!,
        userId: targetId as string,
        [notifyer]: currentUserId,
        [targetElement]: targetElementId,
    };
    console.log(data);

    const res = await prisma.notification.create({
        data: {
            content: type,
            userId: targetId as string,
            [notifyer]: currentUserId,
            [targetElement]: targetElementId,
        },
    });

    console.log(res);
}

export async function deleteNotification(notificationId: string | String) {
    await prisma.notification.delete({
        where: { id: notificationId as string },
    });
}
