"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import webpush from "web-push";
import fetchSaveSubscribtion from "./fetchSaveSubscribtion";
import createPushNotification from "./createPushNotification";

type type = "like" | "follow" | "comment" | "message";

export async function createNotification(
    type: type,
    targetId: String,
    postId: string | null = null
) {
    const session = await getServerSession(authOptions);
    const currentUserId = await prisma.user
        .findUnique({ where: { email: session?.user?.email! } })
        .then((user) => user?.id!);

    const data = {
        type: type!,
        userId: targetId as string,
        notificationAuthorId: currentUserId,
        postId: postId,
    };
    console.log(data);

    const res = await prisma.notification.create({
        data: data,
    });

    console.log(res);

    createPushNotification(targetId as string);
}

export async function deleteNotification(notificationId: string | String) {
    await prisma.notification.delete({
        where: { id: notificationId as string },
    });
}

export async function seeNotification(notificationId: String) {
    await prisma.notification.update({
        where: { id: notificationId! as string },
        data: {
            isViewed: true,
        },
    });
}
