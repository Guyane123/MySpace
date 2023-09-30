"use server";

import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function fetchNotifications() {
    const session = await getServerSession(authOptions);

    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const notifications = await prisma.notification.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: { userId: currentUserId },
    });

    return notifications;
}
