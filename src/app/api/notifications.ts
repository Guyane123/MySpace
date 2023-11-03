"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";

export async function fetchNotifications(
    isViewed: undefined | boolean = undefined
) {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);
    const setting = await prisma.setting.findUnique({
        where: { userId: currentUserId! },
    });

    const notifications = await prisma.notification.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            userId: currentUserId!,
            isViewed: isViewed as boolean | undefined,
            OR: [
                {
                    type: setting!.followNotification ? "follow" : undefined,
                },
                {
                    type: setting?.likeNotification ? "like" : undefined,
                },
                {
                    type: setting?.commentNotification ? "comment" : undefined,
                },
                {
                    type: setting?.messageNotification ? "message" : undefined,
                },
            ],
            NOT: {
                notificationAuthorId: currentUserId!,
            },
        },
    });
    console.log(notifications);

    return notifications;
}
